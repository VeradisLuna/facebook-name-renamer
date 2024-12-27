// Function to replace text content in the DOM
function replaceName(originalName, newName) {
    const regex = new RegExp(originalName, 'g'); // Case-sensitive
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    
    let node;
    while ((node = walker.nextNode())) {
        if (node.nodeValue.includes(originalName)) {
            node.nodeValue = node.nodeValue.replace(regex, newName);
        }
    }
}

// Listen for dynamically loaded content (useful for infinite scroll)
const observer = new MutationObserver(() =>
{
    chrome.storage.sync.get(['oldName', 'oldShortName', 'newName'], (data) => {
        if (data.oldName && data.oldShortName && data.newName) {
            replaceName(data.oldName, data.newName);
            replaceName("What's on your mind, " + data.oldShortName + "", "What's on your mind");
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });

chrome.storage.sync.get(['oldName', 'oldShortName', 'newName'], (data) => {
    if(data.oldName && data.oldShortName && data.newName) {
        replaceName(data.oldName, data.newName);
        replaceName("What's on your mind, " + data.oldShortName + "", "What's on your mind");
    }
});