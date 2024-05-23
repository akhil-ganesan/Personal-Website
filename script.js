document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const output = document.getElementById('output');

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const command = input.value.trim();
            handleCommand(command);
            input.value = '';
        }
    });

    function handleCommand(command) {
        let response = '';
        switch(command.toLowerCase()) {
            case 'help':
                response = 'Available commands: help, about, contact';
                break;
            case 'about':
                response = 'This is a personal website styled like a command prompt. Created by [Your Name].';
                break;
            case 'contact':
                response = 'You can contact me at: email@example.com';
                break;
            case 'projects':
                response = 'You can contact me at: email@example.com';
                break;
            case 'blog':
                response = 'You can contact me at: email@example.com';
                break;
            default:
                response = `'${command}' is not recognized as an internal or external command.`;
        }
        output.innerHTML += `<p>C:\\> ${command}</p><p>${response}</p>`;
        output.scrollTop = output.scrollHeight;
    }
});