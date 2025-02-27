"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};



for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);


document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const btnScroll = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScroll.addEventListener("click", function () {



  section1.scrollIntoView({ behavior: "smooth" });
});


document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e.target);
  
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabContainer.addEventListener("click", function (e) {
  e.preventDefault();
  
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);
  if (!clicked) return;

  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");
  tabsContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  );

  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});


const nav = document.querySelector(".nav__links");


function hover(e, opacity) {
  console.log(this);
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
   
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    

    const logo = link.closest("nav").querySelector(".nav__logo");

    siblings.forEach((el) => {
      if (el != link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
}

nav.addEventListener("mouseover", hover.bind(0.5));

nav.addEventListener("mouseout", hover.bind(1));

//появление меню после прокрутки
const navContainer = document.querySelector(".nav");
const coord = section1.getBoundingClientRect();


function callBack(entrise, observer) {
 
  if (!entrise[0].isIntersecting) {
   
    navContainer.classList.add("sticky");
  } else {
    
    navContainer.classList.remove("sticky");
  }
}


const options = {
 
  root: null,
  
  treshold: 0,
  
  rootMargin: "-90px",
};

const observer = new IntersectionObserver(callBack, options);

observer.observe(document.querySelector(".header"));

const allSections = document.querySelectorAll("section");


function revealSection(entries, observe) {

  if (entries[0].isIntersecting) {
    entries[0].target.classList.remove("section--hidden");
    observe.unobserve(entries[0].target);
  }
}

const sectionsObserver = new IntersectionObserver(revealSection, {
  threshold: 0.15,
});


allSections.forEach(function (section) {
  sectionsObserver.observe(section);

  section.classList.add("section--hidden");
});


const images = document.querySelectorAll("img[data-src]");
console.log(images);

function loadImg(entries, observer) {
  
  if (!entries[0].isIntersecting) return;
  console.log(entries);
 
  entries[0].target.src = entries[0].target.dataset.src;

  entries[0].target.addEventListener("load", function () {
    entries[0].target.classList.remove("lazy-img");
  });
  observer.unobserve(entries[0].target);
}


const imgObserver = new IntersectionObserver(loadImg, { treshold: 0.15 });

images.forEach((img) => {
  imgObserver.observe(img);
});

const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");
const dotsContainer = document.querySelector(".dots");

let currSlide = 0;
const maxSlides = slides.length;

function createDots() {
  slides.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
}

createDots();

function goToSlide(slide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
}

function activateDots(slide) {
  document.querySelectorAll(".dots__dot").forEach(function (dot) {
    dot.classList.remove("dots__dot--active");
    document
      .querySelector(`.dots__dot[data-slide= "${slide}"]`)
      .classList.add("dots__dot--active");
  });
}
activateDots(0);
goToSlide(0);

function nextSlide() {
  if (currSlide === maxSlides - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  goToSlide(currSlide);
  activateDots(currSlide);
}

function prevSlide() {
  if (currSlide === 0) {
    currSlide = maxSlides - 1;
  } else {
    currSlide--;
  }

  goToSlide(currSlide);
  activateDots(currSlide);
}

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);


document.addEventListener("keydown", function (e) {
  console.log(e);
 
  if (e.key === "ArrowLeft") {
    prevSlide();
  }
  if (e.key === "ArrowRight") {
    nextSlide();
  }
});

dotsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    console.log("dot");
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDots(slide);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  console.log("Страница загрузилась");
});
