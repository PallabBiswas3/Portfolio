import { ImageResponse } from "next/og";
export const alt = "Pallab Biswas — AI, Research & Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() { return new ImageResponse(<div style={{ width: "100%", height: "100%", background: "#0b0e14", color: "#eef1f7", display: "flex", flexDirection: "column", justifyContent: "center", padding: 90, borderBottom: "8px solid #87aaff" }}><div style={{ fontSize: 20, color: "#87aaff", letterSpacing: 5, marginBottom: 34 }}>AI · RESEARCH · ENGINEERING</div><div style={{ fontSize: 83, letterSpacing: -4 }}>Pallab Biswas.</div><div style={{ fontSize: 34, color: "#a0a9ba", marginTop: 22 }}>Building intelligent systems. From research to the real world.</div><div style={{ fontSize: 21, color: "#828da1", marginTop: 54 }}>IIT Kharagpur / Electrical Engineering / SPML</div></div>, size); }
