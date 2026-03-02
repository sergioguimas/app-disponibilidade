import 'dotenv/config';
import Fastify from 'fastify';
import { createClient } from '@supabase/supabase-js';

const app = Fastify({ logger: true });

// Conexão com o Supabase (Usando Service Role para bypass de RLS no backend)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Mapeamento de Status: Onde a mágica visual acontece
const STATUS_MAP: Record<string, { label: string; color: string }> = {
  "!inicio": { label: "Disponível", color: "#22c55e" }, // Verde
  "!cafe":   { label: "Pausa Café", color: "#eab308" }, // Amarelo
  "!almoco": { label: "Em Almoço", color: "#f97316" }, // Laranja
  "!voltei": { label: "Disponível", color: "#22c55e" }, // Verde
  "!sair":   { label: "Encerrado", color: "#64748b" }, // Cinza
};

// Endpoint do Webhook
app.post('/webhook', async (request, reply) => {
  const { identification, text } = request.body as { identification: string; text: string };

  if (!identification || !text) {
    return reply.status(400).send({ error: "Payload inválido. Envie identification e text." });
  }

  const cleanCommand = text.trim().toLowerCase();
  const config = STATUS_MAP[cleanCommand];

  if (!config) {
    return reply.status(400).send({ error: "Comando não reconhecido." });
  }

  try {
    // 1. Verificar se o funcionário existe
    console.log("Buscando identificação:", identification);
    const { data: employee, error: empError } = await supabase
      .from('employees')
      .select('id')
      .eq('identification', identification)
      .single();

    if (empError || !employee) {
        console.error("Erro detalhado do Supabase:", empError);
        return reply.status(404).send({ error: "Funcionário não encontrado no banco." });
    }

    // 2. Atualizar Status Atual (Realtime)
    const { error: upsertError } = await supabase
      .from('employee_current_status')
      .upsert({
        employee_id: employee.id,
        status_label: config.label,
        status_color: config.color,
        updated_at: new Date().toISOString()
      });

    // 3. Registrar no Histórico
    await supabase.from('status_history').insert({
      employee_id: employee.id,
      status_label: config.label
    });

    return { success: true, updated_to: config.label };
  } catch (err) {
    app.log.error(err);
    return reply.status(500).send({ error: "Erro interno no processamento." });
  }
});

// Start do Server
const start = async () => {
  try {
    await app.listen({ port: Number(process.env.PORT) || 3001, host: '0.0.0.0' });
    console.log(`🚀 Backend rodando em http://localhost:${process.env.PORT || 3001}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();