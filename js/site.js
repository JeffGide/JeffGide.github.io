(() => {
  const root = document.documentElement;
  const buttons = document.querySelectorAll("[data-lang]");
  const nodes = document.querySelectorAll("[data-pt]");

  const setLang = (lang) => {
    root.lang = lang;
    localStorage.setItem("js-lang", lang);
    buttons.forEach((b) => b.classList.toggle("on", b.dataset.lang === lang));
    nodes.forEach((el) => {
      const next = el.getAttribute(`data-${lang}`);
      if (next !== null) el.innerHTML = next;
    });
  };

  buttons.forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));
  setLang(localStorage.getItem("js-lang") || "pt");
})();
