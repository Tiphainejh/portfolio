import Main from "../Main.js";
import Environment from "./Environment.js";
import Computer from "./Computer.js";
import Overlay from "./Overlay.js";
import * as THREE from 'three'
import Education from "./Education.js";
import Interests from "./Interests.js";

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
            //
            //this.tr = new TR()

            
            this.computer = new Computer(this.window.getTopWorldPosition(1))
            this.education = new Education()
            this.interests = new Interests()

            this.displayImages = window.setInterval(() =>
            {
                this.computer.changeImage(this.computer.getChildByName('screen'), this.window.slideIndex)
            }, 3000)


            this.environment = new Environment()  
            if (this.interests.bonfire.fireLight)
            {
                window.setInterval(() =>
                {
                    this.interests.bonfire.fireLight.intensity = this.randomInRange(200, 350) / 100;
                    this.interests.bonfire.lanternLight.intensity = this.randomInRange(90, 110) / 100;
                }, 1000)
                
            }
        
           
        })
         
    }

    randomInRange(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


    resize()
    {
        if (this.computer)
            this.computer.resize()
    }

    update()
    {   
        
        
        if(this.interests)
            this.interests.update()

        if(this.environment)
            this.environment.update()
        

        if(this.tr)
            this.tr.update()

        if (this.brain)
            this.brain.update()
        
        if (this.computer)
            this.computer.update()
        


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