const next = document.getElementById("next");
const prev = document.getElementById("prev");

let progress = document.getElementById("progress");
let circles = document.querySelectorAll(".circle");
let infos = document.querySelectorAll(".info");

next.addEventListener("click", moveNext);
prev.addEventListener("click", movePrev);

let currentActive = 1;
let currentNotHidden = 0;

function removeNodes() {
  circles.forEach((circle, index) => {
    if (index >= 1) {
      circle.remove();
    }
  });
}

function moveNext() {
  currentActive++;
  currentNotHidden++;

  if (currentActive > circles.length) {
    currentActive = circles.length;
  }
  if (currentNotHidden > infos.length) {
    currentNotHidden = infos.length;
  }

  let tmp = currentNotHidden;
  console.log(tmp);
  infos[currentNotHidden].classList.remove("hidden");
  infos[--tmp].classList.add("hidden");

  update();
}

function movePrev() {
  currentActive--;
  currentNotHidden--;

  if (currentActive < 1) {
    currentActive = 1;
  }
  if (currentNotHidden < 0) {
    currentNotHidden = 0;
  }

  let tmp = currentNotHidden;
  console.log(tmp);
  infos[currentNotHidden].classList.remove("hidden");
  infos[++tmp].classList.add("hidden");

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
  // infos.forEach((info, index) => {
  //   if (index === currentNotHidden) {
  //     info.classList.add("hidden");
  //     console.log(index, "ddd ", currentNotHidden);
  //   } else if (index < currentNotHidden) {
  //     info.classList.remove("hidden");
  //   }
  // });

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
