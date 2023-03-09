// --------------------- //
// data /
const crewContainer = document.querySelector(".crew");
const dotContainer = document.querySelector(".dots");

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
const goToSlide = (id) => {
  switch (id) {
    case "1":
      crewContainer.style.transform = "translateX(0)";
      break;
    case "2":
      crewContainer.style.transform = "translateX(-25%)";
      break;
    case "3":
      crewContainer.style.transform = "translateX(-50%)";
      break;
    case "4":
      crewContainer.style.transform = "translateX(-75%)";
      break;
    default:
      break;
  }
};

const dotHandler = (e) => {
  if (e.target.tagName === "button".toUpperCase()) {
    const { id } = e.target.dataset;
    const dots = document.querySelectorAll(".dots__dot");
    dots.forEach((i) => {
      i.classList.remove("crew-active-btn");
    });
    if (e.target.classList.contains("dots__dot")) {
      goToSlide(id);
    }
    if (!e.target.classList.contains("crew-active-btn")) {
      e.target.classList.add("crew-active-btn");
    }
  }
};
dotContainer.addEventListener("click", dotHandler);

const init = function () {
  createDots();
  slider();
};

// --------------------- //

init();
