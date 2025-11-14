// Logic for embedding and controlling the application
import {
  init,
  AuthType,
  LiveboardEmbed,
  //EmbedEvent
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
const authType = AuthType.None
const ecoBlue = "#006bd3"

// Initializes the application with ThoughtSpot
const loadApp = () => {
  try {
    console.log("Initializing ThoughtSpot SDK...");
    init({
      thoughtSpotHost: tsURL,
      authType: authType,
      // getAuthToken: getTokenService,
      // disableTokenVerification: true,
      customizations: {
        style: {
          //customCSSUrl: "https://cdn.jsdelivr.net/gh/thoughtspot/custom-css-demo/css-variables.css", // location of your style sheet
          isLiveboardStylingAndGroupingEnabled: true,
          // To apply overrides for your style sheet in this init, provide variable values below, eg
          customCSS: {
            variables: {
              "--ts-var-root-background": '#ffffffff',
              "--ts-var-button--secondary-color": '#ffffffff',
              "--ts-var-button--secondary-background": ecoBlue,
              "--ts-var-button--secondary--hover-background": "#0069d3be",
              "--ts-var-viz-background": "#c2d9f4",
              "--ts-var-viz-border-radius": "20px",
            },
          },
        },
      },
    });
    console.log(`SDK initialized successfully with authType:(${authType}).`);
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

    const liveboardEmbed = new LiveboardEmbed(embedContainer, {
      frameParams: { width: '100%', height: '100%', style: 'border:none;' },
      liveboardId: lbID,
      fullHeight: false,
      //lazyLoadingForFullHeight: true,
      showLiveboardTitle: false,
      showLiveboardDescription: false,
      isLiveboardHeaderSticky: true,
      isLiveboardCompactHeaderEnabled: true,
      hideIrrelevantChipsInLiveboardTabs: true,
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