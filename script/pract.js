// const checkIsMessage = (str) => {
//   const cmdArray = str.split(" ");
//   // console.log(cmdArray);
//   // console.log(cmdArray.indexOf("-m"));
//   let newArray = cmdArray
//     .slice(0, 2)
//     .concat(cmdArray.slice(cmdArray.indexOf("-m"), cmdArray.indexOf("-m") + 1));
//   // console.log(newArray.join(" ").toLowerCase());
//   return newArray.join(" ").toLowerCase() === "sendmessage -n -m";
// };

// const command =
//   "sendMessage -n Samir Nepal qhqhuqf -m hello how are yowejhf jehfygwegfew fygwegfyuwefu";

// if (checkIsMessage(command)) {
//   console.log("Hello there");
//   const arr = command.split(" ");
//   console.log(
//     arr
//       .slice(2, arr.indexOf("-m"))
//       .concat(arr.slice(arr.indexOf("-m") + 1))
//       .join(" ")
//   );
// }

const levDistance = (word1, word2) => {
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
};

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

// const equalityNum = (word1, word2) => {
//   if (word1.length >= word2.length) {
//     for (let char of str) {
//     console.log(char);
// }
//   }
// };

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

const distances = commands.map((el) => {
  return (
    1 /
    (1 +
      Math.exp(
        -(levDistance("cert", el) - countMatchingIndices("cert", el) * 2)
      ))
  );
});

console.log(commands);
console.log(distances);
