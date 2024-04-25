import React, { useEffect, useMemo, useRef, useState } from "react";

export default function Chart({ data }) {
  const canvasRef = useRef();
  const [pnl, setPnl] = useState([]);

  useEffect(() => {}, []);

  const plot_chart = (ctx: CanvasRenderingContext2D, x, y) => {
    const margin = 0;
    const paddingY = 0.05;
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const color = "#64ff61";

    ctx.clearRect(0, 0, width, height);

    //STYLING:
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#48f542"; // Line color
    ctx.lineCap = "round"; // Line cap style
    ctx.lineJoin = "round"; // Line join style
    ctx.setLineDash([]); // Solid line
    ctx.shadowColor = "rgba(0, 0, 0, 0.2)"; // Shadow color
    ctx.shadowBlur = 5; // Shadow blur
    ctx.shadowOffsetX = 1; // Shadow X offset
    ctx.shadowOffsetY = 1; // Shadow Y offset
    ctx.fillStyle = "rgba(100, 255, 97, 0.1)";

    if (x != undefined) {
      let maxX = Math.max(...x);
      let maxY = Math.max(...y);
      let minX = Math.min(...x);
      let minY = Math.min(...y);

      let rangeY = maxY - minY;
      let rangeX = maxX - maxX;
      let scaleY = height / rangeY;
      let scaleX = width / (x.length - 1);
      ctx.beginPath();

      for (let i = 0; i < x.length; i++) {
        let posX = margin + i * scaleX + 1;
        let posY = height - (margin + (y[i] - minY) * scaleY);
        if (i === 0) ctx.moveTo(posX, posY);
        ctx.lineTo(posX, posY);
      }
      ctx.lineTo(width + 100, height);
      ctx.fill();
      //MAKE SCALABLE
      ctx.stroke();
    }
  };

  useEffect(() => {
    console.log(data);
    plot_chart(canvasRef.current.getContext("2d"), data["x"], data["y"]);
    if (data["y"] != undefined) setPnl(data["y"][data["y"].length - 1]);
  }, [data]);

  return (
    <div className="w-full vertical center-h p-4">
      <div className="w-full flex flex-row justify-between">
        <h1 className="text-text ">Equity</h1>
        <h2 className="text-a font-bold">{pnl} kr</h2>
      </div>

      <canvas
        width={1000}
        height={500}
        className="px-2 mt-2 w-full pt-2 rounded-t-md"
        ref={canvasRef}
      ></canvas>
    </div>
  );
}
