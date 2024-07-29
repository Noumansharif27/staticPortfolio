let revealText = document.querySelectorAll(".reveal");
let nav = document.querySelector("#nav");
let cursor = document.querySelector("#cursor");
let hoverElements = document.querySelectorAll(".hover-element");

// hoverElements.forEach((el) => {
//   el.addEventListener("mouseenter", () => {
//     alert("hi");
//   });
// });

// window.addEventListener("mousemove", (details) => {
//   gsap.to("#cursor", {
//     x: details.clientX,
//     y: details.clientY,
//     duration: 0.3,
//     ease: Expo,
//   });
// });

function smoothScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

// smoothScroll();

function reveal() {
  revealText.forEach((el) => {
    // creating new spans
    let parentSpan = document.createElement("span");
    let childSpan = document.createElement("span");

    // initilizing respective classes
    parentSpan.classList.add("parentSpan");
    childSpan.classList.add("childSpan");

    childSpan.innerHTML = el.innerHTML;

    // adding them i.childSpann order
    el.innerHTML = "";
    parentSpan.appendChild(childSpan);
    el.appendChild(parentSpan);
  });
}

reveal();

function animatinOne() {
  let tl = gsap.timeline();

  tl.from("h1 .childSpan ", {
    delay: 1,
    x: "100%",
    stagger: 0.5,
    duration: 2,
    ease: "Expo.easeInOut",
  })
    .to(".childSpan", {
      y: "-100%",
      duration: 2,
      ease: "Expo.easeInOut",
    })
    .to(
      "#loader",
      {
        height: 0,
        duration: 1,
        ease: "Circ.easeInOut",
      },
      "a"
    )
    .to(
      "#green-div",
      {
        height: 0,
        duration: 1.1,
        ease: "Circ.easeInOut",
      },
      "a"
    )
    .to(nav, {
      opacity: 1,
      delay: -1.5,
    })
    .to(
      "#content-row-2 h2",
      {
        rotateX: 0,
        opacity: 1,
        duration: 1.5,
      },
      "content"
    )
    .to(
      "#content-row-1 h2",
      {
        rotateX: 0,
        opacity: 1,
        duration: 1.5,
      },
      "content"
    )
    .to(
      "#content-para-1",
      {
        top: "13%",
        duration: 2,
      },
      "content"
    )
    .to(
      "#content-para-2",
      {
        top: "13%",
        duration: 2,
      },
      "content"
    );
}

animatinOne();

function animationtwo() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#home",
      scrub: 2,
      start: "-150% 100%",
      end: "bottom 150%",
    },
  });

  gsap.set(".para p", {
    y: "100%",
  });

  gsap.to(".para p", {
    y: "0%",
    duration: 0.5,
    stagger: 0.3,
    scrollTrigger: {
      trigger: "#home",
      start: "-20% 100%",
      end: "bottom 150%",
    },
  });

  tl.to(
    "#cards .card-1",
    {
      rotate: "-20",
      right: "45%",
      duration: 100,
      ease: "Circ.easeInOut",
      delay: "-1",
    },
    "cardAnim"
  )
    .to(
      "#cards .card-2",
      {
        rotate: "-5",
        right: "35%",
        duration: 100,
        ease: "Power3.easeInOut",
        delay: "-1",
      },
      "cardAnim"
    )
    .to(
      "#cards .card-3",
      {
        rotate: "0",
        right: "25%",
        duration: 100,
        ease: "Power3.easeInOut",
        delay: "-1",
      },
      "cardAnim"
    );
}

// gsap;

animationtwo();

let initilizePath = `M 100 40 Q 500 40 1100 40`;
let finalPath = `M 100 40 Q 500 40 1100 40`;
function pageOneSVG() {
  let page1 = document.querySelector("#page-1");
  page1.addEventListener("mousemove", (details) => {
    initilizePath = `M 200 40 Q ${details.x} ${details.y} 1150 40`;

    console.log(details.y);
    gsap.to("svg path", {
      attr: { d: initilizePath },
      duration: 2,
      ease: "Power3.out(1,0.2)",
    });
  });

  page1.addEventListener("mouseleave", (details) => {
    gsap.to("svg path", {
      attr: { d: finalPath },
      duration: 1.5,
      ease: "elastic.out(1,0.2)",
    });
  });
}

pageOneSVG();
