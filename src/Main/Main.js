import Sizes from "./Utils/Sizes.js"
import Time from "./Utils/Time.js"
import Camera from "./Camera.js"
import * as THREE from 'three'
import Renderer from "./Renderer.js"
import World from "./World/World.js"
import Resources from "./Utils/Resources.js"
import sources from "./sources.js"
import Debug from "./Utils/Debug.js"
import Window from "./Utils/Window"

let instance = null

export default class Main
{
    constructor(canvas)
    {
        if(instance)
        {
            return instance
        }
        
        instance = this

        //global access
        window.main = this

        //options
        this.canvas = canvas

        //setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.window = new Window()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.world = new World()
        this.camera = new Camera()
        this.renderer = new Renderer()
        
        //sizes resize event
        this.sizes.on('resize', () => 
        {
            this.resize()
        })

        //time tick event
        this.time.on('tick', () => 
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }
}