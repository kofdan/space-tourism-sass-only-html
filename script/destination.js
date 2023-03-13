const planetWrapper = document.querySelector(".planet .planet__wrapper");
const planetList = document.querySelector(".planet__list");
const planetHr = document.querySelector(".planet__hr");
const planetLinks = document.querySelectorAll(".planet__link");
const initPlanet = 0;
const getData = async function () {
  try {
    const res = await fetch("../script/dev-data/data.json");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
    console.log(error);
  }
};

async function firstPlanetRender() {
  const { destinations } = await getData();
  const firstPlanet = destinations.find(
    (planet, index) => index === initPlanet
  );
  planetLinks[0].classList.add("link-active");
  renderPlanet(firstPlanet);
}

function renderPlanet(planet) {
  const htmlImg = `<img
class="planet__img"
src=".${planet.images.png}"
alt="moon"
/>`;
  const hmtlDesc = `<h1 class="planet__title">${planet.name}</h1>
  <p class="planet__description">${planet.description}</p>
  `;
  const htmlInfo = ` <div class="planet__info">
<div class="planet__distance">
  <h3>Avg. distance</h3>
  <p>${planet.distance}</p>
</div>
<div class="planet__travel-time">
  <h3>Est. travel time</h3>
  <p>${planet.travel}</p>
</div>
</div> `;

  planetWrapper.insertAdjacentHTML("beforebegin", htmlImg);

  planetList.insertAdjacentHTML("afterend", "");
  planetList.insertAdjacentHTML("afterend", hmtlDesc);
  planetHr.insertAdjacentHTML("afterend", "");
  planetHr.insertAdjacentHTML("afterend", htmlInfo);
}

async function tabHandler(e) {
  e.preventDefault();
  planetLinks.forEach((link) => link.classList.remove("link-active"));
  e.target.classList.add("link-active");
  const { destinations } = await getData();
  const { id } = e.target.dataset;
  const planet = destinations.find((_, index) => index === +id);

  const tagsWatch = {
    img: document.querySelector(".planet__img"),
    title: document.querySelector(".planet__title"),
    desc: document.querySelector(".planet__description"),
    info: document.querySelector(".planet__info"),
  };

  for (const [_, value] of Object.entries(tagsWatch)) {
    if (value) value.remove();
  }
  renderPlanet(planet);
}

planetLinks.forEach((link) => {
  link.addEventListener("click", tabHandler);
});
firstPlanetRender();
