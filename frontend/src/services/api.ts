export async function getFuncionarios() {
  const res = await fetch('http://localhost:3001/funcionarios')
  return res.json()
}