// Debounce function to limit API calls
function debounce(func, delay) {
  let timeoutId;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

// Keep track of processed responses
const processedResponses = new Set();

// Function to check if the response is fully rendered
function isResponseFullyRendered(responseElement) {
  if (!responseElement) return false;

  const isStreaming = responseElement.querySelector(".result-streaming");
  const hasFullText = responseElement.innerText.trim().length > 0;

  return hasFullText && !isStreaming;
}

// Function to get the most recent response
function getMostRecentResponse() {
  const responseElements = document.querySelectorAll(".markdown");
  if (responseElements.length === 0) return null;

  // Get the last response element
  const lastResponse = responseElements[responseElements.length - 1];

  // Verify it's a complete response
  return isResponseFullyRendered(lastResponse) ? lastResponse : null;
}

// Function to calculate border color based on verification percentage
function calculateBorderColor(verifiedPercentage) {
  const red = Math.round(255 * (1 - verifiedPercentage / 100));
  const green = Math.round(255 * (verifiedPercentage / 100));
  return `rgb(${red}, ${green}, 0)`;
}

// Function to apply border to the response
function applyResponseBorder(responseElement, borderColor) {
  if (!responseElement) return;

  responseElement.style.border = `3px solid ${borderColor}`;
  responseElement.style.borderRadius = "8px";
}

// Main function to process the response
const processResponse = debounce(function () {
  // Get the most recent response
  const responseElement = getMostRecentResponse();
  if (!responseElement) return;

  // Generate a unique identifier for the response
  const responseId = responseElement.textContent.substring(0, 100);

  // Check if this response has already been processed
  if (processedResponses.has(responseId)) {
    console.log("Response already processed");
    return;
  }

  // Extract full response text
  const responseText = responseElement.innerText;

  // Extract all links from anchor tags
  const anchorElements = responseElement.querySelectorAll("a");
  const links = Array.from(anchorElements).map((a) => a.href);

  // Ensure we have text to send
  if (!responseText.trim()) {
    console.log("No text to process");
    return;
  }

  // Send to API with both text and links
  fetch("http://127.0.0.1:5000/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: responseText, links: links }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Defensive initialization with default values
      let verifiedCount = 0;
      let totalCount = 0;
      let verifiedPercentage = 0;

      // Safely process the data
      if (Array.isArray(data)) {
        totalCount = data.length;
        verifiedCount = data.filter((item) => item.type === "Verified").length;
        verifiedPercentage =
          totalCount > 0 ? (verifiedCount / totalCount) * 100 : 0;
      }

      // Calculate and apply border color
      const borderColor = calculateBorderColor(verifiedPercentage);
      applyResponseBorder(responseElement, borderColor);

      // Mark this response as processed
      processedResponses.add(responseId);

      // Send verification data to background script
      chrome.runtime.sendMessage({
        type: "VERIFICATION_DATA",
        data: {
          total: totalCount,
          verified: verifiedCount,
          percentage: verifiedPercentage,
          details: data || [], // Ensure data is always an array
          links: links, // Include the extracted links in the message if needed
        },
      });

      console.log("Verification Results:", {
        total: totalCount,
        verified: verifiedCount,
        percentage: verifiedPercentage,
        links: links,
      });
    })
    .catch((error) => {
      console.error("Error processing response:", error);

      // Send error information to background script
      chrome.runtime.sendMessage({
        type: "VERIFICATION_DATA",
        data: {
          total: 0,
          verified: 0,
          percentage: 0,
          details: [],
          error: error.toString(),
        },
      });
    });
}, 2000);

// Mutation observer to detect new responses
function setupResponseObserver() {
  const observer = new MutationObserver((mutations) => {
    // Flag to check if a new response is detected
    let newResponseDetected = false;

    for (const mutation of mutations) {
      if (mutation.addedNodes.length) {
        const responseElements = document.querySelectorAll(".markdown");
        if (responseElements.length > 0) {
          newResponseDetected = true;
          break;
        }
      }
    }

    // If a new response is detected, trigger processing
    if (newResponseDetected) {
      processResponse();
    }
  });

  // Try to find the chat container
  const chatContainer = document.querySelector("#__next") || document.body;

  if (chatContainer) {
    console.log("Setting up mutation observer");
    observer.observe(chatContainer, {
      childList: true,
      subtree: true,
    });
  } else {
    console.error("Could not find chat container");
  }
}

// Initial setup
function initExtension() {
  console.log("ChatGPT Verification Extension initialized");
  setupResponseObserver();
}

// Run the extension
initExtension();
