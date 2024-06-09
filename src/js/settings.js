async function getData() {
  let nickname = await window.electronAPI.getSettings("nickname");
  const nick = document.getElementById("nickname");
  nickname = " " + nickname;
  nick.innerHTML += nickname;

  let java_args = await window.electronAPI.getSettings("java_args");
  const input = document.getElementById("javaargs");
  input.value = java_args;

  let gamePath = await window.electronAPI.getSettings("game_path");
  const game_path = document.getElementById("gamePath");
  if (gamePath !== undefined) {
    gamePath = gamePath.toString().replace(/\\/g, "/");
    game_path.innerHTML += gamePath;
  } else game_path.innerHTML += "%appdata%";

  let javaPath = await window.electronAPI.getSettings("java_path");
  const java_path = document.getElementById("javaPath");
  if (javaPath !== undefined) {
    java_path.innerHTML += javaPath;
  } else if (gamePath !== undefined) {
    java_path.innerHTML += gamePath + ".dungeoncraft/java";
  } else java_path.innerHTML += "%appdata%/.dungeoncraft/java";
}

window.onload = function () {
  getData();
};

function auth() {
  window.electronAPI.auth();
}

document.getElementById("javaargs").onkeyup = function (e) {
  getValue();
  writeValue();
};

let javaargs = "";

function getValue() {
  javaargs = document.getElementById("javaargs");
}

function writeValue() {
  let settings = {
    java_args: javaargs.value,
  };
  console.log(settings);
  window.electronAPI.changeSettings(settings);
}

const gamePathBtn = document.getElementById("gamePathBtn");
const gamePath = document.getElementById("gamePath");

gamePathBtn.addEventListener("click", async () => {
  let folderPath = await window.electronAPI.openFolder();
  if (folderPath !== undefined) {
    folderPath = folderPath.toString().replace(/\\/g, "/");
    gamePath.innerText = folderPath;
    let path = {
      game_path: gamePath.innerText,
    };
    window.electronAPI.changeSettings(path);
  }
});

const javaPathBtn = document.getElementById("javaPathBtn");
const javaPath = document.getElementById("javaPath");

javaPathBtn.addEventListener("click", async () => {
  let folderPath = await window.electronAPI.openFolder();
  if (folderPath !== undefined) {
    folderPath = folderPath.toString().replace(/\\/g, "/");
    javaPath.innerText = folderPath;
    let path = {
      java_path: javaPath.innerText,
    };
    window.electronAPI.changeSettings(path);
  }
});
