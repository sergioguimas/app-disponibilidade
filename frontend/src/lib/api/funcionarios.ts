import { api } from "./client"
import type { Funcionario } from "../../types/funcionario"

export async function getFuncionarios(): Promise<Funcionario[]> {
  const { data } = await api.get("/funcionarios")
  return data
}