import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.112.1/build/three.module.js';
import {controls} from './js/controls.js';
import {terrain} from './js/terrain.js';
import {graphics} from './js/graphics.js'
//citation for tutorial - https://github.com/simondevyoutube/ProceduralTerrain_Part3/tree/master

let _APP = null;

class Procedural_terrain {
    constructor(){
        this.init();
    }
    init(){
        this.graphics = new graphics.Graphics(this);
        //declare the terrain graphics
        this.frame_prev = null; //animation frame
        this.fps_min = 0.1;
        this.instances = {}; //chunk entities
        this.oninit();
        this.get_frame();
    }

    //rendering functions can be replaced later

    get_frame(){
        request((t) => {
            if(this.frame_prev == null){
                this.frame_prev = t;
            }
            this.render(t - this.frame_prev);
            this.frame_prev = t;
        });
    }

    steps(secs) {
        for (let k in this.instances) {
            this.instances[k].Update(time);
        }
    }

    render(time ){
        const r_time = Math.min(time * 0.001, this.fps_min);
        this.onstep(r_time);
        this.steps(r_time);
        this.graphics.render(r_time);
        this.get_frame();
    }

    oninit(){
        this.fpcamera = new THREE.Object3D();
        this.fpcamera.position.set(475, 75, 900); //replace tutorial values later

        this.instances['_terrain'] = new terrain.TerrainChunkManager({
            camera: this.fpcamera,
            scene: this.graphics.Scene,
        });

        this.instances['_controls'] = new controls.FPSControls(
            {
                scene: this.graphics.Scene,
                camera: this.fpcamera
            }
        );

    }

    
}