const tabsContainer = document.querySelector(".tabs");
const tabs = document.querySelectorAll(".tabs__item");

const getData = async function () {
  try {
    const res = await fetch("../script/dev-data/data.json");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
const desctopWidth = 1439;
const initTechno = 0;
const init = async () => {
  const { technology: technologys } = await getData();
  const techno = technologys.find((_, i) => i === initTechno);
  tabs[0].classList.add("tab-active");
  renderTechnology(techno);
};

function renderTechnology(techno) {
  clearContent();
  const imgHtml = `<div class="technology__img">
                        <img src=".${
                          document.documentElement.scrollWidth <= desctopWidth
                            ? techno.images.landscape
                            : techno.images.portrait
                        }" alt="${techno.name}" />
                   </div>`;
  const descHtml = `<div class="technology__desc">
                        <h3>The terminology...</h3>
                        <h1>${techno.name}</h1>
                        <p>
                        ${techno.description}
                        </p>
                      </div>`;
  tabsContainer.insertAdjacentHTML("beforebegin", imgHtml);
  tabsContainer.insertAdjacentHTML("afterend", descHtml);
}

const clearContent = () => {
  const watchHtml = {
    img: document.querySelector(".technology__img"),
    desc: document.querySelector(".technology__desc"),
  };
  for (const [_, value] of Object.entries(watchHtml)) {
    if (value) value.remove();
  }
};

async function tabHandler(e) {
  const { technology: technologys } = await getData();
  const tab = e.target;
  const { id } = e.target.dataset;
  const techno = technologys.find((_, i) => i === +id);
  tabs.forEach((tab) => tab.classList.remove("tab-active"));
  tab.classList.add("tab-active");
  renderTechnology(techno);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", tabHandler);
});
init();
