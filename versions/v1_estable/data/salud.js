// =======================================
// 📁 SALUD INTEGRAL – RENOVA PLUS
// =======================================
// Este archivo define los negocios del giro "Salud Integral".
// En este caso incluye un aviso real de Renova Plus.
// Puedes agregar más objetos al array si luego se suman otros avisos.
// =======================================

export const salud = [
  {
    id: "renova-plus",
    nombre: "Renova Plus",
    desc: "Energía diaria que fortalece cabello y uñas, mejora la piel y devuelve vitalidad. Ideal para personas activas o con cansancio diario.",
    img: "/images/LogoRenova.jpg", // ✅ Imagen real en public/images/
    tel: "987654321", // número de ejemplo
    direccion: "Delivery en Los Olivos y Lima Norte",
    horario: "Lunes a sábado • 9 a.m. – 8 p.m.",
    precio: "S/ 170 (introducción)",
    delivery: "Delivery gratis por lanzamiento",
    presentacion: "Polvo premium, 1 dosis al día",
    beneficios: [
      "Devuelve energía y vitalidad",
      "Fortalece cabello y uñas",
      "Mejora el aspecto de la piel",
      "Ayuda a reducir el cansancio diario",
    ],
    destacados: [
      "Fácil de preparar",
      "Sabor agradable",
      "Rinde para un mes completo",
    ],
    waMsg:
      "Hola 👋, quiero información sobre Renova Plus y cómo coordinar el delivery gratuito.",
  },
];
