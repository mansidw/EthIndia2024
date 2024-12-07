// Store the latest verification data
let latestVerificationData = null;

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "VERIFICATION_DATA") {
    // Store the verification data
    latestVerificationData = message.data;
  }
});

// Provide a method to get the latest verification data
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_VERIFICATION_DATA") {
    sendResponse({ data: latestVerificationData });
  }
});
