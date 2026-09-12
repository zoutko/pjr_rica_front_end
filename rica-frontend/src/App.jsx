import { useEffect, useState } from 'react'
import { listarInvestigadores, crearInvestigador } from './api.js'

const FORMULARIO_VACIO = {
  nombreCompleto: '',
  correoInstitucional: '',
  grupoInvestigacion: ''
}

function App() {
  const [investigadores, setInvestigadores] = useState([])
  const [cargando, setCargando] = useState(true)
  const [errorCarga, setErrorCarga] = useState(null)

  const [formulario, setFormulario] = useState(FORMULARIO_VACIO)
  const [errorFormulario, setErrorFormulario] = useState(null)
  const [enviando, setEnviando] = useState(false)

  async function cargarInvestigadores() {
    setCargando(true)
    setErrorCarga(null)
    try {
      const datos = await listarInvestigadores()
      setInvestigadores(datos)
    } catch (error) {
      setErrorCarga(error.message)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarInvestigadores()
  }, [])

  function actualizarCampo(evento) {
    const { name, value } = evento.target
    setFormulario((anterior) => ({ ...anterior, [name]: value }))
  }

  async function manejarEnvio(evento) {
    evento.preventDefault()
    setEnviando(true)
    setErrorFormulario(null)
    try {
      await crearInvestigador(formulario)
      setFormulario(FORMULARIO_VACIO)
      await cargarInvestigadores()
    } catch (error) {
      setErrorFormulario(error.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main style={{ maxWidth: 640, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>RICA — Investigadores</h1>

      <section>
        <h2>Registrar investigador</h2>
        <form onSubmit={manejarEnvio}>
          <div>
            <label htmlFor="nombreCompleto">Nombre completo</label>
            <br />
            <input
              id="nombreCompleto"
              name="nombreCompleto"
              value={formulario.nombreCompleto}
              onChange={actualizarCampo}
              required
            />
          </div>
          <div>
            <label htmlFor="correoInstitucional">Correo institucional</label>
            <br />
            <input
              id="correoInstitucional"
              name="correoInstitucional"
              type="email"
              value={formulario.correoInstitucional}
              onChange={actualizarCampo}
              required
            />
          </div>
          <div>
            <label htmlFor="grupoInvestigacion">Grupo de investigación</label>
            <br />
            <input
              id="grupoInvestigacion"
              name="grupoInvestigacion"
              value={formulario.grupoInvestigacion}
              onChange={actualizarCampo}
              required
            />
          </div>
          <button type="submit" disabled={enviando}>
            {enviando ? 'Guardando...' : 'Registrar'}
          </button>
        </form>
        {errorFormulario && <p style={{ color: 'crimson' }}>{errorFormulario}</p>}
      </section>

      <section>
        <h2>Investigadores registrados</h2>
        {cargando && <p>Cargando...</p>}
        {errorCarga && (
          <p style={{ color: 'crimson' }}>
            No fue posible cargar los investigadores: {errorCarga}
          </p>
        )}
        {!cargando && !errorCarga && (
          <ul>
            {investigadores.map((investigador) => (
              <li key={investigador.id}>
                <b>{investigador.nombreCompleto}</b> — {investigador.grupoInvestigacion}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App