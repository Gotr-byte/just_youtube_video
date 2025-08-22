// Rule ID. This can be any unique integer.
const redirectRuleId = 1;

// Define the rule once on extension installation.
chrome.runtime.onInstalled.addListener(() => {
  const redirectRule = {
    id: redirectRuleId,
    priority: 1, // Priority of the rule (1 is the highest)
    condition: {
      urlFilter: "www.youtube.com/watch?*", // Match YouTube watch URLs
      resourceTypes: ["main_frame"] // Only apply to the main page frame, not images, scripts, etc.
    },
    action: {
      type: "redirect",
      redirect: {
        transform: {
          host: "www.youtube.com",
          path: "/embed/{{videoId}}", // We will use regexSubstitution to get the videoId
          query: "", // Remove the entire query string (like &feature=share, etc.)
          fragment: ""
        }
      }
    }
  };

  // Add the rule to the browser's rule set.
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [redirectRule],
    removeRuleIds: [redirectRuleId] // Remove any old rule with the same ID
  });
});