import { ImageResponse } from "next/og";

export const alt = "KyroX – Moderation, Tickets und Automatisierungen für Discord";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#070a10",
          color: "#f1f5f9",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -260,
            left: -120,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(16,185,129,0.25) 0%, rgba(16,185,129,0.10) 45%, transparent 72%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -180,
            bottom: -320,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(45,212,191,0.18) 0%, rgba(45,212,191,0.07) 48%, transparent 72%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 28,
            border: "1px solid rgba(45,212,191,0.18)",
            borderRadius: 30,
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "76px 84px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 72,
                height: 72,
                borderRadius: 20,
                background: "linear-gradient(135deg, #10b981, #0f766e)",
                boxShadow: "0 18px 50px rgba(16,185,129,0.28)",
                color: "white",
                fontSize: 32,
                fontWeight: 900,
              }}
            >
              KX
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 25, fontWeight: 800, letterSpacing: 5 }}>
                KYROX™
              </span>
              <span style={{ marginTop: 5, color: "#718096", fontSize: 15, letterSpacing: 4 }}>
                DISCORD SERVER MANAGEMENT
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 930 }}>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                marginBottom: 22,
                padding: "9px 17px",
                border: "1px solid rgba(45,212,191,0.28)",
                borderRadius: 9999,
                background: "rgba(16,185,129,0.10)",
                color: "#2dd4bf",
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              MODERN · SICHER · LEISTUNGSSTARK
            </div>
            <div style={{ fontSize: 68, fontWeight: 900, lineHeight: 1.03, letterSpacing: -3 }}>
              Dein Discord-Server.
              <span style={{ color: "#2dd4bf" }}> Einfach besser.</span>
            </div>
            <div style={{ marginTop: 24, color: "#a6b1c3", fontSize: 25, lineHeight: 1.45 }}>
              Moderation, Tickets, Automatisierungen, Backups und mehr – zentral mit KyroX.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 28, color: "#718096", fontSize: 17 }}>
            <span>kyrox-eight.vercel.app</span>
            <span style={{ color: "#10b981" }}>●</span>
            <span>KyroX Official</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
