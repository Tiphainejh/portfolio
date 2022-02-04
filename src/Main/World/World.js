import Main from "../Main.js";
import Environment from "./Environment.js";
import Brain from "./Brain.js";
import Torus from "./Torus.js";
import Plane from "./Plane.js";
import Computer from "./Computer.js";
import Particles from "./Particles.js";
import Overlay from "./Overlay.js";
import * as THREE from 'three'
import Points from "./Points.js";
import TR from "./TR.js";
import Education from "./Education.js";

export default class World
{
    constructor()
    {
        this.main = new Main()
        this.scene = this.main.scene
        this.resources = this.main.resources
        this.window = this.main.window
        this.sizes = this.main.sizes
        this.debug = this.main.debug
        this.time = this.main.time
        this.overlay = new Overlay()
        this.nTorus = 5
        this.sectionTorus = []
        
        //debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('world')
        }

        //wait for resources
        this.resources.on('ready', () => 
        {

            //setup
            //this.particles = new Particles(this.window.getTopWorldPosition(1))
            //this.tr = new TR()

            
            this.computer = new Computer(this.window.getTopWorldPosition(1))
            this.plane = new Plane(this.window.getTopWorldPosition(4))
            this.education = new Education()
            //this.sectionTorus.push(new Torus(this.window.getTopWorldPosition(0)))
            //this.sectionTorus.push(new Torus(this.window.getTopWorldPosition(3)))
            this.sectionTorus.push(new Torus(this.window.getTopWorldPosition(4)))

            this.pointsPositions = [
                {
                    position: new THREE.Vector3(this.computer.model.position.x-0.2, this.computer.model.position.y+1,this.computer.model.position.z-1),
                    element: document.querySelector('.point-1')
                }
            ]
            this.points = new Points(this.pointsPositions)

            this.displayImages = window.setInterval(() =>
            {
                this.computer.changeImage(this.computer.getChildByName('screen'), this.window.slideIndex)
            }, 1000)


            this.environment = new Environment()  

            if(this.debug.active)
            {
                this.debugFolder
                .add(this.points.points[0].position, 'x')
                .name('pointX')
                .min(-10)
                .max(10)
                .step(0.25)

                this.debugFolder
                .add(this.points.points[0].position, 'y')
                .name('pointY')
                .min(-10)
                .max(10)
                .step(0.25)

                this.debugFolder
                .add(this.points.points[0].position, 'z')
                .name('pointZ')
                .min(-10)
                .max(10)
                .step(0.25)
            }
        })
         
    }

    interests()
    {       
        if (this.plane)
            this.plane.animation.actions.current.play()
    }

    resize()
    {
        if (this.computer)
            this.computer.resize()
    }

    update()
    {   
        if(this.points)
            this.points.update()
        
        if(this.environment)
            this.environment.update()

        if(this.tr)
            this.tr.update()

        if (this.particles)
            this.particles.update()

        if (this.brain)
            this.brain.update()
        
        if (this.computer)
            this.computer.update()
        
        if (this.plane)
            this.plane.update()

        if(this.sectionTorus){
            for (var torus of this.sectionTorus)
            {
                torus.update()
            }
        }
        
       
        if(this.education)
        {
            this.education.update()
        }

    }
}