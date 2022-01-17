import Main from "../Main.js";
import * as THREE from 'three'

export default class Plane
{
    constructor(yPosition)
    {
        this.main = new Main()
        this.scene = this.main.scene
        this.resources = this.main.resources
        this.time = this.main.time
        this.world = this.main.world
        this.window = this.main.window
        this.debug = this.main.debug
        this.yPosition = yPosition
        this.animationScripts = []
    

        //debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('plane')
        }
       
        //setup
        this.resource = this.resources.items.planeModel
        
        this.setModel()
        
        this.animationScripts.push({
            start: 0,
            end: 50,
            func: () => {
                this.model.position.x = this.lerp(- this.main.camera.width/2, 0, this.scalePercent(0, 50))
            },
        })

        this.animationScripts.push({
            start: 51,
            end: 101,
            func: () => {
                this.model.position.x = this.lerp(0, this.main.camera.width/2, this.scalePercent(51, 100))
            },
        })

    }

    lerp(x, y, a)
    {
        return (1 - a) * x + a * y
    }
    
    scalePercent(start, end) {
        return (this.window.scrollPercent - start) / (end - start)
    }
    
    playScrollAnimations() {
        this.animationScripts.forEach((a) => {
            if (this.window.scrollPercent >= a.start && this.window.scrollPercent < a.end) {
                a.func()
            }
        })
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.005, 0.005, 0.005)
        this.model.rotation.y = Math.PI / 2
        this.model.position.y = - this.yPosition * this.world.objectDistance
        
        this.model.position.x = - this.main.camera.width/2
        this.scene.add(this.model)
    }
    
 
    update()
    {  
        this.playScrollAnimations()
    }
}