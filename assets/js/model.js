const target = document.querySelector("ol");

const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    const model = document.querySelectorAll(".pokemon");
    model.forEach((element) =>
      element.addEventListener("click", () => {
        const modal = element.children[3];
        if (modal.hasAttribute("hidden") == true) {
          modal.removeAttribute("hidden");
        } else {
          modal.setAttribute("hidden", true);
        }
      })
    );
  });
});

const config = {
  childList: true,
  subtree: true,
  attributes: true,
  characterData: true,
};

observer.observe(document.body, { childList: true, subtree: true });
