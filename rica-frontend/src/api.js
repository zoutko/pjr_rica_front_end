const BASE_URL = 'http://localhost:8080/api'

export async function listarInvestigadores() {
  const respuesta = await fetch(`${BASE_URL}/investigadores`)
  if (!respuesta.ok) {
    throw new Error(`Error al listar investigadores: ${respuesta.status}`)
  }
  return respuesta.json()
}

export async function crearInvestigador(investigador) {
  const respuesta = await fetch(`${BASE_URL}/investigadores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(investigador)
  })

  const cuerpo = await respuesta.json()

  if (!respuesta.ok) {
    throw new Error(cuerpo.mensaje || `Error al crear investigador: ${respuesta.status}`)
  }

  return cuerpo
}