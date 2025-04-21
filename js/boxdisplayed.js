// Import MediaPipe classes at the top of your file
import { FilesetResolver, ObjectDetector } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/vision_bundle.js";

let objectDetector;

async function initializeObjectDetector() {
  try {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    
    objectDetector = await ObjectDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:`https://storage.googleapis.com/mediapipe-tasks/object_detector/efficientdet_lite0_uint8.tflite`
      },
      scoreThreshold: 0.5,
      runningMode: "IMAGE"
    });
    
    console.log("Model loaded successfully!");
    
    // Only perform detection after the model is loaded
    performDetection();
    
  } catch (error) {
    console.error("Error initializing object detector:", error);
  }
}

// Function to perform object detection
function performDetection() {
  const imageContainer = document.getElementById("image");
  const imageElement = imageContainer.querySelector("img");
  
  if (!imageElement) {
    console.error("No image element found!");
    return;
  }
  
  // Make sure image is loaded before detection
  if (imageElement.complete) {
    const detections = objectDetector.detect(imageElement);
    console.log("Detections:", detections);
    
    // Optional: Visualize the detections
    displayDetections(imageElement, detections);
  } else {
    imageElement.onload = () => {
      const detections = objectDetector.detect(imageElement);
      console.log("Detections:", detections);
      
      displayDetections(imageElement, detections);
    };
  }
}

// Function to display bounding boxes
function displayDetections(image, detections) {
  const imageContainer = document.getElementById("image");
  
  // Clear any previous bounding boxes
  const existingBoxes = imageContainer.querySelectorAll(".detection-box");
  existingBoxes.forEach(box => box.remove());
  
  detections.detections.forEach(detection => {
    const box = document.createElement("div");
    box.className = "detection-box";
    
    // Get coordinates relative to the image
    const boundingBox = detection.boundingBox;
    
    // Position the box
    box.style.position = "absolute";
    box.style.left = boundingBox.originX + "px";
    box.style.top = boundingBox.originY + "px";
    box.style.width = boundingBox.width + "px";
    box.style.height = boundingBox.height + "px";
    box.style.border = "2px solid red";
    
    // Add label
    const label = document.createElement("div");
    label.className = "detection-label";
    label.textContent = `${detection.categories[0].categoryName} ${Math.round(detection.categories[0].score * 100)}%`;
    label.style.position = "absolute";
    label.style.top = "-25px";
    label.style.left = "0px";
    label.style.color = "red";
    label.style.fontWeight = "bold";
    
    box.appendChild(label);
    imageContainer.appendChild(box);
  });
}

initializeObjectDetector();

console.log("App started");
