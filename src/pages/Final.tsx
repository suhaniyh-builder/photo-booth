import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../Final.css";

import logo from "../assets/logo.png";
import frame1 from "../assets/frame.png";

const drawCover = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const imageRatio = image.width / image.height;
  const boxRatio = width / height;

  let sourceWidth = image.width;
  let sourceHeight = image.height;
  let sourceX = 0;
  let sourceY = 0;

  if (imageRatio > boxRatio) {
    // Image is wider → crop left and right
    sourceWidth = image.height * boxRatio;
    sourceX = (image.width - sourceWidth) / 2;
  } else {
    // Image is taller → crop top and bottom
    sourceHeight = image.width / boxRatio;
    sourceY = (image.height - sourceHeight) / 2;
  }

  // Mirror the photo horizontally
  ctx.save();

  ctx.translate(x + width, y);
  ctx.scale(-1, 1);

  ctx.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    width,
    height
  );

  ctx.restore();
};

const Final = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const boothRef = useRef<HTMLDivElement>(null);

  const photos = location.state?.photos || [];

  const downloadPhoto = async () => {
    if (!photos[0] || !photos[1]) return;

    // Same size as your frame image
    const canvas = document.createElement("canvas");

    canvas.width = 1024;
    canvas.height = 1536;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Load photo 1
    const photo1 = new Image();

    photo1.onload = () => {
      // Photo 1
      drawCover(
        ctx,
        photo1,
        128,
        84,
        768,
        522
      );

      // Load photo 2
      const photo2 = new Image();

      photo2.onload = () => {
        // Photo 2
        drawCover(
          ctx,
          photo2,
          128,
          645,
          768,
          522
        );

        // Load frame
        const frame = new Image();

        frame.onload = () => {
          // Frame goes ON TOP
          ctx.drawImage(
            frame,
            0,
            0,
            1024,
            1536
          );

          // Download
          const image = canvas.toDataURL("image/png");

          const link = document.createElement("a");

          link.download = "soohani-photo-booth.png";
          link.href = image;

          link.click();
        };

        frame.src = frame1;
      };

      photo2.src = photos[1];
    };

    photo1.src = photos[0];
  };

  return (
    <div className="final-page">

      {/* Logo */}
      <div className="final-logo">
        <img src={logo} alt="sOohani Booth" />
      </div>

      {/* Final photo */}
      <div
        className="final-booth"
        ref={boothRef}
      >

        {/* First photo */}
        <div className="final-slot final-slot-top">
          <img
            src={photos[0]}
            alt="Photo 1"
          />
        </div>

        {/* Second photo */}
        <div className="final-slot final-slot-bottom">
          <img
            src={photos[1]}
            alt="Photo 2"
          />
        </div>

        {/* Frame */}
        <img
          src={frame1}
          className="final-frame"
          alt="Photo frame"
        />

      </div>

      {/* Buttons */}
      <div className="final-buttons">

        <button onClick={downloadPhoto}>
          Download
        </button>

        <button onClick={() => navigate("/")}>
          Home
        </button>

      </div>

    </div>
  );
};

export default Final;