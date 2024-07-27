let tl = gsap.timeline();
let revealText = document.querySelectorAll(".reveal");
let nav = document.querySelector("#nav");

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

window.addEventListener("load", () => {
  function loaderAnimation() {
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
      });
  }

  loaderAnimation();
});

function homeAnimation() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#home",
      scrub: 2,
      start: "top top",
      end: "bottom 30%",
    },
  });

  gsap.to(".para p", {
    y: "100%",
  });

  tl.to(
    "#cards .card-1",
    {
      rotate: "-3",
      right: "45%",
    },
    "cardAnim"
  )
    .to(
      "#cards .card-2",
      {
        rotate: "0",
        right: "38%",
      },
      "cardAnim"
    )
    .to(
      "#cards .card-3",
      {
        rotate: "10",
        righ: "-10%",
      },
      "cardAnim"
    );
}

gsap.to(
  ".para p",
  {
    y: "0%",
    stagger: 0.2,
    scrollTrigger: {
      trigger: "#home",
      start: "top 50%",
      end: "bottom 50%",
      markers: true,
    },
  },
  "carAnim"
);

homeAnimation();
