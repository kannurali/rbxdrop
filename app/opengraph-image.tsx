import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "RBXDrop — твой самый быстрый способ купить Robux";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #060A12 45%, #10254D 100%)",
          padding: 72,
          color: "#F8FAFC",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(160deg, #60A5FA, #1D4ED8)",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1.5 }}>RBXDrop</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 800, letterSpacing: -2.6, lineHeight: 1.05 }}>
            Твой самый быстрый способ
          </div>
          <div style={{ fontSize: 68, fontWeight: 800, letterSpacing: -2.6, lineHeight: 1.05 }}>
            купить Robux
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#94A3B8" }}>
            Три способа получения · выдача от 2 минут · пароль не нужен
          </div>
        </div>
      </div>
    ),
    size,
  );
}
