
  // Seu alvo é o elemento que você deseja observar
const target = document.querySelector('ol');

// Crie uma instância do MutationObserver
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    // O código a seguir será executado quando ocorrer uma mudança no DOM
    const model = document.querySelectorAll(".pokemon");
    model.forEach(element => element.addEventListener("click", () => {
      const modal = element.children[3]
      console.log(modal.hasAttribute('hidden'))
      if(modal.hasAttribute('hidden') == true){
        modal.removeAttribute('hidden')
      } else {
        modal.setAttribute('hidden',true);
      }
    }));
  });
});

// Configure as opções do MutationObserver (veja as opções na documentação)
const config = { childList: true, subtree: true, attributes: true, characterData: true };

// Comece a observar o alvo com as opções especificadas
observer.observe(document.body, { childList: true, subtree: true });
/* model.addEventListener("click", () => {
  bool == false ? model.style.display = "block": model.style.display = "none"
  bool = !bool
}) */
