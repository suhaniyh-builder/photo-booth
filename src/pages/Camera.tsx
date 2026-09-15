import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

import "../Camera.css";

import logo from "../assets/logo.png";
import frame from "../assets/frame.png";

const Camera = () => {
  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();

  const [photos, setPhotos] = useState<string[]>([]);

  const capturePhoto = () => {
    const photo = webcamRef.current?.getScreenshot();

    if (!photo) return;

    const newPhotos = [...photos, photo];

    setPhotos(newPhotos);

    // After taking both photos, go to the final page.
    if (newPhotos.length === 2) {
      navigate("/final", {
        state: {
          photos: newPhotos,
        },
      });
    }
  };

  return (
    <div className="camera-page">

      {/* Logo */}
      <div className="camera-logo">
        <img src={logo} alt="sOohani Booth" />
      </div>

      {/* Photo Booth */}
      <div className="camera-booth">

        {/* First photo */}
        <div className="camera-slot camera-slot-top">
          {photos[0] ? (
            <img
              src={photos[0]}
              className="captured-photo"
              alt="Captured photo 1"
            />
          ) : (
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/png"
              videoConstraints={{
                facingMode: "user",
              }}
              className="camera-video"
            />
          )}
        </div>

        {/* Second photo */}
        <div className="camera-slot camera-slot-bottom">
          {photos[1] ? (
            <img
              src={photos[1]}
              className="captured-photo"
              alt="Captured photo 2"
            />
          ) : photos.length === 1 ? (
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/png"
              videoConstraints={{
                facingMode: "user",
              }}
              className="camera-video"
            />
          ) : null}
        </div>

        {/* Black frame */}
        <img
          src={frame}
          className="camera-frame"
          alt="Photo frame"
        />

      </div>

      {/* Capture button */}
      <button
        className="capture-button"
        onClick={capturePhoto}
      >
        Capture
      </button>

    </div>
  );
};

export default Camera;