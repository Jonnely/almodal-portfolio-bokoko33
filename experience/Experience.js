import * as THREE from 'three';
import Camera from './Camera';
import Sizes from "./utils/Sizes";
import Renderer from './Renderer';
import Time from './utils/Time';

import World from './world/World';
import Resources from './utils/Resources';
import assets from './utils/Assets';
import Theme from './Theme';
import Preloader from './Preloader';
import Controls from './world/Controls';

export default class Experience {
    static instance;
    constructor(canvas) {
        if(Experience.instance) {
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.theme = new Theme();
        this.World = new World();
        this.preloader = new Preloader();


        this.preloader.on("enablecontrols", ()=> {
            this.controls = new Controls();
            document.querySelector(".page").style.overflow = "visible";
            document.querySelector("body").style.overflow = "visible";
        })

        this.sizes.on("resize", ()=> {
            this.resize();
        })

        this.time.on("update", ()=> {
            this.update()
        })
    }

    resize() {
        this.camera.resize()
        this.World.resize();
        this.renderer.resize();
    }

    update() {
        this.preloader.update();
        this.camera.update()
        this.World.update();
        this.renderer.update();
    }
}