chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    const url = new URL(details.url);
    const videoId = url.searchParams.get("v");

    if (videoId && url.pathname === "/watch") {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return { redirectUrl: embedUrl };
    }

    return {};
  },
  { urls: ["*://www.youtube.com/watch*"] },
  ["blocking"]
);