// Logic for embedding and controlling the application
import {
  init,
  AuthType,
  LiveboardEmbed
} from "https://unpkg.com/@thoughtspot/visual-embed-sdk/dist/tsembed.es.js";

// PROD liveboard: 30c73d7d-b735-4c27-a4fa-5a3f9f24698f
// DEV liveboard: dab294fa-9717-480e-9cf7-b4e80e17813c

const tsURL = "https://ecolab-dev.thoughtspot.cloud";
const lbID = "dab294fa-9717-480e-9cf7-b4e80e17813c";

// Initializes the application with ThoughtSpot
const loadApp = () => {
  try {
    console.log("Initializing ThoughtSpot SDK...");
    init({
      thoughtSpotHost: tsURL,
      authType: AuthType.EmbeddedSSO,
    });
    console.log("SDK initialized successfully with EmbeddedSSO.");
  } catch (error) {
    console.error("Error during SDK initialization:", error);
    return;
  }

  // Call the embedding function immediately after initialization
  embedLiveboard();
};

// Function to embed a specific Liveboard
const embedLiveboard = () => {
  try {
    const embedContainer = document.getElementById("embed");
    if (!embedContainer) {
      console.error("Embed container not found! Check your HTML element ID.");
      return;
    }
    console.log("Embed container found. Proceeding with Liveboard embedding...");

    const liveboardEmbed = new LiveboardEmbed(embedContainer, {
      frameParams: { width: '100%', height: '800px', style: 'border:none;' },
      liveboardId: lbID,
    });

    liveboardEmbed.render()
      .then(() => {
        console.log(`Liveboard (${lbID}) embedded successfully.`);
      })
      .catch(err => {
        console.error("Error rendering Liveboard:", err);
      });
  } catch (error) {
    console.error("Unexpected error during Liveboard embedding:", error);
  }
};

// Start the application
window.onload = () => {
  console.log("Window loaded. Starting ThoughtSpot embed process...");
  loadApp();
}