// Logic for embedding and controlling the application.
import {
  init,
  Action,
  AppEmbed,
  AuthType,
  ConversationEmbed,
  LiveboardEmbed,
  Page,
  SearchEmbed,
} from "https://unpkg.com/@thoughtspot/visual-embed-sdk/dist/tsembed.es.js";

// Set the tsURL to point to your ThoughtSpot instance, and the lbID to reference your liveboard
const tsURL = "https://ecolab-dev.thoughtspot.cloud";
const lbID = "dab294fa-9717-480e-9cf7-b4e80e17813c";

console.log("tse.js test" + lbID);

// Initializes the application with ThoughtSpot.
const loadApp = () => {
  init({
    thoughtSpotHost: tsURL,
    authType: AuthType.None,
  });

  // Call the embedding function immediately after initialization.
  embedLiveboard();
}

// Function to embed a specific Liveboard.
const embedLiveboard = () => {
  const liveboardEmbed = new LiveboardEmbed(
    document.getElementById("embed"), // The HTML element ID where the Liveboard will appear.
    {
      frameParams: {}, // Optional parameters for the iframe - adjust later.
      liveboardId: lbID,
    }
  );

  liveboardEmbed.render();
  console.log("Liveboard embedded successfully.");
}

// Save the following code in case you need it later.
// document.getElementById('element-id').addEventListener('click', eventHandler);

// Start the application.
window.onload = loadApp;
