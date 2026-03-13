const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".topnav a");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -30px 0px",
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 18, 220)}ms`;
  revealObserver.observe(item);
});

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const sectionId = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${sectionId}`);
      });
    });
  },
  {
    threshold: 0.2,
    rootMargin: "-20% 0px -65% 0px",
  }
);

sections.forEach((section) => {
  navObserver.observe(section);
});
