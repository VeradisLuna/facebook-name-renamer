// Load stored values and display them in the form
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['oldName', 'oldShortName', 'newName'], (data) => {
        document.getElementById('oldName').value = data.oldName || '';
        document.getElementById('oldShortName').value = data.oldShortName || '';
        document.getElementById('newName').value = data.newName || '';
    });
});

// Save values when the form is submitted
document.getElementById('settings-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const oldName = document.getElementById('oldName').value;
    const oldShortName = document.getElementById('oldShortName').value;
    const newName = document.getElementById('newName').value;

    chrome.storage.sync.set({ oldName, oldShortName, newName }, () => {
        document.getElementById('status').textContent = 'Settings saved!';
        setTimeout(() => (document.getElementById('status').textContent = ''), 2000);
    });
});