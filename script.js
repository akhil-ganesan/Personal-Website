// script.js

document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('input');
    const outputDiv = document.getElementById('output');
    const history = [];
    let historyIndex = -1;

    inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const inputValue = inputField.value;
            if (inputValue.trim() !== '') {
                history.push(inputValue);
                historyIndex = history.length;
                appendOutput(inputValue);
                inputField.value = '';
            }
        } else if (event.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                inputField.value = history[historyIndex];
            }
        } else if (event.key === 'ArrowDown') {
            if (historyIndex < history.length - 1) {
                historyIndex++;
                inputField.value = history[historyIndex];
            } else {
                historyIndex = history.length;
                inputField.value = '';
            }
        }
    });

    function appendOutput(text) {
        const newLine = document.createElement('div');
        newLine.textContent = `> ${text}`;
        outputDiv.appendChild(newLine);
        requestAnimationFrame(scrollToBottom);
    }

    function scrollToBottom() {
        outputDiv.scrollTop = outputDiv.scrollHeight;
    }
});
