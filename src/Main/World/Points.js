import Main from "../Main.js";
import { Raycaster } from "three";

export default class Points
{
    constructor(points)
    {
        this.main = new Main()
        this.scene = this.main.scene
        this.resources = this.main.resources
        this.window = this.main.window
        this.sizes = this.main.sizes
        this.world = this.main.world
        this.education = this.world.education
        
        this.raycaster = new Raycaster()

        this.points = points

        this.camera = this.main.camera

        for (const point of this.points)
        {
            const name = point.element.className.split(' ')[1].split("-")[0]

            switch (name) {
                case 'namsan':
                case 'campus':
                case 'business':
                    this.education[name].points.push(point)
                    break;
                case 'education':
                    this.education.point = point
                    break;
                }
            // switch (point.element.className.split(' ')[1]) {
            //     case 'namsan':
            //         this.education.namsan.points.push(point)
            //         break;
            //     case 'master':
            //     case 'bachelor':
            //         this.education.campus.points.push(point)
            //     break;
            //     case 'business':
            //         this.education.business.points.push(point)
            //         break;
            //     }
        }
    }


    update()
    {   
        if(this.camera)
        {
            for (const p of this.points)
            {

                if (p.isVisible)
                {
                    const screenPosition = p.position.clone()
                    screenPosition.project(this.camera.instance)
                
                    this.raycaster.setFromCamera(screenPosition, this.camera.instance)
                    const intersect = this.raycaster.intersectObjects(this.scene.children, true)
                    switch (intersect.length) {
                        case 0:
                            p.element.classList.add('visible')
                            break;
                    
                        default:
                            (intersect[0].distance < p.position.distanceTo(this.camera.instance.position)) ? p.element.classList.remove('visible') : p.element.classList.add('visible')
                            break;
                    }

                    const translateX = screenPosition.x * this.sizes.width * 0.5
                    const translateY = - screenPosition.y * this.sizes.height * 0.5 + this.window.scrollY 
    
                    p.element.style.transform = `translate(${translateX}px, ${translateY}px)`
                }


            }
        }
    }
}