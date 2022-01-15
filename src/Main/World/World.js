import Main from "../Main.js";
import Environment from "./Environment.js";
import Brain from "./Brain.js";
import Torus from "./Torus.js";

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
        this.container_sections = document.getElementsByClassName("container_section")
        this.objectDistance = 4

        //wait for resources
        this.resources.on('ready', () => 
        {
            //setup
            this.brain = new Brain()
            for (var i = 0; i < this.nTorus; i ++ ) {
                this.sectionTorus.push(new Torus(this.getTopPosition(i)))
            }

            this.environment = new Environment()  
        })
         
    }

    getTopPosition(i)
    {
        var element = this.container_sections[i]
        var topPosition = (element.getBoundingClientRect().top + this.window.scrollY) / this.sizes.height;
        return topPosition
    }

    update()
    {
        if (this.brain)
            this.brain.update()

        if(this.sectionTorus){
            for (var torus of this.sectionTorus)
            {
                torus.update()
            }
        }
    }
}