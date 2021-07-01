const sectionOne = document.querySelector(".hero");

const sectionOneOptions = {
  rootMargin: "-200px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function(
  entries,
  sectionOneObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      header.classList.add('blueColor');
    } else {
      header.classList.remove('blueColor');
    }
  });
},
sectionOneOptions);

sectionOneObserver.observe(sectionOne);