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
        this.startPosition = - this.main.camera.width/2
        this.endPosition = this.main.camera.width/2
        this.animations = [[0,50], [51, 101]]
        
        this.animationScripts.push({
            start: this.animations[0][0],
            end: this.animations[0][1],
            func: () => {
                this.model.position.x = this.lerp(this.startPosition, 0, this.scalePercent(this.animations[0][0], this.animations[0][1]))
            },
        })

        this.animationScripts.push({
            start: this.animations[1][0],
            end: this.animations[1][1],
            func: () => {
                this.model.position.x = this.lerp(0, this.endPosition, this.scalePercent(this.animations[1][0], this.animations[1][1]))
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
        this.model.position.y = - this.yPosition * this.world.objectDistance + 2
        this.model.position.x = - this.main.camera.width/2
        this.scene.add(this.model)
    }
    
 
    update()
    {  
        this.playScrollAnimations()
    }
}