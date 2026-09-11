(() => {
  const root = document.documentElement;
  const buttons = document.querySelectorAll("[data-lang]");

  const setLang = (lang) => {
    root.lang = lang;
    localStorage.setItem("js-lang", lang);
    buttons.forEach((b) => b.classList.toggle("on", b.dataset.lang === lang));
    document.querySelectorAll("[data-pt]").forEach((el) => {
      const next = el.getAttribute("data-" + lang);
      if (next !== null) el.innerHTML = next;
    });
    document.querySelectorAll(".stat[data-count]").forEach((el) => {
      const suffix = el.getAttribute("data-suffix-" + lang) || el.dataset.suffix || "";
      el.dataset.suffix = suffix;
      const label = el.querySelector("b");
      if (label) label.textContent = (el.dataset.prefix || "") + el.dataset.count + suffix;
    });
  };

  buttons.forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));
  setLang(localStorage.getItem("js-lang") || "pt");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal, .job, .chip, .stat, .card").forEach((el) => io.observe(el));

  document.querySelectorAll(".stat[data-count]").forEach((el) => {
    const target = Number(el.dataset.count);
    const label = el.querySelector("b");
    if (!label || !target) return;
    const run = () => {
      const start = performance.now();
      const dur = 1100;
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = Math.round(target * eased);
        label.textContent = (el.dataset.prefix || "") + val + (el.dataset.suffix || "");
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const obs = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        run();
        obs.disconnect();
      }
    });
    obs.observe(el);
  });
})();
