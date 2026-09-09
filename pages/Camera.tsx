import { useRef, useState } from "react";
import Webcam from "react-webcam";
import "../Camera.css";

import logo from "../assets/logo.png";
import frame1 from "../assets/frame.png";

const Camera = () => {
  const webcamRef = useRef<Webcam>(null);

  const [photos, setPhotos] = useState<string[]>([]);

  const capturePhoto = () => {
    const image = webcamRef.current?.getScreenshot();

    if (image) {
      setPhotos((prev) => [...prev, image]);
    }
  };

  return (
    <div className="camera-page">

      {/* Logo */}
      <div className="camera-logo">
        <img src={logo} alt="sOOhani Booth" />
      </div>

      {/* Booth */}
      <div className="camera-booth">

        {/* First photo */}
        <div className="camera-slot camera-slot-top">
          {photos[0] ? (
            <img
              src={photos[0]}
              className="captured-photo"
              alt="First captured"
            />
          ) : (
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/png"
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
              alt="Second captured"
            />
          ) : photos.length === 1 ? (
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/png"
              className="camera-video"
            />
          ) : null}
        </div>

        {/* Frame */}
        <img
          src={frame1}
          className="camera-frame"
          alt="Photo frame"
        />

      </div>

      {/* Capture button */}
      {photos.length < 2 && (
        <button
          className="capture-button"
          onClick={capturePhoto}
        >
          Capture
        </button>
      )}

      {/* Finished */}
      {photos.length === 2 && (
        <p className="photos-done">
          Photos captured ♡
        </p>
      )}

    </div>
  );
};

export default Camera;