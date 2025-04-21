// Import MediaPipe classes at the top of your file
//Predefinde structure by Google by Google Developers
//import the task vision library
import { FilesetResolver, ObjectDetector, ImageClassifier } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/vision_bundle.js";

//Declare a global variable for the object detector
let objectDetector;
let imageClassifier;

//Async Function to load the model and intiate a detector
async function initializeObjectDetector() {
  //try catch block to handle errors
  try {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    
    objectDetector = await ObjectDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:`https://storage.googleapis.com/mediapipe-tasks/object_detector/efficientdet_lite0_uint8.tflite`
      },
      scoreThreshold: 0.2,
      runningMode: "IMAGE"
    });
    console.log("Model Loaded");
    //Load image and detect after the model is loaded
    performDetection();
    myImagesDetector();
    
  } catch (error) {
    console.error("Error initializing object detector:", error);
  }
}
// detections[4].categories[0].categoryName

async function imageClassification() {
  //try catch block to handle errors
  try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      imageClassifier = await ImageClassifier.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/image_classifier/efficientnet_lite0/float32/1/efficientnet_lite0.tflite`
        },
         scoreThreshold: 0.1,
      runningMode: "IMAGE"
      });
        console.log("Classification Model Loaded");
        performClassification();
        myImagesClassification();
      
  } catch (error) {
    console.error("Error initializing classification:", error);
  }
}

function performDetection(){
  const imageContainer = document.getElementById("image");
  const imageElement = imageContainer.querySelector("img");
  const detections = objectDetector.detect(imageElement);
  console.log("Detections:", detections);
}

function performClassification(){
  const imageContainer = document.getElementById("image");
  const imageElement = imageContainer.querySelector("img");
  const classififcation = imageClassifier.classify(imageElement);
  console.log("classififcations:", classififcation);
}

function myImagesDetector(){
  const imageContainer = document.getElementById("imgs-container");
  const path = "./images"
  const imgs = ["full.jpg", "full_01.jpg"];
  // const imgs = ["06.png","07.png"];
  let counter = 0; 

  imgs.forEach((img)=>{
    const imgElement = document.createElement("img");
    imgElement.src = `${path}/${img}`;
    
    imgElement.onload = () => {
      const detections = objectDetector.detect(imgElement);
      counter++; 
      imageContainer.append(imgElement);
      console.log(`Detections ${counter}: `,detections);
    };
    imgElement.onerror = () => {
      console.error(`Failed to load image: ${imgElement}`);
    };
  })

}

function myImagesClassification(){
  const path = "./images"
  const imgs = ["full.jpg", "full_01.jpg"];
  let counter = 0; 
  imgs.forEach((img)=> {
    const imgElement = document.createElement("img");
    imgElement.src = `${path}/${img}`;
    
    imgElement.onload = () => {
      const classifications = imageClassifier.classify(imgElement);
      counter++; 
      // imageContainer.append(imgElement);
      console.log(`classififcations ${counter}: `,classifications);
    };
    imgElement.onerror = () => {
      console.error(`Failed to load image: ${imgElement}`);
    };  
  })

  
}

initializeObjectDetector();
imageClassification();
// https://metmuseum.github.io/