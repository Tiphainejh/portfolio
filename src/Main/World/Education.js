import Main from "../Main.js";
import Building from "./Building";
import * as THREE from 'three'

export default class Education
{
    constructor(xPosition, zPosition)
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

        this.xPosition = xPosition
        this.zPosition = zPosition
        this.canRotate = true
        
        //setup
        const x = 25
        const middleX = x * 0.5
        const z = x * 0.87
        const middleZ = z * 0.5
        
        this.namsan = new Building(- middleX, - middleZ, this.resources.items.namsanModel, "Namsan")
        this.campus = new Building(middleX*0.5, - middleZ, this.resources.items.campusModel, "Campus")
        this.business = new Building(0, middleZ, this.resources.items.businessModel, "Business")
        this.group = new THREE.Group()
        this.group.position.set(0, -this.window.getTopWorldPosition(3) - this.camera.height, -30)
        this.group.add(this.namsan.model, this.campus.model, this.business.model)
        this.scene.add(this.group)

        this.buildings = [this.namsan, this.campus, this.business]
        this.allObjects = []
        this.group.traverse((child) => 
        {
            this.allObjects.push(child)
        })

    }

    rotate()
    {
        if(this.canRotate)
            this.group.rotation.y = this.time.elapsed * 0.00012
    }

    stopRotation()
    {
        this.group.rotation.y = this.group.rotation.y
        this.canRotate = false
        for (const building of this.buildings)
        {
            building.stopRotation()
        }
    }


    isHovered()
    {
        if(this.camera && this.resources.sceneReady)
        {
            this.raycaster.setFromCamera(this.window.mouseVector.clone(), this.camera.instance);
            var intersects = this.raycaster.intersectObjects(this.allObjects);

            if (intersects.length > 0) {
                
                this.stopRotation()
                
                for(const intersect of intersects)
                {
                    switch (intersect.object.name) {
                        case 'Namsan':
                          console.log('Namsan');
                          break;
                        case 'Campus':
                            console.log("Campus")
                        break;
                        case 'Business':
                          console.log('Business');
                          break;
                        default:
                          console.log(`Sorry, we are out of ${expr}.`);
                      }
                }

            } else {
                this.canRotate = true
                for (const building of this.buildings)
                {
                    building.canRotate = true
                }
            }
        }
    }

    checkScrollPercent()
    {
        if(this.window.educationScrollPercent > 50 && this.window.educationScrollPercent < 150)
        {
            this.group.visible = true
            for (const building of this.buildings)
            {
                building.pointLight.intensity = 10
            }
            this.isHovered()
        }
        else
        {
            this.group.visible = false
            for (const building of this.buildings)
            {
                building.pointLight.intensity = 0
            }

        }
    }



    update()
    {

        this.checkScrollPercent()

        this.rotate()
        
        for (const building of this.buildings)
        {
            building.update()
        }

    }
}