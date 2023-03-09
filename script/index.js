const mobileMenuBtnOpen = document.querySelector(".menu__btn-open");
const mobileMenuBtnClose = document.querySelector(".mobile-menu__btn-close");
const mobileMenu = document.querySelector(".mobile-menu");

const tabletWidth = 768;

// Hendlers
const mobileMenuOpen = function () {
  mobileMenu.classList.toggle("active");
};
const mobileMenuClose = function () {
  mobileMenu.classList.remove("active");
};
// Events
mobileMenuBtnOpen.addEventListener("click", mobileMenuOpen);
mobileMenuBtnClose.addEventListener("click", mobileMenuClose);

window.addEventListener("resize", () => {
  if (document.documentElement.scrollWidth >= tabletWidth) {
    if (mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active");
    }
  }
});
