const backendUrl = 'https://qlinks-dev.fl0.io/';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'fetchUrl') {
        fetch(backendUrl + 'createUrl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: request.url })
        })
            .then(response => response.json())
            .then(data => {
                sendResponse({url: backendUrl + data.key});
            })
            .catch(err => console.error('Error: ', err));
        return true;  // Keeps the message channel open until sendResponse is called
    }
});
