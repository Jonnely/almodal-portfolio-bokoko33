import * as THREE from "three";
import EventEmitter from "events";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"

export default class Resources extends EventEmitter {
    constructor(assets) {
        super();
        this.assets = assets;

        this.items = {};
        this.queue = this.assets.length;
        this.loaded = 0;
        
        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.dracoLoader.setDecoderPath("/draco/");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
    }

    startLoading() {
        for(const asset of this.assets) {
            if(asset.type==="glbModel") {
                this.loaders.gltfLoader.load(asset.path, (file)=> {
                    this.singleAssetLoaded(asset, file);
                })
            } else if(asset.type === "videoTexture") {
                this.video = {};
                this.videoTexture = {};

                this.video[asset.name] = document.createElement("video");
                this.video[asset.name].src= asset.path;
                this.video[asset.name].muted = true;
                this.video[asset.name].playsInLine = true;
                this.video[asset.name].autoplay = true;
                this.video[asset.name].loop = true;
                this.video[asset.name].play();

                this.videoTexture[asset.name] = new THREE.VideoTexture(
                    this.video[asset.name]
                );

                this.videoTexture[asset.name].wrapS = THREE.RepeatWrapping;
                this.videoTexture[asset.name].repeat.x = -1;

                this.videoTexture[asset.name].flipY = true;
                this.videoTexture[asset.name].minFilter = THREE.NearestFilter;
                this.videoTexture[asset.name].mageFilter = THREE.NearestFilter;
                this.videoTexture[asset.name].generateMipmaps = false;
                // sRGBEncoding => sRGBColorSpace
                this.videoTexture[asset.name].colorSpace = THREE.SRGBColorSpace;
                this.singleAssetLoaded(asset, this.videoTexture[asset.name]);
            }
        }
    }

    singleAssetLoaded(asset, file) {
        this.items[asset.name] = file;
        this.loaded++;

        if(this.loaded === this.queue) {
            this.emit("ready");
        }
    }
}