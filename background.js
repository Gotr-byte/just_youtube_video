const redirectRuleId = 1;

chrome.runtime.onInstalled.addListener(() => {
  // Rule to redirect www.youtube.com/watch?v=xxxx to www.youtube.com/embed/xxxx
  const rule = {
    id: redirectRuleId,
    priority: 1,
    condition: {
      urlFilter: '||youtube.com/watch*', // Matches any YouTube watch URL on any subdomain
      resourceTypes: ['main_frame']
    },
    action: {
      type: 'redirect',
      redirect: {
        regexSubstitution: 'https://www.youtube.com/embed/\\1' // \\1 is the first capture group
      }
    }
  };

  // Use a regex filter to capture the video ID
  rule.condition.regexFilter = 'https://www\\.youtube\\.com/watch\\?v=([^&]+)';

  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [rule],
    removeRuleIds: [redirectRuleId]
  });
});