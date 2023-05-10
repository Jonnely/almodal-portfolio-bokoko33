import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ASScroll from '@ashthornton/asscroll'

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.World.room.actualRoom;
        this.room.children.forEach(child => {
            if(child.type === "RectAreaLight") {
                if (child.intensity === 3) this.rectLight1 = child;
                if (child.intensity === 5) this.rectLight2 = child;
                if (child.intensity === 4) this.rectLight3 = child;
            }
        });

        GSAP.registerPlugin(ScrollTrigger);

        this.circleFirst = this.experience.World.floor.circleFirst;
        this.circleSecond = this.experience.World.floor.circleSecond;
        this.circleThird = this.experience.World.floor.circleThird;

        this.setSmoothScroll();
        this.setScrollTrigger();
    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.09,
            disableRaf: true,
        });
    
        GSAP.ticker.add(asscroll.update);
    
        ScrollTrigger.defaults({
            scroller: asscroll.containerElement
        });
    
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
            },
            fixedMarkers: true
        });
    
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
        
        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]")
            }); 
        });

        return asscroll;
    }

    setSmoothScroll(){
        this.asscroll = this.setupASScroll();
    }

    setScrollTrigger() {
        ScrollTrigger.matchMedia({
            // Desktop
            "(min-width: 969px)": () => {

                console.log("fired desktop");
                this.room.scale.set(0.16, 0.16, 0.16);
                this.room.position.set(0,0,0);

                // First section -------------------------------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });

                this.firstMoveTimeline.to(this.room.position, {
                    x: () => {
                        return this.sizes.width * 0.0014;
                    }
                });

                
                // Second section -------------------------------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                })
                    .to(
                        this.room.position, 
                        {
                            x: () => {
                                return -1.5;
                            },
                            z: () => {
                                return this.sizes.height * 0.0032;
                            }
                        },
                        "same",
                    )
                    .to(
                        this.room.scale, 
                        {
                            x: 0.4,
                            y: 0.4,
                            z: 0.4,
                        },
                        "same",
                    )
                    // Changing RectLight 1
                    .to(
                        this.rectLight1, 
                        {
                            width: 0.47 * 2,
                            height: 0.38 * 4,
                        },
                        "same",
                    )
                    // Changing RectLight 2
                    .to(
                        this.rectLight2, 
                        {
                            width: 0.28 * 3,
                            height: 0.40 * 3,
                        },
                        "same",
                    )
                    // Changing RectLight 3
                    .to(
                        this.rectLight3, 
                        {
                            width: 0.7 * 2,
                            height: 0.55 * 2,
                        },
                        "same",
                    );

                // Third section -------------------------------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.camera.orthographicCamera.position, {
                    y: 0.3, 
                    x: -5.5,
                    z: 3,

                }, "same")
                .to(this.camera.orthographicCamera.rotation, {
                    y: 0.7,
                    z: 0.34,
                }, "same")
                .to(
                    this.room.scale, 
                    {
                        x: 0.46,
                        y: 0.46,
                        z: 0.46,
                    },
                    "same",
                )
            },

            // Mobile
            "(max-width: 968px)": () => {
                console.log("fired mobile");

                this.room.scale.set(0.07, 0.07, 0.07);
                this.room.position.set(0,0.3,0);

                // First section -------------------------------------------------------------
                this.firstMoveTimelineMobile = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }
                }).to(this.room.scale, {
                    x: 0.1,
                    y: 0.1,
                    z: 0.1,
                }).to(this.room.position, {
                    x: () => {
                        return this.sizes.width * 0.0014;
                    }
                });

                // Second section -------------------------------------------------------------
                this.secondMoveTimelineMobile = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                })
                .to(this.room.scale, {
                    x: 0.25,
                    y: 0.25,
                    z: 0.25,
                })                    
                .to(this.room.position, 
                    {
                        x: () => {
                            return 1;
                        },
                        z: () => {
                            return this.sizes.height * 0.0012;
                        }
                    },
                    "same",
                )
                // Changing RectLight 1
                .to(
                    this.rectLight1, 
                    {
                        width: 0.47 * 2,
                        height: 0.38 * 4,
                    },
                    "same",
                )
                // Changing RectLight 2
                .to(
                    this.rectLight2, 
                    {
                        width: 0.28 * 3,
                        height: 0.40 * 3,
                    },
                    "same",
                )
                // Changing RectLight 3
                .to(
                    this.rectLight3, 
                    {
                        width: 0.7 * 2,
                        height: 0.55 * 2,
                    },
                    "same",
                );

                // Third section -------------------------------------------------------------
                this.thirdMoveTimelineMobile = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.camera.orthographicCamera.position, {
                    y: 0.3, 
                    x: -5.5,
                    z: 3,

                }, "same")
                .to(this.camera.orthographicCamera.rotation, {
                    y: 0.7,
                    z: 0.34,
                }, "same")
                .to(
                    this.room.scale, 
                    {
                        x: 0.46,
                        y: 0.46,
                        z: 0.46,
                    },
                    "same",
                )
                
            },

            "all": () => {               
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach((section) => {
                    this.progressWrapper = section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    if (section.classList.contains("right")) {
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6
                            }
                        });

                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6
                            }
                        });
                    }

                    if (section.classList.contains("left")) {
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6
                            }
                        });

                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6
                            }
                        });
                    }

                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        },
                    })

                    //  Floor Circle Animations -------------
                
                    // First section -------------------------------------------------------------
                    this.firstMoveTimeline = new GSAP.timeline({
                        scrollTrigger: {
                            trigger: ".first-move",
                            start: "top top",
                            end: "bottom",
                            scrub: 0.6,
                            invalidateOnRefresh: true,
                        },
                    }).to(this.circleFirst.scale, {
                        x: 3,
                        y: 3,
                        z: 3,   
                    });
                    
                    // Second section -------------------------------------------------------------
                    this.secondMoveTimeline = new GSAP.timeline({
                        scrollTrigger: {
                            trigger: ".second-move",
                            start: "top top",
                            end: "bottom",
                            scrub: 0.6,
                            invalidateOnRefresh: true,
                        }
                    }).to(this.circleSecond.scale, {
                        x: 3,
                        y: 3,
                        z: 3,   
                    },"same").to(this.room.position, {
                        y: 0.7,
                    },"same");

                    // Third section -------------------------------------------------------------
                    this.thirdMoveTimeline = new GSAP.timeline({
                        scrollTrigger: {
                            trigger: ".third-move",
                            start: "top top",
                            end: "bottom",
                            scrub: 0.6,
                            invalidateOnRefresh: true,
                        }
                    }).to(this.circleThird.scale, {
                        x: 3,
                        y: 3,
                        z: 3,   
                    }); 
                });  
            }
              
          }); 
    }

    

    update() {}
}