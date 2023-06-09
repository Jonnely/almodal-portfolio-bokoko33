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

    firstIntro() {
        return new Promise((resolve) => {
            this.timeline = new GSAP.timeline();
            this.timeline.set(".animatedis", {y: 0, yPercent: 100});
            this.timeline.to(".preloader", {
                opacity: 0,
                delay: 0.5,
                onComplete: () => {
                    document
                        .querySelector(".preloader")
                        .classList.add(".hidden");
                },
            });
            if (this.device === "desktop") {
                this.timeline
                    .to(this.roomChildren.wall2.scale, {
                        x: 1.4,
                        y: 1.4,
                        z: 1.4,
                        ease: "back.out(1)",
                        duration: 0.7,
                    }, "same_desktop").to(this.room.rotation, {
                        z: Math.PI * 2,
                        duration: 0.5,
                    }, "same_desktop").to(this.room.position, {
                        x: -1,
                        ease: "power1.out",
                        duration: 0.5,
                    });
            } else {
                this.timeline
                    .to(this.roomChildren.wall2.scale, {
                        x: 2.4,
                        y: 2.4,
                        z: 2.4,
                        ease: "back.out(2.5)",
                        duration: 0.7,
                    }, "same_mobile").to(this.room.rotation, {
                        z: Math.PI * 2,
                        duration: 0.7,
                    }, "same_mobile").to(this.room.position, {
                        z: -1,
                        ease: "power1.out",
                        duration: 0.7,
                    });
            }

            this.timeline.to(".intro-text .animatedis", {
                yPercent: 0,
                stagger: 0.05,
                ease: "back.out(1.7)",
            }).to(".arrow-svg-wrapper", {
                opacity: 1,
                duration: 1,
            }, "same").to(".toggle-bar", {
                opacity: 1,
                duration: 1, 
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
            }, "same",).to(this.room.position, {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.5,
                ease: "power1.out",
            }, "same").to(this.roomChildren.wall2.rotation, {
                y: 2 * Math.PI + Math.PI / 4,
                duration: 0.5,
            }, "same").to(this.roomChildren.wall2.scale, {
                x: 9,
                y: 13,
                z: 9,
                duration: 0.5,
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
            },"same2").to(".hero-main-title .animatedis", {
                yPercent: 0,
                stagger: 0.03,
                ease: "back.out(1.2)",
            }, "same2").to(".hero-main-description .animatedis", {
                yPercent: 0,
                stagger: 0.03,
                ease: "back.out(1.2)",
            }, "same2").to(".first-sub .animatedis", {
                yPercent: 0,
                stagger: 0.03,
                ease: "back.out(1.2)",
            }, "same2").to(".second-sub .animatedis", {
                yPercent: 0,
                stagger: 0.03,
                ease: "back.out(1.2)",
            }, "same2").to(this.roomChildren.wall_maria.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 1.2,
            }, "same2", ">-0.5").to(this.roomChildren.armature001.scale, {
                x: 1,
                y: 1,
                z: 1,
            }, "same3").to(this.roomChildren.bed.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            }, "same3").to(this.roomChildren.clock.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            }, "same3").to(this.roomChildren.door.scale, {
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
            }, "same4").to(this.roomChildren.monitor2.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            }, "same4").to(this.roomChildren.monitor_1_screen001.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            }, "same4").to(this.roomChildren.mousekeyboardpad.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            }, "same5").to(this.roomChildren.pic1.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            }, "same5").to(this.roomChildren.pic2.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            }, "same5").to(this.roomChildren.pic3.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.2,
            }, "same5").to(this.roomChildren.pic4.scale, {
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
                duration: 1.5,
            }, "chair").to(".arrow-svg-wrapper", {
                opacity: 1,
                onComplete: resolve,
            });
        });
    }

    onScroll(e) {
        console.log(e.deltaY);
        if (e.deltaY > 0) {
            console.log(e.deltaY);
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }


    onTouch(e) {
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

    
    removeEventListeners() {
        window.removeEventListener("wheel",  this.scrollOnceEvent);
        window.removeEventListener("touchstart",  this.touchStart);
        window.removeEventListener("touchmove",  this.touchMove);
    }

    async playFirstIntro() {
        this.scaleFlag = true;
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel",  this.scrollOnceEvent);
        window.addEventListener("touchstart",  this.touchStart);
        window.addEventListener("touchmove",  this.touchMove);
    }

    async playSecondIntro() {
        this.moveFlag = false;
        await this.secondIntro();
        this.scaleFlag = false;

        this.emit("enablecontrols");
    }

    move() {
        if (this.device === "desktop") {
            this.room.position.set(-1, 0, 0);
        } else {
            this.room.position.set(0, 0, -1);
        }
    }

    scale() {
        if (this.device === "desktop") {
            this.room.scale.set(0.16, 0.16, 0.16);
        } else {
            this.room.scale.set(0.07, 0.07, 0.07);
        }
    }

    update() {
        if (this.moveFlag) {
            this.move();
        }

        if (this.scaleFlag) {
            this.scale();
        }
    }

}