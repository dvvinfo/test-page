const openBtnModal = document.querySelector(".top-block-btn");
const closeBtnModal = document.querySelector(".modal-btn");
const overlay = document.querySelector(".overlay");

openBtnModal.addEventListener("click", () => {
  overlay.classList.add("show");
});

closeBtnModal.addEventListener("click", () => {
  overlay.classList.remove("show");
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".modal") && !e.target.closest(".top-block-btn")) {
    overlay.classList.remove("show");
  }
});
