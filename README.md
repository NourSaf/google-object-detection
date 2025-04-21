# Google Mediapipe Vision - Object Detection

This documentation outlines the workflow and provides a clear breakdown of the JavaScript code needed to implement Object Detection model using Google's Mediapipe Object Detection Vision Task.

---

## Step 1: Import Required Libraries

The first step is to import the Mediapipe Vision classes necessary for object detection:

```javascript
import { FilesetResolver, ObjectDetector } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/vision_bundle.js";
```

- **FilesetResolver:** Helps in managing and accessing model files and tasks.
- **ObjectDetector:** The main class for detecting objects in images.

---

## Step 2: Declare Global Variables

Define a global variable to hold the instance of the object detector:

```javascript
let objectDetector;
```

---

## Step 3: Initialize the Object Detector

Create an asynchronous function to initialize and load the object detection model:

```javascript
async function initializeObjectDetector() {
  try {
    // Load necessary files for vision tasks
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    // Create an instance of ObjectDetector with specified options
    objectDetector = await ObjectDetector.createFromOptions(
      vision, {
        baseOptions: {
          // Specify the path to the object detection model
          modelAssetPath: `https://storage.googleapis.com/mediapipe-tasks/object_detector/efficientdet_lite0_uint8.tflite`
        },
        scoreThreshold: 0.2, // Set the threshold for detection accuracy
        runningMode: "IMAGE" // Set the detection mode to IMAGE
      }
    );

    console.log("Model Loaded Successfully");

    // Execute detection after the model is loaded. Explaind in the next step
    performDetection();

  } catch (error) {
    console.error("Error initializing object detector:", error);
  }
}
```

- **FilesetResolver.forVisionTasks:** Retrieves the necessary files for vision tasks from Mediapipe CDN.
- **ObjectDetector.createFromOptions:** Loads and configures the detection model.

---

## Step 4: Perform Object Detection

Define a function to detect objects from an image on your webpage:

```javascript
function performDetection(){
  const imageContainer = document.getElementById("image");
  const imageElement = imageContainer.querySelector("img");
  const detections = objectDetector.detect(imageElement);

  console.log("Detections:", detections);
}
```

- Retrieves an image from a container (`<div id="image">`) in your HTML.
- Runs the detection on this image.
- Logs detected objects to the console.

---

## Step 5: Run the Initialization

Finally, call the initialization function to start the whole process:

```javascript
initializeObjectDetector();
```

---
🚀 Now you are ready to detect images! 🚀