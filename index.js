const next = document.getElementById("next");
const prev = document.getElementById("prev");
const time = document.getElementById("time");
const nodes = document.getElementById("set-node");
let progress = document.getElementById("progress");
let circles = document.querySelectorAll(".circle");

nodes.addEventListener("click", setNodes);
next.addEventListener("click", moveNext);
prev.addEventListener("click", movePrev);
time.addEventListener("click", moveTime);

let currentActive = 1;
let interval = 0;
let inputFlag = false;
let resetFlag = false;

function setNodes() {
  let input = document.getElementById("num-node").value.trim();
  if (inputFlag) {
    reset();
    inputFlag = false;
  }
  if (input === "") {
    alert("You did not enter any number, so the default is 4 nodes!");
  } else {
    if (input >= 2 && input <= 7) {
      removeNodes();
      const section = document.querySelector(".progress-container");
      for (let i = 1; i < input; i++) {
        let article = document.createElement("article");
        article.classList.add("circle");
        article.innerHTML = `${i + 1}`;
        section.appendChild(article);
      }
      inputFlag = true;
    } else if (input < 2) {
      alert("The number is to small! ");
    } else {
      alert("The number is to big! ");
    }
  }
  circles = document.querySelectorAll(".circle");
  input = document.getElementById("num-node").value = "";
}

function removeNodes() {
  circles.forEach((circle, index) => {
    if (index >= 1) {
      circle.remove();
    }
  });
}

function moveNext() {
  currentActive++;

  if (currentActive > circles.length) {
    currentActive = circles.length;
  }
  update();
  console.log(currentActive);
}

function movePrev() {
  currentActive--;
  time.innerHTML = "Time";
  time.style.backgroundColor = "rgb(8, 192, 146)";
  resetFlag = false;
  clearInterval(interval);
  if (currentActive < 1) {
    currentActive = 1;
  }
  update();
}

function moveTime() {
  if (!resetFlag) {
    interval = setInterval(() => {
      currentActive++;
      if (currentActive > circles.length) {
        currentActive = circles.length;
      }

      update();
    }, 1000);
  } else {
    clearInterval(interval);
    reset();
    styleProgress();
    resetFlag = false;
  }
}

function reset() {
  time.disabled = false;
  next.disabled = false;
  prev.disabled = true;
  time.innerHTML = "Time";
  time.style.backgroundColor = "rgb(8, 192, 146)";
  currentActive = 1;
  circles.forEach((circle, index) => {
    if (index >= 1) {
      circle.classList.remove("active");
    }
  });
}

function update() {
  circles.forEach((circle, index) => {
    if (index < currentActive) {
      console.log(circle);
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });
  styleProgress();

  if (currentActive === 1) {
    prev.disabled = true;
  } else if (currentActive === circles.length) {
    next.disabled = true;

    clearInterval(interval);
    resetFlag = true;
    time.innerHTML = "Reset";
    time.style.backgroundColor = "red";
  } else {
    prev.disabled = false;
    next.disabled = false;
    time.disabled = false;
  }
}

function styleProgress() {
  const actives = document.querySelectorAll(".active");
  progress.style.width =
    ((actives.length - 1) / (circles.length - 1)) * 100 + "%";
}
