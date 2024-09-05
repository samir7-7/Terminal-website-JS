const screen = document.querySelector(".inputbox");
const input = document.getElementById("command");
const inputFields = document.querySelectorAll(".inputbox .commandDiv");
const container = document.querySelector(".whole");
const khebe = document.querySelector(".gif")
const red = document.querySelector(".red");


const commands = ['bio', 'help', 'name', 'github', 'socials', 'clear', 'certificates','hireme','sendemail'];


// // this will filter the valid command and send them for further execution
// also it will remove the previous input field and add anotherone
const checkCommand = (command) => {
    const ninput = document.getElementById("command");
    if (command.length < 1) {
        screen.innerHTML += `$ ${ninput.value}<br>`;
        screen.innerHTML += `Please enter a command<br>`;
        addInput();
        khebe.classList.add('hidden')
    }

    else if (commands.includes(command)) {
        console.log("Command Exists!");
        screen.innerHTML += `<span class="text-yellow-500"><span>$ </span>${ninput.value}</span>`;
        khebe.classList.add('hidden')
        executeCommand(command);
        addInput()
    }

    else {
        screen.innerHTML += `$ ${ninput.value}<br>`;
        screen.innerHTML += `${ninput.value} is not recognized as a command please try "help".<br>`;
        addInput();
        khebe.classList.add('hidden')
    }
}


// this will execute the functions for the respective commands
const executeCommand = (command) => {
    if (command === 'help') {
        handleHelp();
    }

    else if (command === 'bio') {
        handleBio();
    }
    else if (command === 'name') {
        handleName();
    }

    else if (command === 'github') {
        handleGithub();
    }

    else if (command === 'socials') {
        handleSocials();
    }

    else if (command === 'clear') {
        handleClear(command);
    }

    else if(command === 'certificates'){
        handleCertificates()
    }

    else if(command === 'hireme'){
        handleHire();
    }

    else if(command === 'sendemail'){
        handleEmail();
    }

    else {
        handleGetcv();
    }
}


// this will clear the terminal
const handleClear = (command) => {
    screen.innerHTML = '';
    addInput();
}

// this function will show the commands that are valid on this terminal
const handleHelp = () => {
    let arrayofCommands = info["help"];
    arrayofCommands.forEach((command) => {
        screen.innerHTML += `${command}<br>`
    })
}

// this will display my name
const handleName = () => {
    screen.innerHTML += `the ${info['name']}<br>`
}

// this will show my details 
const handleBio = () => {
    const mybio = info["bio"];
    mybio.forEach((val) => {

        const key = Object.keys(val)[0];
        const value = val[key];

        screen.innerHTML += `${key}: ${value}<br>`;
    })

}

// this will show link to my github
const handleGithub = () => {
    const khebe = document.querySelector(".gif")
    khebe.classList.remove('hidden')
    console.log(info['github'])
    screen.innerHTML += `<span>github: <a href="${info['github']}" target="_blank" class="text-[#0BC2FF] underline">${info['github']}</a></span>`
}

// this will display my social media links
const handleSocials = ()=>{
    const socials = info["socials"];
    socials.forEach((val) => {
        const key = Object.keys(val)[0];
        const value = val[key];

        screen.innerHTML += `<span>${key}: <a href="${value}" target="_blank" class="text-[#0BC2FF] underline">${value}</a></span>`;
    })
}

// this will show my certificates
const handleCertificates = ()=>{
    const certificates = info["certificates"];
    certificates.forEach((val) => {
        const key = Object.keys(val)[0];
        const value = val[key];
        
        screen.innerHTML += `<span>${key}: <a href="${value}" target="_blank" class="text-[#0BC2FF] underline">View certificate</a></span>`
    })
}

const handleHire = ()=>{
    screen.innerHTML += `<span>Fiverr: <a href="${info['hire']}" target="_blank" class="text-[#0BC2FF] underline">hire</a>`
}

const handleEmail = ()=>{
    window.location.assign('https://mail.google.com/mail/u/1/#inbox?compose=CllgCJvqKBjnhhbNgHbszPPRXsLfmWdzJPCPltlzJBvFQXxKNDjpDfNTzMxvNrjJsFSbcBwNKfg')
}

// this function will add new input in the terminal
const addInput = () => {
    const currentInputFields = document.querySelectorAll(".inputbox .commandDiv");

    // Remove each .commandDiv from .inputbox
    currentInputFields.forEach((val) => {
        screen.removeChild(val);
    });

    // Add the new input field
    screen.innerHTML += `<div class="flex commandDiv gap-2">$ <input autoFocus type="text" id="command"/></div>`;
    // Set focus on the new input
    document.querySelector("input").focus();
}



// this will listen for every enter that is clicked
document.addEventListener('keydown', (e) => {
    const ninput = document.getElementById("command");
    if (e.key === 'Enter') {
        checkCommand((ninput.value).toLowerCase());
    }
})

document.addEventListener("click",()=>{
    document.querySelector("input").focus();
})

// input.addEventListener("keydown", (e) => {
//     if (e.key === 'Enter') {
//         if (input.value === "clear") {
//             console.log("done")
//             screen.innerHTML = '';
//         }
//     }
// })
