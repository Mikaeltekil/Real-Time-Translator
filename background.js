chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });
  fetch('http://localhost:8502/config')
    .then(response => response.json())
    .then(config => {
        console.log('Configuration loaded:', config);
        // Use the configuration as needed
        // e.g., save it to Chrome storage
        chrome.storage.sync.set({ apiKey: config.api_key, targetLanguage: config.target_language });
    })
    .catch(error => console.error('Error fetching configuration:', error));
