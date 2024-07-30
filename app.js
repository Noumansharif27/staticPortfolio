let revealText = document.querySelectorAll(".reveal");
let nav = document.querySelector("#nav");
let cursor = document.querySelector("#cursor");
let hoverElements = document.querySelectorAll(".hover-element");

// creating spans
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

// loader an dupper home page animation
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
        delay: 1,
      },
      "content"
    )
    .to(
      "#content-para-2",
      {
        top: "13%",
        duration: 2,
        delay: 1,
      },
      "content"
    );
}

// Home page's card and para animation
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

// svg's affects
function pageOneSVG() {
  let initilizePath = `M 100 40 Q 500 40 1100 40`;
  let finalPath = `M 100 40 Q 500 40 1100 40`;
  let svgLineAaffect = document.querySelectorAll("#svg-line-affect");
  svgLineAaffect.forEach((el) => {
    el.addEventListener("mousemove", (details) => {
      initilizePath = `M 200 40 Q ${details.x + 50} ${details.y - 100} 1150 40`;

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

function projectCardAnimations() {
  // project card's button hover affect
  function projectsCardsHover() {
    let projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((currentCard, details) => {
      currentCard.addEventListener("mouseenter", (details) => {
        currentCard.style.filter = "grayscale()";
        // console.log(currentCard.childNodes[3].childNodes[1]);
        let projectYearBtn = details.target.querySelector(".year-span");
        let projectRoleBtn = details.target.querySelector(".role-span");
        let projectPreview = details.target.querySelector(".project-preview");
        projectPreview.style.opacity = 1;
        projectPreview.style.transform = `translate(${details.clientX - 100}, ${
          details.clientY - 100
        })`;

        // let Xaxis = `${details.clientX - 100}px`;
        // let Yaxis = `${details.clientY - 100}px`;
        let tl = gsap.timeline();

        tl.to(
          projectYearBtn,
          {
            top: 0,
            opacity: 1,
            ease: "Power3.easeOut",
            duration: 1.5,
          },
          "a"
        ).to(
          projectRoleBtn,
          {
            top: "30%",
            opacity: 1,
            ease: "Power3.easeOut",
            duration: 1.5,
          },
          "a"
        );
        // .to(
        //   projectPreview,
        //   {
        //     opacity: 1,
        //     x: Xaxis,
        //     y: Yaxis,
        //     ease: "Power3.easeOut",
        //     duration: 1,
        //   },
        //   "a"
        // );
        // .to(
        //   cursorSeat,
        //   {
        //     x: xaxis,
        //     y: Yaxis,
        //     ease: "Power3.easeOut",
        //     duration: 1,
        //   },
        //   "a"
        // );
      });

      currentCard.addEventListener("mouseleave", (details) => {
        currentCard.style.filter = "grayscale(0)";

        // console.log(currentCard.childNodes[3].childNodes[1]);
        let projectYearBtn = details.target.querySelector(".year-span");
        let projectRoleBtn = details.target.querySelector(".role-span");
        let projectPreview =
          details.target.querySelectorAll(".project-preview");
        projectPreview.style.opacity = 0;
        // let xaxis = `${details.clientX - 200}px`;
        // let Yaxis = `${details.clientY - 300}px`;
        let tl = gsap.timeline();

        tl.to(
          projectYearBtn,
          {
            top: "-100%",
            opacity: 0,
            ease: "Power3.easeIn",
            duration: 1,
          },
          "a"
        ).to(
          projectRoleBtn,
          {
            top: "-100%",
            opacity: 0,
            ease: "Power3.easeIn",
            duration: 1,
          },
          "a"
        );
        // .to(
        //   projectPreview,
        //   {
        //     opacity: 0,
        //     x: xaxis,
        //     y: Yaxis,
        //     ease: "Power3.easeOut",
        //     duration: 1,
        //   },
        //   "a"
        // );
        // .to(
        //   cursorSeat,
        //   {
        //     x: xaxis,
        //     y: Yaxis,
        //     ease: "Power3.easeOut",
        //     duration: 1,
        //   },
        //   "a"
        // );
      });
    });
  }

  // project preview affect
  function projectPreviewAffect() {
    let projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((currentCard) => {
      console.log(currentCard);
      currentCard.addEventListener("mousemove", (details) => {
        // select
        let projectPreview = details.target.querySelector(".project-preview");
        projectPreview.style.opacity = 1;
        projectPreview.style.transform = `translate((${details.clientX}), (${details.clientY}))`;
        let cursorSeat = details.target.querySelector(".cursor-seat");
        // let Xaxis = `${details.clientX - 200}px`;
        // let Yaxis = `${details.clientY - 300}px`;
        let tl = gsap.timeline();

        // to(
        //   projectPreview,
        //   {
        //     opacity: 1,
        //     x: Xaxis,
        //     y: Yaxis,
        //     ease: "Power3.easeOut",
        //     duration: 1,
        //   },
        //   "a"
        // )

        // tl.to(
        //   cursorSeat,
        //   {
        //     x: xaxis,
        //     y: Yaxis,
        //     ease: "Power3.easeOut",
        //     duration: 1,
        //   },
        //   "a"
        // );
      });

      currentCard.addEventListener("mouseleave", (details) => {
        let projectPreview =
          details.target.querySelectorAll(".project-preview");
        projectPreview.style.opacity = 0;

        projectPreview.style.transform = translate(0, 0);
        let cursorSeat = details.target.querySelectorAll(".cursor-seat");
        // let xaxis = `${details.clientX - 200}px`;
        // let Yaxis = `${details.clientY - 300}px`;
        let tl = gsap.timeline();

        // tl.to(
        //   projectPreview,
        //   {
        //     opacity: 0,
        //     x: xaxis,
        //     y: Yaxis,
        //     ease: "Power3.easeOut",
        //     duration: 1,
        //   },
        //   "a"
        // ).to(
        //   cursorSeat,
        //   {
        //     x: xaxis,
        //     y: Yaxis,
        //     ease: "Power3.easeOut",
        //     duration: 1,
        //   },
        //   "a"
        // );
      });
    });
  }

  projectsCardsHover();
  // projectPreviewAffect();
}

reveal();
animatinOne();
animationtwo();
pageOneSVG();
projectCardAnimations();
