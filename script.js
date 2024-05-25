// script.js

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const notepad = document.getElementById('notepad');
    const notepadContent = document.getElementById('notepad-content');
    const notepadTitle = document.querySelector('.notepad-title');
    const closeBtn = document.getElementById('close-btn');

     // Simulated lists
     const availablePosts = ['Spring24SemReview.md', 'Fall23SemReview.md', 'BME_Pathways.md', 'GT_BME_Degree_Analyzed.md', 'GT_CS_Threads_Analyzed.md', 'GT_Thread_System_Analyzed.md'];

     const projects = [
        {
            name: "Regression Analysis for Heart Disease Prediction",
            description: "This project involved developing an 88% accurate heart disease-diagnosis pipeline by implementing statistical tests (ANOVA, chi squared, principal component analysis, & linear/logistic regression) to tune an AI model using scikit-learn with clinical dataset",
            link: "Heart-Disease-Analysis.pdf"
         },
         {
            name: "Obstructive Sleep Apnea in Down Syndrome Patients",
            description: "This semester-long group project analyzed medical bias in Downs Syndrome Apnea patients using a quantitative physiological respiratory model.",
            link: "OSA-DS.pdf"
         },
         {
             name: "Georgia Tech Biomedical Engineering Degree Visualizer",
             description: "This web app was developed to help academic advisors assist the over 1000 biomedical engineering students at Georgia Tech plan their class schedules based on course prerequisites to fulfill their degree requirements. It originally used a Flask framework (with HTML, CSS, & JavaScript) for the front-end and on the back-end uses Python (which models the prerequisite chain as a graph to determine course recommendations). However, it has since been converted to a static site without the python back-end.",
             link: "https://akhil-ganesan.github.io/BMED-Degree-Visualizer/"
         },
         {
             name: "Corrupted Data Recovery with AI",
             description: "This study explores generalized augmented datasets which have defects analogous to genetic mutations (specifically, frameshift & substitution mutations) by attempting to use neural networks to predict whether frameshift mutations have occurred (which it could with around 95% accuracy) and prior to the frameshift, the probability of substitution mutations occuring (which it could with around 80% accuracy). The decrease in frameshift detection/information extraction accuracy per the decrease in data volume was also analyzed empirically.",
             file: "AIMutatedData.pdf"
         },
         {
            name: "Learning Loss in a Post-COVID World",
            description: "This project provided an in-depth analysis of the emerging impacts of the COVID-19 Pandemic on education in both a national & regional (state of Virginia) context. This analysis utilized the ArcGIS tools suite as well as a simple feed-forward neural network written in python. The results include specific demographic factors that may have an impact on the level of learning loss (although, the analysis found there was little direct correlation with each variable individually). It also includes a summary of the impact of learning loss and what steps can be taken to remedy it on the state level. This project earned an Honorable Mention for James Madison University’s annual spring Geospatial Analysis competition.",
            link: "https://arcg.is/1HC5qy0"
         },
         {
             name: "Evaluating ML for Econometrics",
             description: "In this paper we present the results of a quantitative finance experiment testing a variety of machine learning architectures (statistical analysis, support vector regression, & a neural network) in their ability to predict economic trends. The economic trends explored were a technical analysis of stock prices in the market (in particular, the Microsoft (MSFT), Apple (AAPL), & Netflix (NFLX) share prices over a 5 year period). This project won 1st Place at the Fairfax Regional Science & Engineering Fair (Intelligent Machines Category) and Qualified for the Virginia State Science & Engineering Fair.",
             file: "MLEconometrics.pdf"
         },
         {
            name: "Intro to Biomedical Engineering Final Project: Design Report",
            description: "This report details a semester-long group project analyzing and redesigning a disposable medical device: specifically, the clear wound dressing. The report includes research comrpising the device’s characteristics/life cycle, stakeholders invovled in it’s use, and current design shortcomings. The report also includes products from ideation & prototyping of possible solutions to the group’s defined problem of interest.",
            link: "Final Sprint Report Submission.pdf"
         },
         {
            name: "Statics Final Project: Structural Analysis",
            description: "This project report details a semester-long group project analyzing the structural stability of the Kendeda Building at the Georgia Institute of Technology. Specifically, the stilt architecture was quantitatively analyzed using statics concepts (i.e, frames, distributed masses, etc.).",
            link: "Statics_Structural_Analysis.pdf"
         },
     ];
    
    
    const history = [];
    let historyIndex = -1;

    init();

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {          
            const command = input.value.trim();
            if (command) {
                history.push(command);
                historyIndex = history.length;
                appendOutput(command);
                handleCommand(command);
                input.value = '';
            }
        } else if (event.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                input.value = history[historyIndex];
            }
        } else if (event.key === 'ArrowDown') {
            if (historyIndex < history.length - 1) {
                historyIndex++;
                input.value = history[historyIndex];
            } else {
                historyIndex = history.length;
                input.value = '';
            }
        }
    });

    function appendOutput(text) {
        const newLine = document.createElement('div');
        newLine.textContent = `> ${text}`;
        output.appendChild(newLine);
        requestAnimationFrame(scrollToBottom);
    }

    function init() {
        let newLine = document.createElement('div');
        newLine.textContent = `Welcome to Akhil Ganesan's personal website!`;
        output.appendChild(newLine);
        newLine = document.createElement('div');
        newLine.textContent = `Type 'help' to see the available commands.`;
        output.appendChild(newLine);
        requestAnimationFrame(scrollToBottom);
        output.innerHTML += `<br>`
    }
    function scrollToBottom() {
        output.scrollTop = output.scrollHeight;
    }

    closeBtn.addEventListener('click', () => {
        notepad.style.display = 'none';
        notepadContent.innerHTML = '';
        notepadTitle.textContent = 'Notepad - [Untitled] - READ ONLY';
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
                        response += `- ${project.name} (ID: ${projects.indexOf(project)}) <br>`;});
                } else if (commandParts[1]) {
                    const projectID = commandParts[1];
                    const project = projects[projectID];
                    if (project) {
                        response += `${project.description}<br>`;
                        if (project.file) {
                            response += `<a href="${project.file}" target="_blank">${project.file}</a><br>`;
                        }
                        if (project.link) {
                            response += `<a href="${project.link}" target="_blank">${project.link}</a><br>`;
                        }
                    } else {
                        response += `Project ID ${projectID} not found <br>`;
                    }
                } else {
                    response = 'Usage: projects list or projects [project ID]';
                }
                break;
            case 'help':
                response = 'Available commands: help, about, contact, blog, projects, clear';
                break;
            case 'about':
                response = 'Hi!\n\nMy name is Akhil Ganesan. I’m an aspiring biomedical engineer (with an interest in computer science and advanced technologies) hoping to specialize in fields such as cellular/tissue/genetic engineering, neuroengineering, immunoengineering, & computational biology. Currently, my relevant experiences have independently involved engineering/technology (see my past projects (run the command "projects list") and my <a href="https://github.com/akhil-ganesan" target="_blank">GitHub</a>) or biosciences; however, entering the Georgia Institute of Technology to study Biomedical Engineering with a minor in Computer Science and Artificial Intelligence marks the beginning of my journey in advancing the technological revolution of medicine for the greater good.\n\nIf you’d like to connect or would like a copy of my resume, I can be reached by email (akhilganesan526@gmail.com) or via <a href="https://www.linkedin.com/in/akhil-ganesan" target="_blank">LinkedIn</a>.';
                break;
            case 'contact':
                response = 'If you’d like to connect or would like a copy of my resume, I can be reached by email (akhilganesan526@gmail.com) or via <a href="https://www.linkedin.com/in/akhil-ganesan" target="_blank">LinkedIn</a>.';
                break;
            case 'blog':
                if (commandParts[1] === 'list') {
                    response = 'Available blog posts:\n';
                    availablePosts.forEach(post => {response += '- ' +  post + ' (ID: ' + availablePosts.indexOf(post) + ')\n'});
                } else if (commandParts[1]) {
                    if (commandParts[1] >= availablePosts.length) {
                        response = 'Blog Post ID Out of Range';
                    } else {
                        loadBlogPost(availablePosts[commandParts[1]]);
                    }
                } else {
                    response = 'Usage: blog list or blog [post ID]';
                }
                break;
            case 'clear':
                output.innerHTML = '';
                init();
                break;
            default:
                response = `'${command}' is not recognized as an internal or external command.`;
        }
        // output.innerHTML += `<p>C:\\> ${command}</p><p>${response.replace(/\n/g, '<br>')}</p>`;
        output.innerHTML += `<p>${response.replace(/\n/g, '<br>')}</p>`;
        output.scrollTop = output.scrollHeight;
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
                notepadTitle.textContent = `Notepad - [${postName}] - READ ONLY`;
                notepadContent.scrollTo(0, 0);

            })
            .catch(error => {
                output.innerHTML += `<p>Error loading blog post: ${error.message}</p>`;
                output.scrollTop = output.scrollHeight;
            });
    }
});
