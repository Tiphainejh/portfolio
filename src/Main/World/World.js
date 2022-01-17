import Main from "../Main.js";
import Environment from "./Environment.js";
import Brain from "./Brain.js";
import Torus from "./Torus.js";
import Plane from "./Plane.js";

export default class World
{
    constructor()
    {
        this.main = new Main()
        this.scene = this.main.scene
        this.resources = this.main.resources
        this.window = this.main.window
        this.sizes = this.main.sizes
        this.nTorus = 5
        this.sectionTorus = []
        this.objectDistance = 4
        
        //wait for resources
        this.resources.on('ready', () => 
        {
            //setup
            //this.brain = new Brain()
            this.plane = new Plane(this.window.getTopPosition(4))

            for (var i = 0; i < this.nTorus; i ++ ) {
                this.sectionTorus.push(new Torus(this.window.getTopPosition(i)))
            }

            this.environment = new Environment()  
        })
         
    }

    interests()
    {       
        if (this.plane)
            this.plane.animation.actions.current.play()
    }

   
    

    update()
    {
        if (this.brain)
            this.brain.update()
        
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