import EventEmitter from "events";
import Experience from "./Experience";
import GSAP from "gsap";
import convert from "./utils/ConvertDivsToSpans"

export default class Preloader extends EventEmitter {

    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.World;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        });

        this.world.on("worldready", () => {
            this.setAssets();
            this.playFirstIntro();
        });
        
    }

    setAssets() {
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description"));
        convert(document.querySelector(".hero-second-subheading"));
        convert(document.querySelector(".second-sub"));
        this.room = this.experience.World.room.actualRoom;
        this.roomChildren = this.experience.World.room.roomChildren;

        console.log(this.roomChildren);
    }

    resize() {
        this.firstIntro();
    }

    onScroll(e) {
        if(e.deltaY > 0) {
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    firstIntro() {
        return new Promise((resolve) => {
            this.timeline = new GSAP.timeline();
            this.timeline.set(".animatedis", {y: 0, yPercent: 100});
            this.timeline.to(".preloader", {
                opacity: 0,
                delay: 1,
                onComplete: () => {
                    document.querySelector(".preloader")
                        .classList
                        .add(".hidden");
                }
            })

            if (this.device === "desktop") {
                this.timeline
                    .to(this.roomChildren.wall2.scale, {
                        x: 1.4,
                        y: 1.4,
                        z: 1.4,
                        ease: "back.out(2.5)",
                        duration: 1.3,
                    }, "same").to(this.room.rotation, {
                        z: Math.PI * 2,
                    }, "same").to(this.room.position, {
                        x: -0.5,
                        ease: "power1.out",
                        duration: 1.3,
                    })
            } else {
                this.timeline
                    .to(this.roomChildren.wall2.scale, {
                        x: 1.4,
                        y: 1.4,
                        z: 1.4,
                        ease: "back.out(2.5)",
                        duration: 1.3,
                    }, "same").to(this.room.rotation, {
                        z: Math.PI * 2,
                    }, "same").to(this.room.position, {
                        z: -0.1,
                        ease: "power1.out",
                        duration: 1.3,
                    })
            }

            this.timeline.to(".intro-text .animatedis", {
                yPercent: 0,
                stagger: 0.05,
                ease: "back.out(1.7)",
            }).to(".arrow-svg-wrapper", {
                opacity: 1,
                duration: 2,
            }, "same").to(".toggle-bar", {
                opacity: 1,
                duration: 2,
                onComplete: resolve,
            }, "same");
        });
       
    }

    secondIntro() {
        return new Promise((resolve) => {
            this.secondtimeline = new GSAP.timeline();

            this.secondtimeline
            .to(".intro-text .animatedis", {
                yPercent: 100,
                stagger: 0.05,
                ease: "back.in(1.7)",
            }, "fadeout").to(".arrow-svg-wrapper", {
                opacity: 0,
                duration: 2,
            }, "same").to(this.room.position, {
                x: 0,
                y: 0,
                z: 0,
                ease: "power1.out",
            }, "same").to(this.roomChildren.wall2.rotation, {
                y: 2 * Math.PI + Math.PI / 4
            }, "same").to(this.roomChildren.wall2.scale, {
                x: 9,
                y: 13,
                z: 9,
            }, "same").to(this.camera.orthographicCamera.position, {
                y: 0.5,
            }, "same").to(this.roomChildren.wall2.position, {
                x: -0.139134,
                y: 0.01,
                z: -8,
            },"same2").to(this.roomChildren.wall2.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 1.1,
            },"same2").to(".hero-main-title .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.2)",
            }, "same").to(".hero-main-description .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.2)",
            }, "same").to(".first-sub .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.2)",
            }, "same").to(".second-sub .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.2)",
            }, "same", ">-0.5").to(this.roomChildren.wall_maria.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 1.2,
                delay: 0.5,
            }, "same").to(this.roomChildren.armature001.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            }).to(this.roomChildren.bed.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            }).to(this.roomChildren.clock.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            }).to(this.roomChildren.door.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            },"table").to(this.roomChildren.table.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            },"table").to(this.roomChildren.kape.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            }).to(this.roomChildren.monitor2.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            }).to(this.roomChildren.monitor_1_screen001.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            }).to(this.roomChildren.mousekeyboardpad.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            }).to(this.roomChildren.pic1.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            }).to(this.roomChildren.pic2.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            }).to(this.roomChildren.pic3.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            }).to(this.roomChildren.pic4.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            }).to(this.roomChildren.shelf.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            }, "chair").to(this.roomChildren.guitar.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            }, "chair").to(this.roomChildren.wall2.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            }, "chair").to(this.roomChildren.chair.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            }, "chair").to(this.roomChildren.chair.rotation, {
                y: Math.PI * 6.1,
                duration: 2,
                onComplete: resolve
            }, "chair").to(".arrow-svg-wrapper", {
                opacity: 1,
                duration: 2,
            });
        });
    }

    onTouch(e) {
        console.log(e.touches);
        this.initialY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if (difference > 0) {
            console.log("swiped Up");
            this.removeEventListeners();
            this.playSecondIntro();
        } 

        this.initialY = null;
    }

    async playFirstIntro() {
        await this.firstIntro();
        this.moveFlag = true;
        this.scaleFlag = true;

        console.log("continuinggggg");
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel",  this.scrollOnceEvent);
        window.addEventListener("touchstart",  this.touchStart);
        window.addEventListener("touchmove",  this.touchMove);
    }

    async playSecondIntro() {
        this.moveFlag = false;
        this.scaleFlag = false;
        await this.secondIntro();
   
        if(this.device === "mobile") {
            this.emit("enablecontrols");
        }
    }

    removeEventListeners() {
        window.removeEventListener("wheel",  this.scrollOnceEvent);
        window.removeEventListener("touchstart",  this.touchStart);
        window.removeEventListener("touchmove",  this.touchMove);
    }

    move() {
        if (this.device === "desktop") {
            this.room.position.set(-0.5,0,0);
        } else {
            this.room.position.set(0, 0, -0.57);
        }
    }

    scale() {
        if (this.device === "desktop") {
            this.room.scale.set(0.11, 0.11, 0.11);
        } else {
            this.room.scale.set(0.07, 0.07, 0.07);
        }
    }

    update() {
        if (this.moveFlag) {
            this.move();
        }

        // if (this.scaleFlag) {
        //     this.scale();
        // }
    }

}