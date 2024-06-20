document.addEventListener('mouseup', async (event) => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      const translatedText = await translateText(selectedText);
      showTranslationPopup(event.pageX, event.pageY, translatedText);
    }
  });
  
  async function translateText(text) {
    const response = await fetch('https://translation.googleapis.com/language/translate/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_GOOGLE_CLOUD_API_KEY`
      },
      body: JSON.stringify({
        q: text,
        target: 'en'
      })
    });
    const data = await response.json();
    return data.data.translations[0].translatedText;
  }
  
  function showTranslationPopup(x, y, text) {
    const popup = document.createElement('div');
    popup.style.position = 'absolute';
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    popup.style.backgroundColor = 'white';
    popup.style.border = '1px solid black';
    popup.style.padding = '10px';
    popup.style.zIndex = 1000;
    popup.textContent = text;
  
    document.body.appendChild(popup);
  
    setTimeout(() => {
      popup.remove();
    }, 5000);
  }
  