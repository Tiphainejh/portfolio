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

export default class World
{
    constructor()
    {
        this.main = new Main()
        this.scene = this.main.scene
        this.resources = this.main.resources
        this.window = this.main.window
        this.sizes = this.main.sizes
        this.overlay = new Overlay()
        this.nTorus = 5
        this.sectionTorus = []
        this.objectDistance = 4
        

        //wait for resources
        this.resources.on('ready', () => 
        {

            //setup
            //this.particles = new Particles(this.window.getTopPosition(1))
            this.computer = new Computer(this.window.getTopPosition(1))
            this.plane = new Plane(this.window.getTopPosition(4))
            this.sectionTorus.push(new Torus(this.window.getTopPosition(0)))
            this.sectionTorus.push(new Torus(this.window.getTopPosition(3)))
            this.sectionTorus.push(new Torus(this.window.getTopPosition(4)))

            this.pointsPositions = [
                {
                    position: new THREE.Vector3(this.computer.model.position.x, this.computer.model.position.y,this.computer.model.position.z-3),
                    element: document.querySelector('.point-0')
                },
                {
                    position: new THREE.Vector3(2, -5, -0.6),
                    element: document.querySelector('.point-1')
                },
                {
                    position: new THREE.Vector3(1.55, -1, -0.6),
                    element: document.querySelector('.point-2')
                }
            ]
            this.points = new Points(this.pointsPositions)

            window.setInterval(() =>
            {
                this.computer.changeImage(2)
            }, 1000);

            // window.setInterval(() =>
            // {
            //     this.computer.changeColor(1)
            // }, 1000);

            this.environment = new Environment()  
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
    }
}