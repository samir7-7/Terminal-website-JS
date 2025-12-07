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
  `sendmessage -n -m`,
];

function levDistance(word1, word2) {
  const rows = word2.length + 1;
  const cols = word1.length + 1;
  const map = Array.from({ length: rows }, () => Array(cols).fill(0));
  for (let r = 0; r < rows; r++) map[r][0] = r;

  for (let c = 0; c < cols; c++) map[0][c] = c;

  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      if (word1[c - 1] === word2[r - 1]) {
        map[r][c] = map[r - 1][c - 1];
      } else {
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

  return map[rows - 1][cols - 1];
}

function countMatchingIndices(str1, str2) {
  const minLength = Math.min(str1.length, str2.length);
  let count = 0;

  for (let i = 0; i < minLength; i++) {
    if (str1[i] === str2[i]) {
      count++;
    } else {
      count--;
    }
  }

  return count;
}

const nearestWord = (command, arr) => {
  const distances = arr.map((el) => {
    return (
      1 /
      (1 +
        Math.exp(
          -(levDistance(command, el) - countMatchingIndices(command, el) * 2)
        ))
    );
  });
  return arr[distances.indexOf(Math.min(...distances))];
};

const checkIsMessage = (str) => {
  const cmdArray = str.split(" ");

  let newArray = cmdArray
    .slice(0, 2)
    .concat(cmdArray.slice(cmdArray.indexOf("-m"), cmdArray.indexOf("-m") + 1));
  return newArray.join(" ").toLowerCase() === "sendmessage -n -m";
};

// // this will filter the valid command and send them for further execution
// also it will remove the previous input field and add anotherone
const checkCommand = (command) => {
  const ninput = document.getElementById("command");
  if (command.length < 1) {
    screen.innerHTML += `$ ${ninput.value}<br>`;
    screen.innerHTML += `<span class="text-red-500">Please enter a command<span><br>`;
    addInput();
    khebe.classList.add("hidden");
  } else if (checkIsMessage(command)) {
    screen.innerHTML += `<span class="text-yellow-500"><span>$ </span>${ninput.value}</span>`;
    khebe.classList.add("hidden");
    handleMessage(command);
    addInput();
  } else if (commands.includes(command)) {
    // console.log("Command Exists!");
    screen.innerHTML += `<span class="text-yellow-500"><span>$ </span>${ninput.value}</span>`;
    khebe.classList.add("hidden");
    executeCommand(command);
    addInput();
  } else {
    screen.innerHTML += `$ ${ninput.value}<br>`;

    screen.innerHTML += `${
      ninput.value
    } is not recognized as a command. Did you mean "${nearestWord(
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
  screen.innerHTML += `${info["name"]}<br>`;
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

async function handleMessage(command) {
  // const ninput = document.getElementById("command");
  // const command = ninput.value;
  // const nameAndMessage = command.split(" ");
  // console.log(nameAndMessage.slice(2, 3).concat(nameAndMessage.slice(4)));
  const arr = command.split(" ");
  const newAArr = [
    arr.slice(2, arr.indexOf("-m")).join(" "),
    arr.slice(arr.indexOf("-m") + 1).join(" "),
  ];
  console.log(newAArr);

  fetch(
    "https://script.google.com/macros/s/AKfycbwCCZSv60C0inKOrUqBzWRFTAPWFS0uGyk2B2VVZPr_PbBm6BG7VrU6I2IQT8n2yKpHkw/exec",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newAArr[0],
        message: newAArr[1],
      }),
    }
  )
    .then((response) => response.text())
    .then((result) => console.log("✅ Google Sheets says:", result))
    .catch((error) => console.error("❌ Error sending to sheet:", error));

  screen.innerHTML += `<span class="text-green-500">Message sent successfully!!</span>`;
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

document.getElementById("toggle-button").addEventListener("click", () => {
  document.body.classList.toggle("invert");
});
