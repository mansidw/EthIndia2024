document.addEventListener("DOMContentLoaded", () => {
  // Request verification data from background script
  chrome.runtime.sendMessage({ type: "GET_VERIFICATION_DATA" }, (response) => {
    const verificationSummary = document.getElementById("verification-summary");
    const noDataElement = document.getElementById("no-data");
    const sourceList = document.getElementById("source-list");

    // Reset display
    sourceList.innerHTML = "";
    verificationSummary.classList.remove("hidden");
    noDataElement.classList.add("hidden");

    if (response && response.data) {
      if (response.data.error) {
        // Handle error scenario
        noDataElement.textContent = `Error: ${response.data.error}`;
        noDataElement.classList.remove("hidden");
        verificationSummary.classList.add("hidden");
      } else {
        displayVerificationData(response.data);
      }
    } else {
      noDataElement.classList.remove("hidden");
      verificationSummary.classList.add("hidden");
    }
  });

  function displayVerificationData(verificationData) {
    // Safely handle data with default values
    const totalSources = verificationData.total || 0;
    const verifiedCount = verificationData.verified || 0;
    const verifiedPercentage = verificationData.percentage || 0;

    // Update total sources and percentage
    document.getElementById("total-sources").textContent = totalSources;
    document.getElementById(
      "verified-percentage"
    ).textContent = `${verifiedPercentage.toFixed(2)}%`;

    // Update progress bar
    const progressBar = document.getElementById("verification-progress");
    progressBar.style.width = `${verifiedPercentage}%`;

    // Populate source list
    const sourceList = document.getElementById("source-list");

    if (verificationData.details && verificationData.details.length > 0) {
      verificationData.details.forEach((source) => {
        const sourceElement = document.createElement("div");

        // Determine type-specific classes
        let typeClasses = "source-type-Unknown";
        if (source.type === "Verified") typeClasses = "source-type-Verified";
        if (source.type === "Partially Verified")
          typeClasses = "source-type-Partially-Verified";

        sourceElement.classList.add(
          "p-3",
          "rounded-lg",
          "transition",
          "transform",
          "hover:scale-105",
          typeClasses
        );

        sourceElement.innerHTML = `
          <div class="flex justify-between items-center">
            <div>
              <h4 class="font-semibold text-sm text-gray-200">${source.type}</h4>
              <p class="text-xs text-gray-400 mt-1 truncate max-w-[250px]">${source.content}</p>
            </div>
            <a href="${source.url}" target="_blank" class="text-blue-400 hover:text-blue-300 transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>
          </div>
        `;

        sourceList.appendChild(sourceElement);
      });
    } else {
      sourceList.innerHTML = `
        <div class="text-center text-gray-500 p-4">
          No sources found
        </div>
      `;
    }
  }
});
