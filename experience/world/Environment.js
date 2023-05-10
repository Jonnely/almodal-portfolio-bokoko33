import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import GUI from 'lil-gui'; 

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // this.gui = new GUI({ container: document.querySelector('.hero-main')});
        this.obj = {
            colorObj: {r: 0, g: 0, b: 0},
            intensity: 3,
        };
        
        this.setSunlight();
        // this.setGUI();
    }

    setGUI() {
        this.gui.addColor(this.obj, "colorObj").onChange(() => {
            this.sunLight.color.copy(this.obj.colorObj)
            this.ambientLight.color.copy(this.obj.colorObj)
        });
        this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
            this.sunLight.intensity = this.obj.intensity;
            this.ambientLight.intensity = this.obj.intensity;
        })
    }

    setSunlight(){
        this.sunLight = new THREE.DirectionalLight("#ffffff", 0.6);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 15;
        this.sunLight.shadow.mapSize.set(2048,2048);
        this.sunLight.shadow.normalBias = 0.05;

        // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        // this.scene.add(helper);

        this.sunLight.position.set(-5, 8, 9);
        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight("#fdfbd3", 1);
        this.scene.add(this.ambientLight);
    }

    switchTheme(theme) {
        if(theme === "dark") {
            GSAP.to(this.sunLight.color, {
                r: 0.16862745098039217,
                g: 0.19607843137254902,
                b: 0.9921568627450981,
            });

            GSAP.to(this.ambientLight.color, {
                r: 0.16862745098039217,
                g: 0.19607843137254902,
                b: 0.9921568627450981,
            });
            GSAP.to(this.sunLight, {
                intensity: 0.6,
            })
        } else {
            GSAP.to(this.sunLight.color, {
                r: 0.9333333333333333,
                g: 0.9411764705882353,
                b: 0.6196078431372549,
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.9333333333333333,
                g: 0.9411764705882353,
                b: 0.6196078431372549,
            });
            
            GSAP.to(this.sunLight, {
                intensity: 1.5,
            })
        }
    }

    resize() {

    }

    update() {
        
    }
}