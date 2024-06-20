document.addEventListener('DOMContentLoaded', () => {
    const targetLanguageSelect = document.getElementById('targetLanguage');
  
    // Load the saved target language from storage
    chrome.storage.sync.get(['targetLanguage'], (result) => {
      if (result.targetLanguage) {
        targetLanguageSelect.value = result.targetLanguage;
      }
    });
  
    // Save the selected target language to storage
    targetLanguageSelect.addEventListener('change', () => {
      chrome.storage.sync.set({ targetLanguage: targetLanguageSelect.value });
    });
  });
  