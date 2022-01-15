import Main from './Main.js'
import * as THREE from 'three'

export default class Renderer
{
    constructor()
    {
        this.main = new Main()
        this.canvas = this.main.canvas
        this.camera = this.main.camera
        this.sizes = this.main.sizes
        this.scene = this.main.scene

        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha:true
        })
        
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.width)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }
    
    update()
    {
        this.instance.render(this.scene, this.camera.instance)
    }
}