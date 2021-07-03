const sectionOne = document.querySelector(".hero");

const fillers = document.querySelectorAll(".fill-up");
const sliders = document.querySelectorAll(".slide-in");

const sectionOneOptions = {
  rootMargin: "-200px 0px 0px 0px"
};

// Change header to blue and black
const sectionOneObserver = new IntersectionObserver(function(
  entries,
  sectionOneObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      header.classList.add("blueColor");
    } else {
      header.classList.remove("blueColor");
    }
  });
},
sectionOneOptions);

sectionOneObserver.observe(sectionOne);

const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -150px 0px"
};

// Slide in
const appearOnScroll = new IntersectionObserver(function(
  entries,
  appearOnScroll
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

sliders.forEach(slider => {
  appearOnScroll.observe(slider);
});

const fillOptions = {
  threshold: 0,
  rootMargin: "0px 0px -30px 0px"
};

// Fill bars
const fillOnScroll = new IntersectionObserver(function(
  entries,
  fillOnScroll
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      i = entry.target.classList[1].charAt(3);
      entry.target.classList.add("bar_" + (i));
      fillOnScroll.unobserve(entry.target);
    }
  });
},
fillOptions);


fillers.forEach(filler => {
  fillOnScroll.observe(filler);
});
