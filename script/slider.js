// --------------------- //
// data /
const crewContainer = document.querySelector(".crew");
const dotContainer = document.querySelector(".dots");
let counter = 0;

const getData = async function () {
  try {
    const res = await fetch("../script/dev-data/data.json");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

// --------------------- //

// slider
let autoSlideInterval = false;
const startAutoSlide = () => {
  autoSlideInterval = setInterval(autoSlide, 5000);
};

const stopAutoSlie = () => {
  clearInterval(autoSlideInterval);
  autoSlideInterval = false;
};
const slider = async function () {
  const data = await getData();
  const { crew } = data;

  crew
    .slice()
    .reverse()
    .forEach((member) => {
      const html = `
        <div class='crew__item'>
            <div class="crew__img">
                <img src="../${member.images.png}" alt="${member.role}">
            </div>
            <div class='member-info'>
            <h3>${member.role}</h3>
            <h1>${member.name}</h1>
            <p>${member.bio}</p>
            </div>
        </div>
    `;
      crewContainer.insertAdjacentHTML("afterbegin", html);
    });
};
const createDots = async () => {
  const data = await getData();
  const { crew } = data;

  crew.forEach((_, i) => {
    const html = `<button class="dots__dot" data-id='${i + 1}'></button>`;
    dotContainer.insertAdjacentHTML("beforeend", html);
  });
  const dots = document.querySelectorAll(".dots__dot");
  dots.forEach((i) => {
    const { id } = i.dataset;
    id === "1" ? i.classList.add("crew-active-btn") : "";
  });
};

const autoSlide = () => {
  const dots = document.querySelectorAll(".dots__dot");
  crewContainer.style.transform = `translateX(-${(counter * 100) / 4}%)`;
  counter++;
  if (counter > 4) {
    counter = 0;
    crewContainer.style.transform = `translateX(0)`;
  }

  dots.forEach((dot) => {
    const { id } = dot.dataset;
    dot.classList.remove("crew-active-btn");
    if (counter === +id) {
      dot.classList.add("crew-active-btn");
    }
  });
};

const addActiveClass = (e) => {
  const dots = document.querySelectorAll(".dots__dot");
  dots.forEach((i) => {
    i.classList.remove("crew-active-btn");
  });
  if (!e.target.classList.contains("crew-active-btn")) {
    e.target.classList.add("crew-active-btn");
    clearInterval(autoSlideInterval);
  }
};

startAutoSlide();

const dotHandler = (e) => {
  if (e.target.tagName === "button".toUpperCase()) addActiveClass(e);
  stopAutoSlie();
  const { id } = e.target.dataset;
  if (+id === 1) crewContainer.style.transform = `translateX(0%)`;
  else
    crewContainer.style.transform = `translateX(-${
      (Number(id - 1) * 100) / 4
    }%)`;
  setTimeout(() => {
    stopAutoSlie();
    crewContainer.style.transform = `translateX(-${
      (Number(id - 1) * 100) / 4
    }%)`;
    startAutoSlide();
  }, 5000);
};

dotContainer.addEventListener("click", dotHandler);

const init = function () {
  slider();
  createDots();
  autoSlide();
};

// --------------------- //

init();
