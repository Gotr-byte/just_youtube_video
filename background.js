const redirectRuleId = 1;

chrome.runtime.onInstalled.addListener(() => {

  const rule = {
    id: redirectRuleId,
    priority: 1,
    condition: {
      // USE REGEXFILTER INSTEAD OF URLFILTER
      regexFilter: "^https://www\\.youtube\\.com/watch\\?v=([^&]+)",
      resourceTypes: ['main_frame']
    },
    action: {
      type: 'redirect',
      redirect: {
        // Use the first captured group from the regexFilter (the video ID)
        regexSubstitution: 'https://www.youtube.com/embed/\\1'
      }
    }
  };

  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [rule],
    removeRuleIds: [redirectRuleId]
  });