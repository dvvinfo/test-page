const openBtnModal = document.querySelector(".top-block-btn");
const closeBtnModal = document.querySelector(".modal-btn");
const overlay = document.querySelector(".overlay");
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");

const openModal = () => {
  overlay.classList.add("show");
};
const closeModal = () => {
  overlay.classList.remove("show");
};

const openMenu = () => {
  nav.classList.toggle("block");
  setTimeout(() => {
    nav.classList.toggle("show-menu");
  }, 300);
};

openBtnModal.addEventListener("click", openModal);
closeBtnModal.addEventListener("click", closeModal);
burger.addEventListener("click", openMenu);

document.addEventListener("click", (e) => {
  if (!e.target.closest(".modal") && !e.target.closest(".top-block-btn")) {
    overlay.classList.remove("show");
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav") && !e.target.closest(".burger")) {
    nav.classList.remove("show-menu");

    setTimeout(() => {
      nav.classList.remove("block");
    }, 300);
  }
});
