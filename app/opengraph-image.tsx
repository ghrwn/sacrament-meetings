import { ImageResponse } from "next/og";

export const alt = "Sacrament Meeting Planner: plan, prepare, and organize Sunday worship";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "68px 76px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #334155 100%)",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            right: "-110px",
            top: "-170px",
            width: "620px",
            height: "620px",
            borderRadius: "310px",
            background: "linear-gradient(145deg, rgba(217, 164, 65, 0.25), rgba(217, 164, 65, 0.02))",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", width: "660px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", color: "#f4c66a", fontSize: "22px", letterSpacing: "5px", fontWeight: 700 }}>
            <div style={{ width: "42px", height: "4px", background: "#f4c66a" }} />
            SUNDAY WORSHIP
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: "32px", fontSize: "66px", lineHeight: 1.08, fontWeight: 700, letterSpacing: "-2px" }}>
            <span>Sacrament</span>
            <span>Meeting Planner</span>
          </div>
          <div style={{ display: "flex", marginTop: "30px", fontSize: "25px", color: "#cbd5e1", lineHeight: 1.4 }}>
            Plan, prepare, and organize meaningful Sunday meetings.
          </div>
          <div style={{ display: "flex", marginTop: "56px", fontSize: "18px", color: "#f4c66a", letterSpacing: "2px", fontWeight: 700 }}>
            LUC BAN WARD
          </div>
        </div>
        <div style={{ width: "320px", height: "400px", display: "flex", alignItems: "flex-end", justifyContent: "center", }}>
          <div style={{ width: "280px", height: "320px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", border: "3px solid rgba(255,255,255,0.28)", borderBottom: "none", borderRadius: "150px 150px 0 0", padding: "26px 22px 0 22px", background: "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02))" }}>
            <div style={{ display: "flex", width: "100%", height: "165px", justifyContent: "center", alignItems: "center", gap: "14px", borderBottom: "3px solid #d9a441" }}>
              <div style={{ width: "66px", height: "140px", border: "3px solid #f4c66a", borderRadius: "34px 34px 4px 4px", background: "rgba(244,198,106,0.10)" }} />
              <div style={{ width: "66px", height: "140px", border: "3px solid #f4c66a", borderRadius: "34px 34px 4px 4px", background: "rgba(244,198,106,0.10)" }} />
            </div>
            <div style={{ display: "flex", width: "190px", height: "80px", background: "#d9a441", alignItems: "center", justifyContent: "center", marginTop: "12px" }}>
              <div style={{ width: "135px", height: "42px", border: "2px solid #fff1cf", background: "#9a6a26" }} />
            </div>
            <div style={{ display: "flex", width: "240px", height: "16px", background: "#f4c66a", marginTop: "10px" }} />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
