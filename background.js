// Listen for when a tab is updated (e.g., when a URL is loaded)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if the page has fully loaded and the URL is a YouTube watch page
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('www.youtube.com/watch')) {
    try {
      const url = new URL(tab.url);
      const videoId = url.searchParams.get('v');
      
      // If we found a video ID, redirect the tab to the embed URL
      if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        chrome.tabs.update(tabId, { url: embedUrl });
      }
    } catch (error) {
      console.error("Error redirecting YouTube tab:", error);
    }
  }
});