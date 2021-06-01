const next = document.getElementById("next");
const prev = document.getElementById("prev");

let progress = document.getElementById("progress");
let circles = document.querySelectorAll(".circle");

next.addEventListener("click", moveNext);
prev.addEventListener("click", movePrev);

let currentActive = 1;

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
}

function movePrev() {
  currentActive--;

  if (currentActive < 1) {
    currentActive = 1;
  }
  update();
}

function reset() {
  next.disabled = false;
  prev.disabled = true;

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
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });

  styleLine();

  if (currentActive === 1) {
    prev.disabled = true;
  } else if (currentActive === circles.length) {
    next.disabled = true;
  } else {
    prev.disabled = false;
    next.disabled = false;
  }
}

function styleLine() {
  const active = document.querySelectorAll(".active");
  active.forEach(() => {
    let line = ((active.length - 1) / (circles.length - 1)) * 100 + "%";
    progress.style.width = line;
  });
}
