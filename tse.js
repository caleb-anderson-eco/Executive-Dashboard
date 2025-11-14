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

// A simple debounce function to limit how often the scaling is recalculated on resize
const debounceFunc = (func, delay = 200) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

// PROD liveboard: 30c73d7d-b735-4c27-a4fa-5a3f9f24698f
// DEV liveboard: dab294fa-9717-480e-9cf7-b4e80e17813c
// DEV DEV liveboard: 7ccbaa31-d17c-4f8d-9b9b-133a6298f134

const tsURL = "https://ecolab-dev.thoughtspot.cloud";
const lbID = "7ccbaa31-d17c-4f8d-9b9b-133a6298f134";
const authType = AuthType.None

// Initializes the application with ThoughtSpot
const loadApp = () => {
  try {
    console.log("Initializing ThoughtSpot SDK...");
    init({
      thoughtSpotHost: tsURL,
      authType: authType,
      // getAuthToken: getTokenService,
      // disableTokenVerification: true,
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


    // Define the base resolution your Liveboard was designed for.
    // This is the width where the scale is 1.0 (100%).
    const ORIGINAL_DESIGN_WIDTH = 1000;

    // Set a large, generous "canvas" height for the iFrame's internal document.
    // This is necessary because fullHeight: true relies on the iFrame size.
    // Adjust this value if your Liveboard content is much taller/shorter.
    const ORIGINAL_CANVAS_HEIGHT = 1500;

    const applyScaling = () => {
      const currentWidth = embedContainer.offsetWidth;

      // Calculate the scale factor based on the container size vs. the design size
      const scaleFactor = currentWidth / ORIGINAL_DESIGN_WIDTH;

      // Use Math.min to prevent the content from scaling *up* past 100% 
      // if the container is wider than the original design width.
      const finalScale = Math.min(1.0, scaleFactor);

      const iframeElement = liveboardEmbed.getUnderlyingFrameElement();

      if (iframeElement) {
        // 1. Set the iFrame's internal canvas size to the *original* design size
        //    before the scale transform is applied.
        iframeElement.style.width = `${ORIGINAL_DESIGN_WIDTH}px`;
        iframeElement.style.height = `${ORIGINAL_CANVAS_HEIGHT}px`;

        // 2. Apply the proportional scaling (zoom)
        iframeElement.style.transform = `scale(${finalScale})`;
        iframeElement.style.transformOrigin = '0 0'; // Crucial: scale from top-left

        // 3. Adjust the CONTAINER element's height to prevent extra scroll space
        //    *outside* the iFrame.
        embedContainer.style.height = `${ORIGINAL_CANVAS_HEIGHT * finalScale}px`;
      }
    };

    // Apply scaling initially on load
    applyScaling();

    // Re-apply scaling on window resize using a debounced function for performance
    window.addEventListener('resize', debounceFunc(applyScaling, 200));

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