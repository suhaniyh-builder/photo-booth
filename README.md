
# Photo Booth App

A simple React + TypeScript photo booth application using the user's webcam to capture two photos, place them inside a frame, and download the final photo strip.

## Tech Used

- React
- TypeScript
- Vite
- `react-webcam`
- React Router
- Browser Canvas API

## How It Works

### 1. `useState`

Used to store the captured photos.

```tsx
const [photos, setPhotos] = useState<string[]>([]);
````

After each capture, the new photo is added to the array.

```text
photos[0] → First photo
photos[1] → Second photo
```

### 2. `useRef`

Used to access the `Webcam` component directly.

```tsx
const webcamRef = useRef<Webcam>(null);
```

This allows us to call:

```tsx
webcamRef.current?.getScreenshot();
```

### 3. `react-webcam`

Used to access the user's camera and display the live webcam.

```tsx
<Webcam
  ref={webcamRef}
  audio={false}
  screenshotFormat="image/png"
  videoConstraints={{
    facingMode: "user",
  }}
/>
```

Flow:

```text
Webcam
  ↓
Browser Camera API
  ↓
Live video stream
  ↓
getScreenshot()
  ↓
PNG data URL
```

### 4. Capturing Photos

```tsx
const photo = webcamRef.current?.getScreenshot();
```

`getScreenshot()` returns the captured image as a PNG data URL.

The photo is then stored in React state.

### 5. Navigation

React Router is used to move from the Camera page to the Final page.

```tsx
navigate("/final", {
  state: {
    photos: newPhotos,
  },
});
```

The photos are passed through React Router state.

On the Final page:

```tsx
const photos = location.state?.photos || [];
```

### 6. Canvas API

The browser's built-in Canvas API is used to create the final photo strip.

```tsx
const canvas = document.createElement("canvas");

canvas.width = 1024;
canvas.height = 1536;

const ctx = canvas.getContext("2d");
```

The canvas is used to:

1. Draw the first photo
2. Draw the second photo
3. Draw the transparent frame on top

```text
Photo 1
   +
Photo 2
   +
Frame
   ↓
Final Canvas
```

### 7. `drawCover()`

A custom function is used to place photos inside the frame without stretching or distorting them.

It calculates the correct crop based on the photo and box aspect ratios.

### 8. Download

No download library is used.

The browser's built-in Canvas and Anchor APIs are used.

```tsx
const image = canvas.toDataURL("image/png");
```

This converts the canvas into a PNG data URL.

Then:

```tsx
const link = document.createElement("a");

link.download = "soohani-photo-booth.png";
link.href = image;

link.click();
```

This triggers the browser's native download.

## Overall Flow

```text
User opens Camera
        ↓
react-webcam accesses camera
        ↓
Live video appears
        ↓
Capture button
        ↓
getScreenshot()
        ↓
PNG data URL
        ↓
React useState
        ↓
Capture second photo
        ↓
React Router → Final page
        ↓
Canvas API
        ↓
Photo 1 + Photo 2 + Frame
        ↓
toDataURL()
        ↓
Browser download
```

```
```
