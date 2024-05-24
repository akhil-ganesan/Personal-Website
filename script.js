document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    //const cmd = document.getElementById('cmd');
    const notepad = document.getElementById('notepad');
    const notepadContent = document.getElementById('notepad-content');
    const notepadTitle = document.querySelector('.notepad-title');
    const closeBtn = document.getElementById('close-btn');

    // Simulated lists
    const availablePosts = ['Spring24SemReview.md'];

    const projects = [
        {
            name: "Project1",
            description: "This is the first project description.",
            file: "projects/OSA-DS.pdf"
        },
        {
            name: "Project2",
            description: "This is the second project description.",
            file: "projects/MLEconometrics.pdf"
        },
        {
            name: "Project3",
            description: "This is the third project description.",
            file: "projects/Heart-Disease-Analysis.pdf"
        }
    ];

    let history = [];
    let historyIndex = -1;

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const command = input.value.trim();
            if (command) {
                history.push(command);
                historyIndex = history.length;
                handleCommand(command);
                input.value = '';
            }
        } else if (event.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                input.value = history[historyIndex];
            }
            event.preventDefault();
        } else if (event.key === 'ArrowDown') {
            if (historyIndex < history.length - 1) {
                historyIndex++;
                input.value = history[historyIndex];
            } else {
                historyIndex = history.length;
                input.value = '';
            }
            event.preventDefault();
        }
    });

    closeBtn.addEventListener('click', () => {
        notepad.style.display = 'none';
        notepadContent.innerHTML = '';
        notepadTitle.textContent = 'Notepad - [Untitled]';
    });

    function handleCommand(command) {
        requestAnimationFrame(() => {
            output.scrollTop = output.scrollHeight;
        }, 0);
        let response = '';
        const commandParts = command.split(' ');

        switch(commandParts[0].toLowerCase()) {
            case 'projects':
                if (commandParts[1] === 'list') {
                    response = 'Available Projects:\n';
                    projects.forEach(project => {
                        response += `- ${project.name}<br>`;});
                } else if (commandParts[1]) {
                    const projectName = commandParts[1];
                    const project = projects.find(p => p.name.toLowerCase() === projectName.toLowerCase());
                    if (project) {
                        response += `${project.description}<br>`;
                        response += `<a href="${project.file}" target="_blank">${project.file}</a><br>`;
                    } else {
                        response += `Project not found: ${projectName}<br>`;
                    }
                } else {
                    response = 'Usage: projects list or projects (project ID)';
                }
                break;
            case 'help':
                response = 'Available commands: help, about, contact, blog';
                break;
            case 'about':
                response = 'This is a personal website styled like a command prompt. Created by [Your Name].';
                break;
            case 'contact':
                response = 'You can contact me at: email@example.com';
                break;
            case 'blog':
                if (commandParts[1] === 'list') {
                    response = 'Available blog posts:\n';
                    availablePosts.forEach(post => {response += '- ' +  post + '\n'});
                } else if (commandParts[1]) {
                    loadBlogPost(commandParts[1]);
                } else {
                    response = 'Usage: blog list or blog (post file)';
                }
                break;
            default:
                response = `'${command}' is not recognized as an internal or external command.`;
        }
        output.innerHTML += `<p>C:\\> ${command}</p><p>${response.replace(/\n/g, '<br>')}</p>`;
        //output.scrollTop = output.scrollHeight;
        requestAnimationFrame(() => {
            output.scrollTop = output.scrollHeight;
        }, 0);
        //cmd.scrollTop - cmd.scrollHeight; 
    }

    function loadBlogPost(postName) {
        fetch(`posts/${postName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.text();
            })
            .then(data => {
                notepad.style.display = 'block';
                notepadContent.textContent = data;
                notepadTitle.textContent = `Notepad - [${postName}]`;
            })
            .catch(error => {
                output.innerHTML += `<p>Error loading blog post: ${error.message}</p>`;
                output.scrollTop = output.scrollHeight;
            });
    }
});