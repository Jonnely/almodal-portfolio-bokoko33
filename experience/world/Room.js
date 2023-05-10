import * as THREE from "three";
import Experience from "./Experience";
import GSAP from "gsap";
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        }
        
        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }

    setModel(){
        this.actualRoom.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group) {               
                child.children.forEach((groupChild) => {
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                });
            }

            if (child instanceof THREE.Object3D) {
                child.children.forEach((object3DChild) => {
                    object3DChild.castShadow = true;
                    object3DChild.receiveShadow = true;

                    if(object3DChild instanceof THREE.Group) {
                        object3DChild.children.forEach((object3DMesh) => {
                            object3DMesh.castShadow = true;
                            object3DMesh.receiveShadow = true;
                        });
                    }
                });
            }

            if(child.name === "Monitor_1_Screen001") {
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                })
            }

            child.scale.set(0, 0, 0);

            if(child.name === "wall2") {
                
                // child.scale.set(1, 1, 1);
                child.position.set(0, -0.5, 0);
                child.rotation.y = -Math.PI / 1.25;

            }

            this.roomChildren[child.name.toLowerCase()] = child;

        })
        const rectLight = new THREE.RectAreaLight( 
            0xffffff, 
            3, // intensity
            0.47, // width
            0.38, // height 
        );
        rectLight.position.set( 1.52144, 4.09341, -3);
        rectLight.rotation.y = -Math.PI / -1.34;
        this.actualRoom.add(rectLight)

        // const rectLightHelper1 = new RectAreaLightHelper( rectLight );
        // rectLight.add( rectLightHelper1 );

        // rect light 2
        const rectLight2 = new THREE.RectAreaLight( 
            0xffffff, 
            5, // intensity
            0.28, // width
            0.40, // height 
        );
        rectLight2.position.set( -0.910806, 4.45961, -4);
        rectLight2.rotation.y = -Math.PI / -0.97;
        this.actualRoom.add(rectLight2)

        // const rectLightHelper = new RectAreaLightHelper( rectLight2 );
        // rectLight.add( rectLightHelper );

        // rect light 3
        const rectLight3 = new THREE.RectAreaLight( 
            0xffffff, 
            4, // intensity
            0.7, // width
            0.55, // height 
        );
        rectLight3.position.set( 3.11172, 8.3, -4.5);
        rectLight3.rotation.y = -Math.PI / 0.8;
        this.actualRoom.add(rectLight3)

        // const rectLightHelper3 = new RectAreaLightHelper( rectLight3 );
        // rectLight.add( rectLightHelper3 );


        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.16, 0.16, 0.16);
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation =((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
        })

    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swingFan = this.mixer.clipAction(this.room.animations[16]);
        this.swingFan.play();
    }

    resize() {

    }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * 0.001);
    }
}