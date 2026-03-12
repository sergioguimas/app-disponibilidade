import { api } from "./client"
import type { Status } from "../../types/funcionario"

interface UpdateStatusPayload {
  identificacao: string
  status: Status
}

export async function updateStatus(payload: UpdateStatusPayload) {
  const { data } = await api.post("/status/manual", {
    identificacao: payload.identificacao,
    status: payload.status,
    source: "painel",
  })

  return data
}