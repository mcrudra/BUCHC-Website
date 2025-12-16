import logo from "../assets/dev.webp";
export default function Development() {
  return (
    <div
      id="testflag"
      style={{
        position: "fixed",
        top: "73px",
        right: "44px",
        width: "400px",
        height: "290px",
        background: `url(${logo}) no-repeat center center`,
        backgroundSize: "contain",
        zIndex: 10000,
        pointerEvents: "none",
        opacity: 0.6,
        transform: "rotate(44deg) translate(40%, -10%)",
        transformOrigin: "top right",
      }}
    />
  );
}
