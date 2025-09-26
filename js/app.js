const revealText = document.querySelectorAll(".reveal");
const nav = document.querySelector("#nav");
const cursor = document.querySelector("#cursor");
const hoverElements = document.querySelectorAll(".hover-element");

function smoothScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".scrollContainer"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".scrollContainer" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".scrollContainer", {
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
    pinType: document.querySelector(".scrollContainer").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

smoothScroll();

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

function theme() {
  let body = document.querySelector("#body");

  function setTheme(mode) {
    body.classList.remove("light", "dark-mode"); // Remove existing classes
    body.classList.add(mode); // Add the new class
  }

  // Check for system preference (prefers-color-scheme)
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Apply initial theme based on system preference
  setTheme(prefersDark ? "dark-mode" : "light");
}

theme();

window.addEventListener("load", () => {
  function animatinOne() {
    const tl = gsap.timeline();

    tl.to(
      ".loader-parent .child-span-1 ",
      {
        left: "70.5%",
        top: "50%",
        opacity: 1,
        stagger: 0.5,
        duration: 1,
        ease: "Expo.easeInOut",
      },
      "loader-animation"
    )
      .to(
        ".loader-parent .child-span-2 ",
        {
          left: "83.5%",
          opacity: 1,
          stagger: 0.5,
          duration: 1,
          ease: "Expo.easeInOut",
        },
        "loader-animation"
      )
      .to(
        ".loader-parent .child-span-3 ",
        {
          left: "93%",
          opacity: 1,
          stagger: 0.5,
          duration: 1,
          ease: "Expo.easeInOut",
        },
        "loader-animation"
      )
      .to(
        ".loader-parent .child-span-4 ",
        {
          delay: 0.8,
          left: "97%",
          opacity: 1,
          stagger: 0.5,
          duration: 1,
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
        ".reveal",
        {
          y: "-190%",
          duration: 1.5,
          ease: "Expo.easeInOut",
        },
        "loader-hidden-animation"
      )
      .to(
        ".loader",
        {
          height: 0,
          duration: 0.7,
          ease: "Power4.easeOut",
        },
        "a"
      )
      .to(".green-div", {
        height: 0,
        duration: 1,
        delay: -0.6,
        ease: "Power4.easeOut",
        onComplete: () => {
          divremover();
        },
      })
      .to(nav, {
        opacity: 1,
        delay: -1.5,
        ease: "Expo.easeInOut",
      })
      .to(
        "#content-row-2 h2",
        {
          delay: -0.6,
          rotateX: 0,
          opacity: 1,
          duration: 1,
        },
        "content"
      )
      .to(
        "#content-row-1 h2",
        {
          delay: -0.6,
          rotateX: 0,
          opacity: 1,
          duration: 1,
        },
        "content"
      )
      .to(
        "#content-para-1",
        {
          top: "15%",
          duration: 1.3,
          delay: 0.15,
        },
        "content"
      )
      .to(
        "#content-para-2",
        {
          top: "15%",
          duration: 1.3,
          delay: 0.15,
          onComplete: () => {
            animationtwo();
          },
        },
        "content"
      );
  }

  animatinOne();
});
// loader an dupper home page animation

// Home page's card and para animation
function animationtwo() {
  gsap.from("#content", {
    width: "70%",
    duration: 0.1,
  });
  gsap.to(
    ".para p",
    {
      y: 0,
      duration: 0.18,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".para",
        scroller: ".scrollContainer",
        start: "50% bottom",
        end: "50% top",
      },
    },
    "card"
  );

  gsap.to(
    "#cards .card-1",
    {
      rotate: "-10",
      right: "45%",
      ease: "Power4.easeInOut",
      scrollTrigger: {
        trigger: "#cards",
        scroller: ".scrollContainer",
        scrub: 5,
        start: "40% 40%",
        end: "70% bottom",
      },
    },
    "card"
  );
  gsap.to(
    "#cards .card-2",
    {
      rotate: "-5",
      right: "35%",
      ease: "Power4.easeInOut",
      scrollTrigger: {
        trigger: "#cards",
        scroller: ".scrollContainer",
        scrub: 5,
        start: "40% 40%",
        end: "70% bottom",
      },
    },
    "card"
  );
  gsap.to(
    "#cards .card-3",
    {
      rotate: "0",
      right: "23%",
      // duration: 3,
      ease: "Power4.easeInOut",
      scrollTrigger: {
        trigger: "#cards",
        scroller: ".scrollContainer",
        scrub: 5,
        start: "40% 40%",
        end: "70% bottom",
      },
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
      initilizePath = `M 200 40 Q ${details.x + 50} ${details.y} 1150 40`;

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

let page1 = document.querySelector("#page-1");

function projectCardAnimations() {
  // project card's button hover affect
  function projectsCardsHover() {
    // selecting all the button's parent
    let projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((currentCard, details) => {
      //  for the current parent makes its children button apper from above with getting opacity=1;
      currentCard.addEventListener("mouseenter", (details) => {
        currentCard.style.filter = "grayscale()";
        // console.log(details.target.dataset);
        let projectYearBtn = details.target.querySelector(".year-span");
        let projectRoleBtn = details.target.querySelector(".role-span");
        console.log(details.target.dataset.color);
        page1.style.backgroundColor = "details.target.dataset.color";

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
      });

      // reversing the above affect
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
  // function projectPreviewAffect() {
  //   let projectCards = document.querySelectorAll(".project-card");
  //   projectCards.forEach((currentCard) => {
  //     currentCard.addEventListener("mousemove", (details) => {
  //       console.log(details);
  //       let projectPreview = details.target.querySelector(".project-preview");
  //       projectPreview.style.opacity = 1;
  //       // projectPreview.style.transform = `translate(${
  //       //   details.clientX - currentCard.offsetLeft
  //       // }px, ${details.clientY - currentCard.offsetTop}px)`;
  //       projectPreview.style.transform = `translate(${details.clientX - 100}, ${
  //         details.clientY - 100
  //       })`;

  //       // let Xaxis = `${details.clientX - 100}px`;
  //       // let Yaxis = `${details.clientY - 100}px`;

  //       gsap.to(
  //         projectPreview,
  //         {
  //           opacity: 1,
  //           x: Xaxis,
  //           y: Yaxis,
  //           ease: "Power3.easeOut",
  //           duration: 1,
  //         },
  //         "a"
  //       );
  //       // gsap.to(
  //       //   cursorSeat,
  //       //   {
  //       //     x: Xaxis,
  //       //     y: Yaxis,
  //       //     ease: "Power3.easeOut",
  //       //     duration: 1,
  //       //   },
  //       //   "a"
  //       // );
  //     });

  //     currentCard.addEventListener("mouseleave", (details) => {
  //       let projectPreview = details.target.querySelector(".project-preview");
  //       projectPreview.style.opacity = "0";

  //       gsap.to(
  //         projectPreview,
  //         {
  //           opacity: 0,
  //           x: xaxis,
  //           y: Yaxis,
  //           ease: "Power3.easeOut",
  //           duration: 1,
  //         },
  //         "a"
  //       );
  //       gsap.to(
  //         cursorSeat,
  //         {
  //           x: xaxis,
  //           y: Yaxis,
  //           ease: "Power3.easeOut",
  //           duration: 1,
  //         },
  //         "a"
  //       );
  //     });
  //   });
  // }

  function cardMovingAnimation() {}

  projectsCardsHover();
  // projectPreviewAffect(); // this animation is not working as well by some reason
  cardMovingAnimation();
}

// project page animation
function projectPageAnimation() {
  gsap.to("#page-1-title h2", {
    top: "-20%",
    rotate: 0,
    ease: "Power4.easeOut",
    scrub: 2,

    stagger: 0.2,
    duration: 2,
    scrollTrigger: {
      trigger: "#page-1-text",
      scroller: ".scrollContainer",
      start: "230% 50%",
      end: "350% bottom",
    },
  });
}

function footerAnimation() {
  function footerButtonAnimation() {
    // Selecting all footer buttons
    let footerButtons = document.querySelectorAll(
      "#footer-buttons .footer-btn  "
    );
    footerButtons.forEach((btn) => {
      // for each button make it's background white as well as it's text black
      btn.addEventListener("mousemove", (details) => {
        let buttonBg = details.target.querySelector(".button-bg");
        buttonBg.style.opacity = 1;
        buttonBg.style.width = "101%";
        buttonBg.style.height = "100%";

        btn.style.color = "#000";
        // btn.style.border = "none";
      });

      // reverse the upper affect
      btn.addEventListener("mouseleave", (details) => {
        let buttonBg = details.target.querySelector(".button-bg");
        buttonBg.style.opacity = 0;
        btn.style.color = "#fff";
        buttonBg.style.width = "50%";
        buttonBg.style.height = "100%";
        // btn.style.border = "1px solid var(--secondary-text-color)";
      });
    });
  }

  function footerSocialsAnimation() {
    // selecting all the social icons
    let socialAccount = document.querySelectorAll(".socials .social-account");

    // for each social icon give its background colored element a height to apply the affect as well ad give some padding on left and right side of the content
    socialAccount.forEach((account) => {
      account.addEventListener("mouseenter", (details) => {
        let socialHoverBg = details.target.querySelector(".social-hover-gb");
        let socialContent = details.target.querySelector(".social-content");

        socialHoverBg.style.height = "100%";
        account.style.borderTop = "1px solid transparent";
        socialContent.style.padding = "0 1dvw";
      });

      // reverse the above affect
      account.addEventListener("mouseleave", (details) => {
        let socialHoverBg = details.target.querySelector(".social-hover-gb");
        let socialContent = details.target.querySelector(".social-content");

        socialHoverBg.style.height = "0";
        account.style.borderTop = "1px solid #fff";
        socialContent.style.padding = "0";
      });
    });
  }

  function footerTextAnimation() {
    let footerHeading = document.querySelector("#footer-heading h2");

    // animating the footer hero heading
    gsap.to("#footer-heading .full-screen-footer-heading .footer-child-span", {
      y: "-17%",
      delay: -1,
      duration: 0.08,
      stagger: 0.3,
      ease: "Power4.easeOut",
      scrollTrigger: {
        trigger: "#footer-heading",
        scroller: ".scrollContainer",
        start: "-420% 50%%",
        end: "-380% 100%",
      },
    });

    // animating the footer hero heading
    gsap.to("#footer-heading .media-screen-footer-header .footer-child-span", {
      y: "-17%",
      delay: -1,
      duration: 0.08,
      stagger: 0.3,
      ease: "Power4.easeOut",
      scrollTrigger: {
        trigger: "#footer-heading",
        scroller: ".scrollContainer",
        start: "-565% 50%%",
        end: "-400% 100%",
      },
    });
  }

  function technologiesDetails() {
    // give opacity=1; to the element after a slected element is clicked
    let projectCredits = document.querySelector("#project-credits");
    let technologyDetails = document.querySelector("#technology-detail");
    let footerSloge = document.querySelector(".footer-slogen");

    projectCredits.addEventListener("click", () => {
      technologyDetails.style.opacity = 1;
      footerSloge.style.zIndex = 2;

      gsap.to(
        ".footer-project-details",
        {
          top: 0,
          rotate: 0,
          opacity: 1,
          ease: "Expo.easeInOut",
          stagger: 0.2,
          duration: 0.7,
          delay: -0.38,
        },
        "techAnimation"
      );
    });

    // get the opacity=1; return after the selected element is clicked
    let closeBtn = document.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => {
      technologyDetails.style.opacity = "0";
      footerSloge.style.zIndex = 88;
    });
  }

  footerButtonAnimation();
  footerTextAnimation();
  footerSocialsAnimation();
  technologiesDetails();
}

reveal();
pageOneSVG();
projectCardAnimations();
projectPageAnimation();
footerAnimation();
