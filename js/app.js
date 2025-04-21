//VISIT THE LINK FOR MORE DETAILED INFORMATION  
// https://ai.google.dev/edge/mediapipe/solutions/vision/object_detector 

//import the classes for task vision 
import { FilesetResolver, ObjectDetector } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/vision_bundle.js";

//Declare a global variable for the object detector
let objectDetector;

//Async Function to load the model and intiate a detector
async function initializeObjectDetector() {
  //try catch block to handle errors
  try {
    // FilesetResolver handels accessing files
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    // FilesetResolver gets the the vision tasks files
    objectDetector = await ObjectDetector.createFromOptions(
      vision, {
        baseOptions: {
          //MODEL PATH, You can also download it and select the local path to the directory 
          modelAssetPath:`https://storage.googleapis.com/mediapipe-tasks/object_detector/efficientdet_lite0_uint8.tflite`
        },
        scoreThreshold: 0.2,
        runningMode: "IMAGE"
    });
    console.log("Model Loaded");

    //RUN YOUR FUNCTIONS
    performDetection();
    
  } catch (error) {
    console.error("Error initializing object detector:", error);
  }
}_

function performDetection(){
  const imageContainer = document.getElementById("image");
  const imageElement = imageContainer.querySelector("img");
  const detections = objectDetector.detect(imageElement);
  console.log("Detections:", detections);
}





initializeObjectDetector();