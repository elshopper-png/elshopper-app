// ============================================================
// 🔐 NotificarNuevoAnunciante.jsx
// Control administrativo — Paso final del alta Shopper
// ============================================================

import { useEffect, useState } from "react";
import categoriasOficiales from "../data/categories.json";

const SUPABASE_URL =
  "https://qaslnhtzmquqcuktdkdd.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_n0zbjKrmY2bTtKFW_TsPzw_k6AGz9-N";

const PUSH_FUNCTION_URL =
  `${SUPABASE_URL}/functions/v1/push-shopper`;


export default function NotificarNuevoAnunciante() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState("");
  const [sesion, setSesion] = useState(null);

  const [anunciantes, setAnunciantes] = useState([]);
  const [cargandoAnunciantes, setCargandoAnunciantes] =
    useState(false);

  const [anuncianteSeleccionado, setAnuncianteSeleccionado] =
    useState(null);

  const [confirmando, setConfirmando] =
    useState(false);

  const [enviando, setEnviando] =
    useState(false);

  const [resultadoEnvio, setResultadoEnvio] =
    useState(null);


  // ==========================================================
  // 🔐 LOGIN ADMINISTRATIVO
  // ==========================================================
  const iniciarSesion = async (event) => {
    event.preventDefault();

    if (procesando) return;

    setProcesando(true);
    setError("");

    try {
      const respuesta = await fetch(
        `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
        {
          method: "POST",

          headers: {
            apikey: SUPABASE_PUBLISHABLE_KEY,
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: email.trim(),
            password
          })
        }
      );

      const datos =
        await respuesta.json();

      if (
        !respuesta.ok ||
        !datos.access_token
      ) {
        throw new Error(
          datos?.error_description ||
          datos?.msg ||
          "No se pudo iniciar sesión."
        );
      }

      setSesion({
        accessToken:
          datos.access_token
      });

      setPassword("");

    } catch (errorLogin) {
      setError(
        errorLogin?.message ||
        "No se pudo iniciar sesión."
      );

    } finally {
      setProcesando(false);
    }
  };


  // ==========================================================
  // 📋 LEER ANUNCIANTES
  // ==========================================================
  useEffect(() => {
    if (!sesion?.accessToken) return;

    let cancelado = false;

    const cargarAnunciantes = async () => {
      setCargandoAnunciantes(true);
      setError("");

      try {
        const respuesta = await fetch(
          `${SUPABASE_URL}/rest/v1/shop_anunciantes?select=id,nombre,categoria,slug&order=nombre.asc`,
          {
            headers: {
              apikey:
                SUPABASE_PUBLISHABLE_KEY,

              Authorization:
                `Bearer ${sesion.accessToken}`
            }
          }
        );

        const datos =
          await respuesta.json();

        if (!respuesta.ok) {
          throw new Error(
            datos?.message ||
            "No se pudieron leer los anunciantes."
          );
        }

        const nombresCategorias =
          new Set(
            categoriasOficiales.map(
              (categoria) =>
                categoria.nombre
            )
          );

        const listaValida =
          Array.isArray(datos)
            ? datos.filter(
                (anunciante) =>
                  anunciante?.nombre &&
                  anunciante?.categoria &&
                  anunciante?.slug &&
                  nombresCategorias.has(
                    anunciante.categoria
                  )
              )
            : [];

        if (!cancelado) {
          setAnunciantes(
            listaValida
          );
        }

      } catch (errorCarga) {
        if (!cancelado) {
          setError(
            errorCarga?.message ||
            "No se pudieron cargar los anunciantes."
          );
        }

      } finally {
        if (!cancelado) {
          setCargandoAnunciantes(
            false
          );
        }
      }
    };

    cargarAnunciantes();

    return () => {
      cancelado = true;
    };

  }, [sesion]);


  // ==========================================================
  // 📋 SELECCIONAR ANUNCIANTE
  // ==========================================================
  const seleccionarAnunciante = (event) => {
    const slug =
      event.target.value;

    setConfirmando(false);
    setResultadoEnvio(null);
    setError("");

    if (!slug) {
      setAnuncianteSeleccionado(
        null
      );

      return;
    }

    const encontrado =
      anunciantes.find(
        (anunciante) =>
          anunciante.slug === slug
      ) || null;

    setAnuncianteSeleccionado(
      encontrado
    );
  };


  // ==========================================================
  // 🚀 ENVÍO PUSH REAL
  // ==========================================================
  const enviarPush = async () => {
    if (
      enviando ||
      !anuncianteSeleccionado ||
      !sesion?.accessToken
    ) {
      return;
    }

    setEnviando(true);
    setError("");
    setResultadoEnvio(null);

    const titulo =
      "Nuevo en Shopper";

    const mensaje =
      `${anuncianteSeleccionado.nombre} se incorporó a ${anuncianteSeleccionado.categoria}. Conoce sus servicios. Haz clic aquí.`;

    const url =
      `/atlash/${anuncianteSeleccionado.slug}`;

    try {
      const respuesta = await fetch(
        PUSH_FUNCTION_URL,
        {
          method: "POST",

          headers: {
            apikey:
              SUPABASE_PUBLISHABLE_KEY,

            Authorization:
              `Bearer ${sesion.accessToken}`,

            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            titulo,
            mensaje,
            url
          })
        }
      );

      const datos =
        await respuesta.json();

      if (
        !respuesta.ok ||
        datos?.ok !== true
      ) {
        throw new Error(
          datos?.error ||
          "No se pudo enviar el Push."
        );
      }

      setResultadoEnvio({
        ok: true,
        suscripciones:
          datos.suscripciones || 0,
        enviadas:
          datos.enviadas || 0,
        fallidas:
          datos.fallidas || 0,
        desactivadas:
          datos.desactivadas || 0
      });

      setConfirmando(false);

    } catch (errorEnvio) {
      setError(
        errorEnvio?.message ||
        "No se pudo enviar el Push."
      );

    } finally {
      setEnviando(false);
    }
  };


  // ==========================================================
  // 🔐 PANTALLA ADMINISTRATIVA
  // ==========================================================
  if (sesion) {
    const tituloPush =
      "Nuevo en Shopper";

    const mensajePush =
      anuncianteSeleccionado
        ? `${anuncianteSeleccionado.nombre} se incorporó a ${anuncianteSeleccionado.categoria}. Conoce sus servicios. Haz clic aquí.`
        : "";

    const urlPush =
      anuncianteSeleccionado
        ? `/atlash/${anuncianteSeleccionado.slug}`
        : "";

    return (
      <main style={styles.pagina}>
        <section style={styles.tarjeta}>
          <h1 style={styles.titulo}>
            Notificar nuevo anunciante
          </h1>

          <p style={styles.correcto}>
            Acceso administrativo autorizado.
          </p>

          <p style={styles.texto}>
            Seleccione únicamente un anunciante
            cuya alta ya fue completamente aprobada.
          </p>

          {cargandoAnunciantes ? (
            <p style={styles.texto}>
              Cargando anunciantes...
            </p>
          ) : (
            <select
              value={
                anuncianteSeleccionado?.slug ||
                ""
              }
              onChange={
                seleccionarAnunciante
              }
              style={styles.input}
              disabled={enviando}
            >
              <option value="">
                Seleccionar anunciante
              </option>

              {anunciantes.map(
                (anunciante) => (
                  <option
                    key={anunciante.id}
                    value={
                      anunciante.slug
                    }
                  >
                    {anunciante.nombre}
                  </option>
                )
              )}
            </select>
          )}

          {error && (
            <p style={styles.error}>
              {error}
            </p>
          )}

          {anuncianteSeleccionado && (
            <div style={styles.preview}>
              <p style={styles.previewEtiqueta}>
                VISTA PREVIA
              </p>

              <p style={styles.previewTitulo}>
                {tituloPush}
              </p>

              <p style={styles.previewMensaje}>
                {mensajePush}
              </p>

              <div style={styles.datos}>
                <p>
                  <strong>Nombre:</strong>{" "}
                  {
                    anuncianteSeleccionado.nombre
                  }
                </p>

                <p>
                  <strong>Giro:</strong>{" "}
                  {
                    anuncianteSeleccionado.categoria
                  }
                </p>

                <p>
                  <strong>Slug:</strong>{" "}
                  {
                    anuncianteSeleccionado.slug
                  }
                </p>

                <p>
                  <strong>Destino:</strong>{" "}
                  {urlPush}
                </p>
              </div>


              {!confirmando &&
                !resultadoEnvio && (
                  <button
                    type="button"
                    style={styles.boton}
                    onClick={() =>
                      setConfirmando(true)
                    }
                  >
                    Notificar nuevo anunciante
                  </button>
                )}


              {confirmando && (
                <div
                  style={
                    styles.confirmacion
                  }
                >
                  <p
                    style={
                      styles.confirmacionTitulo
                    }
                  >
                    Confirmar envío
                  </p>

                  <p
                    style={
                      styles.confirmacionTexto
                    }
                  >
                    Este Push será enviado a
                    todas las suscripciones
                    activas de Shopper.
                  </p>

                  <button
                    type="button"
                    style={
                      styles.botonConfirmar
                    }
                    disabled={enviando}
                    onClick={enviarPush}
                  >
                    {enviando
                      ? "Enviando..."
                      : "Sí, enviar ahora"}
                  </button>

                  <button
                    type="button"
                    style={
                      styles.botonCancelar
                    }
                    disabled={enviando}
                    onClick={() =>
                      setConfirmando(false)
                    }
                  >
                    Cancelar
                  </button>
                </div>
              )}


              {resultadoEnvio?.ok && (
                <div
                  style={
                    styles.resultado
                  }
                >
                  <p
                    style={
                      styles.resultadoTitulo
                    }
                  >
                    Push enviado correctamente
                  </p>

                  <p>
                    Suscripciones:{" "}
                    {
                      resultadoEnvio.suscripciones
                    }
                  </p>

                  <p>
                    Enviadas:{" "}
                    {
                      resultadoEnvio.enviadas
                    }
                  </p>

                  <p>
                    Fallidas:{" "}
                    {
                      resultadoEnvio.fallidas
                    }
                  </p>

                  <p>
                    Desactivadas:{" "}
                    {
                      resultadoEnvio.desactivadas
                    }
                  </p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    );
  }


  // ==========================================================
  // 🔐 LOGIN
  // ==========================================================
  return (
    <main style={styles.pagina}>
      <section style={styles.tarjeta}>
        <h1 style={styles.titulo}>
          Administración Shopper
        </h1>

        <p style={styles.texto}>
          Acceso exclusivo para notificar
          nuevos anunciantes.
        </p>

        <form onSubmit={iniciarSesion}>
          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value
              )
            }
            placeholder="Correo"
            autoComplete="username"
            required
            style={styles.input}
          />

          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
            placeholder="Contraseña"
            autoComplete="current-password"
            required
            style={styles.input}
          />

          {error && (
            <p style={styles.error}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={procesando}
            style={styles.boton}
          >
            {procesando
              ? "Ingresando..."
              : "Ingresar"}
          </button>
        </form>
      </section>
    </main>
  );
}


// ============================================================
// 🎨 ESTILOS
// ============================================================
const styles = {
  pagina: {
    minHeight: "100vh",
    background: "#f5f1f2",
    padding: "32px 18px",
    boxSizing: "border-box",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
  },

  tarjeta: {
    width: "100%",
    maxWidth: 500,
    margin: "40px auto",
    background: "#fff",
    borderRadius: 20,
    padding: 26,
    boxSizing: "border-box",
    boxShadow:
      "0 12px 35px rgba(0,0,0,.12)"
  },

  titulo: {
    margin: "0 0 12px",
    color: "#7d2035",
    fontSize: 26
  },

  texto: {
    color: "#555",
    lineHeight: 1.5,
    marginBottom: 22
  },

  input: {
    width: "100%",
    minHeight: 50,
    marginBottom: 12,
    padding: "0 14px",
    border: "1px solid #ccc",
    borderRadius: 12,
    boxSizing: "border-box",
    fontSize: 16,
    background: "#fff"
  },

  boton: {
    width: "100%",
    minHeight: 52,
    marginTop: 14,
    border: 0,
    borderRadius: 12,
    background: "#FFD21F",
    color: "#111",
    fontWeight: 800,
    fontSize: 17,
    cursor: "pointer"
  },

  error: {
    padding: 12,
    borderRadius: 10,
    background: "#ffeaea",
    color: "#a40000",
    fontSize: 14,
    fontWeight: 700
  },

  correcto: {
    color: "#19723a",
    fontWeight: 700
  },

  preview: {
    marginTop: 18,
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 16,
    background: "#fafafa"
  },

  previewEtiqueta: {
    margin: "0 0 8px",
    color: "#7d2035",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 1
  },

  previewTitulo: {
    margin: "0 0 10px",
    color: "#222",
    fontSize: 20,
    fontWeight: 800
  },

  previewMensaje: {
    margin: "0 0 18px",
    color: "#444",
    lineHeight: 1.5
  },

  datos: {
    paddingTop: 12,
    borderTop: "1px solid #ddd",
    color: "#444",
    fontSize: 14,
    lineHeight: 1.5
  },

  confirmacion: {
    marginTop: 18,
    padding: 16,
    borderRadius: 12,
    background: "#fff4c2"
  },

  confirmacionTitulo: {
    margin: "0 0 8px",
    fontWeight: 800,
    color: "#5d4a00"
  },

  confirmacionTexto: {
    margin: "0 0 14px",
    color: "#5d4a00",
    lineHeight: 1.4
  },

  botonConfirmar: {
    width: "100%",
    minHeight: 50,
    border: 0,
    borderRadius: 12,
    background: "#FFD21F",
    color: "#111",
    fontWeight: 800,
    fontSize: 16,
    cursor: "pointer",
    marginBottom: 10
  },

  botonCancelar: {
    width: "100%",
    minHeight: 46,
    border: "1px solid #ccc",
    borderRadius: 12,
    background: "#fff",
    color: "#444",
    fontWeight: 700,
    cursor: "pointer"
  },

  resultado: {
    marginTop: 18,
    padding: 16,
    borderRadius: 12,
    background: "#eaf8ee",
    color: "#175f30",
    fontSize: 14
  },

  resultadoTitulo: {
    margin: "0 0 12px",
    fontWeight: 800,
    fontSize: 16
  }
};