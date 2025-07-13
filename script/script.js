const screen = document.querySelector(".inputbox");
const input = document.getElementById("command");
const inputFields = document.querySelectorAll(".inputbox .commandDiv");
const container = document.querySelector(".whole");
const khebe = document.querySelector(".gif");
const red = document.querySelector(".red");
const uname = "";
const message = "";

const commands = [
  "bio",
  "help",
  "name",
  "github",
  "socials",
  "clear",
  "certificates",
  "hireme",
  "sendemail",
  // `sendmessage -n ${uname} -m ${message}`,
];

function levDistance(word1, word2) {
  const rows = word2.length + 1;
  const cols = word1.length + 1;
  const map = Array.from({ length: rows }, () => Array(cols).fill(0));

  // Fill the first column: how many steps to build up word2 from empty
  for (let r = 0; r < rows; r++) map[r][0] = r;

  // Fill the first row: how many steps to delete all of word1
  for (let c = 0; c < cols; c++) map[0][c] = c;

  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      if (word1[c - 1] === word2[r - 1]) {
        // Characters match — just move diagonally, no changes needed
        map[r][c] = map[r - 1][c - 1];
      } else {
        // Characters don't match — choose the best among:

        map[r][c] =
          1 +
          Math.min(
            map[r - 1][c - 1], // replace
            map[r - 1][c], // insert
            map[r][c - 1] // delete
          );
      }
    }
  }

  // Final answer is in the bottom-right cell
  return map[rows - 1][cols - 1];
}

const nearestWord = (command, arr) => {
  const distances = arr.map((el) => levDistance(command, el));
  return arr[distances.indexOf(Math.min(...distances))];
};

// // this will filter the valid command and send them for further execution
// also it will remove the previous input field and add anotherone
const checkCommand = (command) => {
  const ninput = document.getElementById("command");
  if (command.length < 1) {
    screen.innerHTML += `$ ${ninput.value}<br>`;
    screen.innerHTML += `Please enter a command<br>`;
    addInput();
    khebe.classList.add("hidden");
  } else if (commands.includes(command)) {
    console.log("Command Exists!");
    screen.innerHTML += `<span class="text-yellow-500"><span>$ </span>${ninput.value}</span>`;
    khebe.classList.add("hidden");
    executeCommand(command);
    addInput();
  } else {
    screen.innerHTML += `$ ${ninput.value}<br>`;

    screen.innerHTML += `${
      ninput.value
    } is not recognized as a command please try "help". Did you mean "${nearestWord(
      ninput.value.toLowerCase(),
      commands
    )}"<br>`;
    addInput();
    khebe.classList.add("hidden");
  }
};

// this will execute the functions for the respective commands
const executeCommand = (command) => {
  if (command === "help") {
    handleHelp();
  } else if (command === "bio") {
    handleBio();
  } else if (command === "name") {
    handleName();
  } else if (command === "github") {
    handleGithub();
  } else if (command === "socials") {
    handleSocials();
  } else if (command === "clear") {
    handleClear(command);
  } else if (command === "certificates") {
    handleCertificates();
  } else if (command === "hireme") {
    handleHire();
  } else if (command === "sendemail") {
    handleEmail();
  } else if (command === `sendmessage -n ${uname} -m ${message}`) {
    handleMessage();
  } else {
    handleGetcv();
  }
};

// this will clear the terminal
const handleClear = (command) => {
  screen.innerHTML = "";
  addInput();
};

// this function will show the commands that are valid on this terminal
const handleHelp = () => {
  let arrayofCommands = info["help"];
  arrayofCommands.forEach((command) => {
    screen.innerHTML += `${command}<br>`;
  });
};

// this will display my name
const handleName = () => {
  screen.innerHTML += `the ${info["name"]}<br>`;
};

// this will show my details
const handleBio = () => {
  const mybio = info["bio"];
  mybio.forEach((val) => {
    const key = Object.keys(val)[0];
    const value = val[key];

    screen.innerHTML += `${key}: ${value}<br>`;
  });
};

// this will show link to my github
const handleGithub = () => {
  const khebe = document.querySelector(".gif");
  khebe.classList.remove("hidden");
  console.log(info["github"]);
  screen.innerHTML += `<span>github: <a href="${info["github"]}" target="_blank" class="text-[#0BC2FF] underline">${info["github"]}</a></span>`;
};

// this will display my social media links
const handleSocials = () => {
  const socials = info["socials"];
  socials.forEach((val) => {
    const key = Object.keys(val)[0];
    const value = val[key];

    screen.innerHTML += `<span>${key}: <a href="${value}" target="_blank" class="text-[#0BC2FF] underline">${value}</a></span>`;
  });
};

// this will show my certificates
const handleCertificates = () => {
  const certificates = info["certificates"];
  certificates.forEach((val) => {
    const key = Object.keys(val)[0];
    const value = val[key];

    screen.innerHTML += `<span>${key}: <a href="${value}" target="_blank" class="text-[#0BC2FF] underline">View certificate</a></span>`;
  });
};

const handleHire = () => {
  screen.innerHTML += `<span>Fiverr: <a href="${info["hire"]}" target="_blank" class="text-[#0BC2FF] underline">hire</a>`;
};

const handleEmail = () => {
  window.location.assign(
    "https://mail.google.com/mail/u/1/#inbox?compose=CllgCJvqKBjnhhbNgHbszPPRXsLfmWdzJPCPltlzJBvFQXxKNDjpDfNTzMxvNrjJsFSbcBwNKfgz"
  );
};

async function handleMessage() {}

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
};

// this will listen for every enter that is clicked
document.addEventListener("keydown", (e) => {
  const ninput = document.getElementById("command");
  if (e.key === "Enter") {
    checkCommand(ninput.value.toLowerCase());
  }
});

document.addEventListener("click", () => {
  document.querySelector("input").focus();
});

// input.addEventListener("keydown", (e) => {
//     if (e.key === 'Enter') {
//         if (input.value === "clear") {
//             console.log("done")
//             screen.innerHTML = '';
//         }
//     }
// })
