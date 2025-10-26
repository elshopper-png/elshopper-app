// === CATEGORÍAS OFICIALES DE EL SHOPPER ===
// Versión sellada bajo supervisión técnica — no modificar sin autorización.

const CATEGORIES = [
  { nombre: "Belleza & SPA", emoji: "💅", color: "#FF006E" },
  { nombre: "Construcción & Ferretería", emoji: "🏗️", color: "#7A3E1D" },
  { nombre: "Educación", emoji: "🎓", color: "#00B4D8" },
  { nombre: "Fiestas & Eventos", emoji: "🎉", color: "#E63946" },
  { nombre: "Fitness & Deportes", emoji: "💪", color: "#8338EC" },
  { nombre: "Gastronomía & Snacks", emoji: "🍔", color: "#FFB703" },
  { nombre: "Hogar & Servicios", emoji: "🏠", color: "#06D6A0" },
  { nombre: "Informática & Reparación", emoji: "🖥️", color: "#4361EE" },
  { nombre: "Inmobiliarias", emoji: "🏢", color: "#FB5607" },
  { nombre: "Marketing & Imprenta", emoji: "📰", color: "#E85D04" },
  { nombre: "Moda & Joyería", emoji: "👗", color: "#F72585" },
  { nombre: "Muebles & Decoraciones", emoji: "🪑", color: "#9C6644" },
  { nombre: "Salud Integral", emoji: "💊", color: "#0096C7" },
  { nombre: "Servicio Técnico", emoji: "⚙️", color: "#495057" },
  { nombre: "Servicios Profesionales", emoji: "💼", color: "#3A0CA3" },
  { nombre: "Veterinarias & Pet Shop", emoji: "🐾", color: "#9B5DE5" },
];

// === BLOQUE DE VERIFICACIÓN ===
(function verifyCategories() {
  const expectedCount = 16;
  const names = CATEGORIES.map((c) => c.nombre);
  const duplicates = names.filter((n, i) => names.indexOf(n) !== i);
  const missing = expectedCount - CATEGORIES.length;

  if (duplicates.length > 0) {
    throw new Error(
      `[ERROR DE VALIDACIÓN] Categorías duplicadas detectadas: ${duplicates.join(", ")}`
    );
  }

  if (missing !== 0) {
    throw new Error(
      `[ERROR DE VALIDACIÓN] Cantidad de categorías incorrecta: ${CATEGORIES.length}. Deben ser exactamente ${expectedCount}.`
    );
  }

  const requiredNames = [
    "Belleza & SPA",
    "Construcción & Ferretería",
    "Educación",
    "Fiestas & Eventos",
    "Fitness & Deportes",
    "Gastronomía & Snacks",
    "Hogar & Servicios",
    "Informática & Reparación",
    "Inmobiliarias",
    "Marketing & Imprenta",
    "Moda & Joyería",
    "Muebles & Decoraciones",
    "Salud Integral",
    "Servicio Técnico",
    "Servicios Profesionales",
    "Veterinarias & Pet Shop",
  ];

  const missingNames = requiredNames.filter((n) => !names.includes(n));
  if (missingNames.length > 0) {
    throw new Error(
      `[ERROR DE VALIDACIÓN] Faltan categorías oficiales: ${missingNames.join(", ")}`
    );
  }
})();

export default CATEGORIES;
