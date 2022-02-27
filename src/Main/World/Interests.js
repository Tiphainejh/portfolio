import Main from "../Main.js";
import Building from "./Building";
import * as THREE from 'three'
import Plane from "./Plane.js";
import Particles from "./Particles.js";

export default class Interests
{
    constructor()
    {
        this.main = new Main()
        this.scene = this.main.scene
        this.resources = this.main.resources
        this.time = this.main.time
        this.debug = this.main.debug
        this.window = this.main.window
        this.camera = this.main.camera
        this.world = this.main.world
        this.environment = this.world.environment
        this.raycaster = new THREE.Raycaster();
        this.pointLight = null

        //setup
        this.plane = new Plane(this.window.getTopWorldPosition(4))
        this.particles = new Particles(this.window.getTopWorldPosition(4))

    }

    isVisible()
    {
        if(this.window.interestsSectionScrollPercent > 0 && this.window.interestsSectionScrollPercent < 150)
            return true
        else
            return false
    }


    showBackground()
    {
        var color = this.window.cssVariables.getPropertyValue('--background-color')
        var rgb = color.match(/\d+/g);        
        const y = 1 + (this.window.interestsSectionScrollPercent) / 7
        const [r, g, b] = [rgb[0]/y, rgb[1]/y, rgb[2]/y].map(Math.round)
        this.window.html.style.background = `rgb(${r}, ${g}, ${b})`
    }


    hideBackground()
    {
        this.window.html.style.background = this.window.cssVariables.getPropertyValue('--background-color')
    }



    update()
    {
        if (this.plane)
            this.plane.update()

        if (this.isVisible())
        {
            this.showBackground()
            this.particles.particles.visible = true

        }
        else
        {
            this.hideBackground()
            this.particles.particles.visible = false
        }

        if(this.pointLight)
        {
            var position = new THREE.Vector3();
            position.setFromMatrixPosition(this.group.matrixWorld);
            this.pointLight.position.copy(position)
            this.pointLight.position.y += 2
        }

      
    
    }
}