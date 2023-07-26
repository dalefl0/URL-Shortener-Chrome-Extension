let shortenedUrl;

window.onload = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.runtime.sendMessage(
            {message: 'fetchUrl', url: tabs[0].url},
            function(response) {
                shortenedUrl = response.url;
                document.getElementById('copyBtn').disabled = false;
            }
        );
    });
};

document.getElementById('copyBtn').addEventListener('click', function() {
    navigator.clipboard.writeText(shortenedUrl).then(function() {
        console.log('Copying to clipboard was successful!');
        const btn = document.getElementById('copyBtn');
        btn.innerText = 'Success!';
        btn.style.backgroundColor = '#52c41a';

        // Close the popup after 2 seconds
        setTimeout(window.close, 2000);
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
});
