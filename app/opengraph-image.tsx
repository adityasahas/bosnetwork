import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "bos.network — Boston/Cambridge Startup Founders Directory";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const clubs = [
  { name: "Disruptors", school: "BU" },
  { name: "REV", school: "NEU" },
  { name: "DAM", school: "Babson" },
  { name: "Claude Builder Club", school: "MIT" },
];

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0c0a09",
          padding: "60px 72px",
          fontFamily: "monospace",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            opacity: 0.15,
            backgroundImage:
              "linear-gradient(#2a2520 1px, transparent 1px), linear-gradient(90deg, #2a2520 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "400px",
            background:
              "radial-gradient(ellipse at center, rgba(196,30,58,0.08) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(ellipse at center, rgba(196,30,58,0.05) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "#e8e4de",
                fontSize: "56px",
                fontWeight: 700,
                letterSpacing: "-1px",
              }}
            >
              bos.network
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "12px",
              gap: "8px",
            }}
          >
            <span
              style={{
                color: "#8a8279",
                fontSize: "20px",
                letterSpacing: "1px",
              }}
            >
              boston/cambridge startup founders directory
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginTop: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              {clubs.map((club) => (
                <div
                  key={club.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    border: "1px solid #2a2520",
                    padding: "10px 18px",
                    backgroundColor: "rgba(20, 18, 16, 0.8)",
                  }}
                >
                  <span
                    style={{
                      color: "#e8e4de",
                      fontSize: "17px",
                      fontWeight: 500,
                    }}
                  >
                    {club.name}
                  </span>
                  <span
                    style={{
                      color: "#c41e3a",
                      fontSize: "13px",
                      opacity: 0.7,
                    }}
                  >
                    @{club.school}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
