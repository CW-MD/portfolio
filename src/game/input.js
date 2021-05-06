//keybinds, mappings, control scheme will go here
import React from "react";
// const w = "w" | "W"; // 87
// const a = "a" | "A"; // 65
// const s = "s" | "S"; // 83
// const d = "d" | "D"; // 68
// const keyBinds = { w: false, a: false, s: false, d: false };

export default function listen() {
  window.addEventListener("keydown", (e) => {
    if (e.key === "w" || e.key === "W") {
      console.log("W Pressed");
    }
    if (e.key === "a" || e.key === "A") {
      console.log("A Pressed");
    }
    if (e.key === "s" || e.key === "S") {
      console.log("S Pressed");
    }
    if (e.key === "d" || e.key === "D") {
      console.log("D Pressed");
    }
  });

  return <></>;
}
