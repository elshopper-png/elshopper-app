// src/core/Visor.jsx
export default function Visor({ children }) {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#f0f2f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 0,
        margin: 0,
        overflowY: "auto"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#ffffff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          borderRadius: "0px",
          overflow: "hidden"
        }}
      >
        {children}
      </div>
    </div>
  );
}
