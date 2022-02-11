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
        this.pointLight = null
        this.xPosition = xPosition
        this.zPosition = zPosition
        this.canRotate = true
        this.isClickable = false
        this.focusedObject = null
        this.cameraPositionBefore = new THREE.Vector3()

        //setup
        let x = 4
        let middleX = x * 0.5
        let z = x * 0.87
        let middleZ = z * 0.5
        
        this.setSun()

        this.namsan = new Building(- middleX, - middleZ, this.resources.items.namsanModel, "Namsan")
        this.campus = new Building(middleX, - middleZ, this.resources.items.campusModel, "Campus")
        this.business = new Building(0, middleZ, this.resources.items.businessModel, "Business")

        this.group = new THREE.Group()
        this.group.position.set(0, -this.window.getTopWorldPosition(3) - this.camera.height/4, 0)

        this.group.add(this.namsan.model, this.campus.model, this.business.model)
        this.scene.add(this.group)

        this.allObjects = []
        
        this.group.traverse((child) => 
        {
            this.allObjects.push(child)
        })

        this.popups = {
            "master" : { 
                'element' : document.getElementById("master"),
                'building' : this.campus
            },
            "dulcac" : {
                'element' : document.getElementById("dulcac"),
                'building' : this.namsan
            },
            "poei" : {
                'element' : document.getElementById("poei"),
                'building' : this.business
            }
        }

    }


    setSun()
    {
        const geometry = new THREE.SphereGeometry(0.5, 32, 16)
        const material = new THREE.MeshBasicMaterial( {color: 0xffff00 })
        this.sun = new THREE.Mesh(geometry, material)
        this.sun.position.set(0, -this.window.getTopWorldPosition(3) + 1, 0)
        this.scene.add(this.sun)
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
        for (let p in this.popups)
        {
            this.popups[p]['building'].stopRotation()
        }

    }

    closePopup()
    {
        this.camera.instance.position.copy(this.cameraPositionBefore)
        this.camera.isNotFocused = true
        this.focusedObject = null
        this.isClickable = true
        this.window.html.style.background = this.window.cssVariables.getPropertyValue('--background-color')

        for (let p in this.popups)
        {
            this.popups[p]['building'].show()
        }
    }

    hasBeenClicked()
    {
        this.raycaster.setFromCamera(this.window.mouseVector.clone(), this.camera.instance);
        var intersects = this.raycaster.intersectObjects(this.allObjects);

        if (intersects.length > 0) {
            
            // this.stopRotation()
            
            for(const intersect of intersects)
            {
                switch (intersect.object.name) {
                    case 'Namsan':
                        this.displayText('dulcac', intersect.object);
                        break;
                    case 'Campus':
                        this.displayText("master", intersect.object)
                    break;
                    case 'Business':
                        this.displayText('poei', intersect.object);
                        break;
                    }
            }

        } else {
            this.canRotate = true
            for (let p in this.popups)
            {
                this.popups[p]['building'].canRotate = true
            }

        }
    }
    
    displayText(section, object = none)
    {
        this.camera.isNotFocused = false
        this.focusedObject = object
        this.cameraPositionBefore.setFromMatrixPosition(this.camera.instance.matrixWorld);
        this.window.html.style.background = 'white'
        this.isClickable = false
        
        for (let p in this.popups)
        {
            this.popups[p]['element'].style.display = "none";
            this.popups[p]['building'].hide()
        }

        this.popups[section]['element'].style.display = "block";
        this.popups[section]['building'].show()
    }

    isVisible()
    {
        if(this.window.educationScrollPercent > 50 && this.window.educationScrollPercent < 150)
            return true
        else
            return false
    }

    showGroup()
    {
        if(this.camera.isNotFocused)
        {
            this.group.visible = true
            this.rotate()
        
            for (let p in this.popups)
            {
                this.popups[p]['building'].update()
            }
    
            this.isClickable = true
        }

    }

    hideGroup()
    {

        this.group.visible = false
        this.isClickable = false
    }



    update()
    {
        if (this.isVisible())
            this.showGroup()
        else
            this.hideGroup()

        if(this.pointLight)
        {
            var position = new THREE.Vector3();
            position.setFromMatrixPosition(this.group.matrixWorld);
            this.pointLight.position.copy(position)
            this.pointLight.position.y += 2
        }

        if(!this.camera.isNotFocused && this.focusedObject!=null)
        {
            var position = new THREE.Vector3();
            position.setFromMatrixPosition(this.focusedObject.matrixWorld);
            position.z += 5
            this.camera.instance.position.copy(position)
        }
    
    }
}