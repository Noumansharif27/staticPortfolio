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
    .to("#green-div", {
      height: 0,
      duration: 1.5,
      delay: -0.6,
      ease: "Power4.easeOut",
    })
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
      trigger: "#main",
      scrub: 2,
      start: "top 150%",
      end: "bottom 450%",
    },
  });

  gsap.set(".para p, .para span", {
    y: "100%",
  });

  gsap.to(".para p", {
    y: "0%",
    duration: 0.4,
    stagger: 0.3,
    scrollTrigger: {
      trigger: "#main",
      start: "top top",
      end: "bottom 50%",
    },
  });

  tl.to(
    "#cards .card-1",
    {
      rotate: "-10",
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
        right: "23%",
        duration: 100,
        ease: "Power3.easeInOut",
        delay: "-1",
      },
      "cardAnim"
    );
}

animationtwo();

let initilizePath = `M 100 40 Q 500 40 1100 40`;
let finalPath = `M 100 40 Q 500 40 1100 40`;
function pageOneSVG() {
  let svgLineAaffect = document.querySelectorAll("#svg-line-affect");
  svgLineAaffect.forEach((el) => {
    el.addEventListener("mousemove", (details) => {
      initilizePath = `M 200 40 Q ${details.x} ${details.y - 50} 1150 40`;

      console.log(details.y);
      gsap.to("svg path", {
        attr: { d: initilizePath },
        duration: 1,
        ease: "Power3.out(1,0.2)",
      });
    });

    el.addEventListener("mouseleave", (details) => {
      gsap.to("svg path", {
        attr: { d: finalPath },
        duration: 1,
        ease: "elastic.out(1,0.2)",
      });
    });
  });
}

pageOneSVG();
