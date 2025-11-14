// Logic for embedding and controlling the application
import {
  init,
  AuthType,
  LiveboardEmbed
} from "https://unpkg.com/@thoughtspot/visual-embed-sdk/dist/tsembed.es.js";

// Save these imports for TrustedAuthTokenCookieless
// import "./styles.css";
// import { getTokenService } from "./tokenService.js";
// import { debounceFunc } from "./utils.js";

// PROD liveboard: 30c73d7d-b735-4c27-a4fa-5a3f9f24698f
// DEV liveboard: dab294fa-9717-480e-9cf7-b4e80e17813c
// DEV DEV liveboard: 7ccbaa31-d17c-4f8d-9b9b-133a6298f134

const tsURL = "https://ecolab-dev.thoughtspot.cloud";
const lbID = "7ccbaa31-d17c-4f8d-9b9b-133a6298f134";

// Initializes the application with ThoughtSpot
const loadApp = () => {
  try {
    console.log("Initializing ThoughtSpot SDK...");
    init({
      thoughtSpotHost: tsURL,
      authType: AuthType.None,
      // getAuthToken: getTokenService,
      // disableTokenVerification: true,
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
      frameParams: { width: '100%', height: '100%', style: 'border:none;' },
      liveboardId: lbID,
      fullHeight: true,
      lazyLoadingForFullHeight: true,
      /* Show or hide the liveboard title and description */
      showLiveboardTitle: true,
      showLiveboardDescription: false,
      isLiveboardHeaderSticky: false, /* Removes the header stickiness when scrolling if set to false */
      // hideLiveboardHeader: false, /* Hides the entire liveboard header */

      /* Customize display of tabs in the liveboard header */
      // hideTabPanel: false, /* Removes the tab panel */
      // visibleTabs:['TabId'], /* Remove all tabs if empty array*/
      // hiddenTabs:['TabId'],
      /* Use either visibleTabs or hiddenTabs */
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