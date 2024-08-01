const revealText = document.querySelectorAll(".reveal");
const nav = document.querySelector("#nav");
const cursor = document.querySelector("#cursor");
const hoverElements = document.querySelectorAll(".hover-element");

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

// creating spans
function reveal() {
  revealText.forEach((el) => {
    // creating new spans
    const parentSpan = document.createElement("span");
    const childSpan = document.createElement("span");

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
  const tl = gsap.timeline();

  tl.to(
    ".loader-parent .child-span-1 ",
    {
      delay: 0.3,
      left: "70%",
      opacity: 1,
      stagger: 0.5,
      duration: 2,
      ease: "Expo.easeInOut",
    },
    "loader-animation"
  )
    .to(
      ".loader-parent .child-span-2 ",
      {
        delay: 0.5,
        left: "82.5%",
        opacity: 1,
        stagger: 0.5,
        duration: 2,
        ease: "Expo.easeInOut",
      },
      "loader-animation"
    )
    .to(
      ".loader-parent .child-span-3 ",
      {
        delay: 0.8,
        left: "93.5%",
        opacity: 1,
        stagger: 0.5,
        duration: 2,
        ease: "Expo.easeInOut",
      },
      "loader-animation"
    )
    .to(
      ".loader-parent .child-span-4 ",
      {
        delay: 1,
        left: "97%",
        opacity: 1,
        stagger: 0.5,
        duration: 2,
        ease: "Expo.easeInOut",
      },
      "loader-animation"
    )
    .to(
      ".loader-parent span",
      {
        y: "-150%",
        duration: 2,
        ease: "Expo.easeInOut",
      },
      "loader-hidden-animation"
    )
    .to(
      ".childSpan",
      {
        y: "-100%",
        duration: 1.5,
        ease: "Expo.easeInOut",
      },
      "loader-hidden-animation"
    )
    .to(
      "#loader",
      {
        height: 0,
        duration: 0.7,
        ease: "Power4.easeOut",
      },
      "a"
    )
    .to("#green-div", {
      height: 0,
      duration: 1,
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
        duration: 1,
      },
      "content"
    )
    .to(
      "#content-row-1 h2",
      {
        rotateX: 0,
        opacity: 1,
        duration: 1,
      },
      "content"
    )
    .to(
      "#content-para-1",
      {
        top: "13%",
        duration: 2,
        delay: 0.3,
      },
      "content"
    )
    .to(
      "#content-para-2",
      {
        top: "13%",
        duration: 2,
        delay: 0.3,
      },
      "content"
    );
}

// Home page's card and para animation
function animationtwo() {
  const tl = gsap.timeline({
    scrollTrigger: {
      scrollar: "#home",
      scrub: 2,
      start: "30% 40%",
      end: "150% 50%",
      // markers: true,
    },
  });

  gsap.set(".para p, .para span", {
    y: "100%",
  });

  gsap.to(
    ".para p",
    {
      y: 0,
      duration: 0.4,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".para p",
        start: "80% 50%",
        end: "100% bottom",
        markers: true,
      },
    },
    "card"
  );

  tl.to(
    "#cards .card-1",
    {
      rotate: "-10",
      right: "45%",
      duration: 3,
      ease: "Power4.easeInOut",
      // delay: "-1",
      // scrollTrigger: {
      //   trigger: "#cards .card-1",
      //   scrub: 2,
      //   markers: true,
      //   start: "10% 20%",
      //   end: "30% 50%",
      // },
    },
    "card"
  )
    .to(
      "#cards .card-2",
      {
        rotate: "-5",
        right: "35%",
        duration: 3,
        ease: "Power4.easeInOut",
        // delay: "-1",
        // scrollTrigger: {
        //   trigger: "#home",
        //   scrub: 2,
        //   start: "10% 20%",
        //   end: "30% 50%",
        // },
      },
      "card"
    )
    .to(
      "#cards .card-3",
      {
        rotate: "0",
        right: "23%",
        duration: 3,
        ease: "Power4.easeInOut",
        // delay: "-1",
        // scrollTrigger: {
        //   trigger: "#main",
        //   scrub: 2,
        //   start: "10% 20%",
        //   end: "30% 50%",
        // },
      },
      "card"
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
            top: "27%",
            opacity: 1,
            ease: "Power3.easeOut",
            duration: 1.5,
          },
          "a"
        );
      });

      currentCard.addEventListener("mouseleave", (details) => {
        currentCard.style.filter = "grayscale(0)";

        // console.log(currentCard.childNodes[3].childNodes[1]);
        let projectYearBtn = details.target.querySelector(".year-span");
        let projectRoleBtn = details.target.querySelector(".role-span");

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
        // .
      });
    });
  }

  // project preview affect
  function projectPreviewAffect() {
    let projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((currentCard) => {
      currentCard.addEventListener("mousemove", (details) => {
        let projectPreview = details.target.querySelector(".project-preview");
        projectPreview.style.opacity = 1;
        // projectPreview.style.transform = `translate(${
        //   details.clientX - currentCard.offsetLeft
        // }px, ${details.clientY - currentCard.offsetTop}px)`;
        projectPreview.style.transform = `translate(${details.clientX - 100}, ${
          details.clientY - 100
        })`;

        // let Xaxis = `${details.clientX - 100}px`;
        // let Yaxis = `${details.clientY - 100}px`;

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
        console.log("it is also working");

        let projectPreview =
          details.target.querySelectorAll(".project-preview");
        projectPreview.style.opacity = "0";
        // let xaxis = `${details.clientX - 200}px`;
        // let Yaxis = `${details.clientY - 300}px`;
        let tl = gsap.timeline();

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

  projectsCardsHover();
  projectPreviewAffect();
}

// project page animation
function projectPageAnimation() {
  gsap.to("#page-1-text", {
    y: 0,
    ease: "Power4.easeOut",
    stagger: 0.2,
    scrollTrigger: {
      trigger: "#page-1-text",
    },
  });
}

function footerAnimation() {
  function footerButtonAnimation() {
    let footerButtons = document.querySelectorAll(
      "#footer-buttons .footer-btn  "
    );
    footerButtons.forEach((btn) => {
      btn.addEventListener("mousemove", (details) => {
        console.log(details);
        let buttonBg = details.target.querySelector(".button-bg");
        buttonBg.style.opacity = 1;
        buttonBg.style.width = "100%";

        btn.style.color = "#000";
        // gsap.to(btn.children, {
        //   backgroundColor: "#fff  ",
        //   // height: "100%",
        //   ease: "Power4",
        // });
      });

      btn.addEventListener("mouseleave", (details) => {
        console.log(details);
        let buttonBg = details.target.querySelector(".button-bg");
        buttonBg.style.opacity = 0;
        btn.style.color = "#fff";
        buttonBg.style.width = "50%";

        // gsap.to(buttonBg, {
        //   backgroundColor: "#fff  ",
        //   width: 0,
        //   opacity: 0,
        //   ease: "Power4",
        // });
      });
    });
  }

  // function footerSocialsAnimation() {
  //   let socialContent = document.querySelectorAll(".social-content");
  //   socialAccount.forEach((account) => {
  //     account.addEventListener("mousemove", (details) => {
  //       console.log("hhi");
  //       let socialHoverGb = details.target.querySelector(".social-hover-gb");
  //       socialHoverGb.style.height = "100%";
  //     });
  //   });
  // }

  function footerTextAnimation() {
    let footerHeading = document.querySelector("#footer-heading h2");
    clutter = footerHeading.innerHTML;
    // footerHeading.innerHTML = "";
    // footerHeading.innerHTML = `<span>LET'S TALK</span> <span>ABOUT THE NEXT</span> <span>BIG THING</span>`;
    gsap.to("#footer-heading span ", {
      top: "45%",
      stagger: 0.3,
      ease: "power4.easeOut",
      scrollTrigger: {
        trigger: "#footer-heading span ",
        // markers: true,
        start: "50% top",
        end: "50% bottom",
      },
    });
  }

  footerButtonAnimation();
  footerTextAnimation();
}

reveal();
animatinOne();
animationtwo();
pageOneSVG();
projectCardAnimations();
footerAnimation();
projectPageAnimation();
