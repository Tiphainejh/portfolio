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
        
        this.focusedObject = null
        this.isClosing = false
        
        
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
        //this.group.rotation.y = this.group.rotation.y #TODO
        this.canRotate = false
        for (let p in this.popups)
        {
            this.popups[p]['building'].stopRotation()
        }

    }

    closePopup()
    {
        this.focusedObject = null

        this.window.html.style.background = this.window.cssVariables.getPropertyValue('--background-color')
        this.isClosing = true
        var startTime = new Date().getTime();
        var interval = setInterval(() => {
            if(new Date().getTime() - startTime > 500){
                clearInterval(interval);
                return;
            }
            this.camera.instance.position.lerp(this.camera.beforePosition, 0.1)
        }, 20); 

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
            
                switch (intersects[0].object.name) {
                case 'Namsan':
                    this.displayText('dulcac', this.scene.getObjectByName( "Ground" ))
                    break;
                case 'Campus':
                    this.displayText("master", this.scene.getObjectByName( "Ground002" ))
                break;
                case 'Business':
                    this.displayText('poei', this.scene.getObjectByName( "Ground003" ))
                    break;
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
        console.log("before pos ")
        this.camera.beforePosition.setFromMatrixPosition(this.camera.instance.matrixWorld);

        this.focusedObject = object

        this.window.html.style.background = 'white'
        
        for (let p in this.popups)
        {
            this.popups[p]['element'].style.display = "none";
            this.popups[p]['building'].hide()
        }

        this.popups[section]['element'].style.display = "block";
        this.popups[section]['building'].show()
    }

    isVisible(min, max)
    {
        return (this.window.educationSectionScrollPercent > min && this.window.educationSectionScrollPercent < max)
    }

    showGroup()
    {
        if(this.focusedObject == null)
        {
            this.group.visible = true
            this.rotate()
        
            for (let p in this.popups)
            {
                this.popups[p]['building'].update()
            }
    
        }

    }

    hideGroup()
    {
        this.group.visible = false
    }

    changeSunColor()
    {
        var yellow = [255, 255, 0]
        var white = [255, 255, 155]
        const y = (this.window.educationSectionScrollPercent - 100) / 100
        const [r, g, b] = [this.lerp(yellow[0], white[0], y), this.lerp(yellow[1], white[1], y), this.lerp(yellow[2], white[2], y)].map(Math.round)
        this.sun.material.color.set(new THREE.Color(`rgb(${r}, ${g}, ${b})`))
    }

    lerp(x, y, a)
    {
        return (1 - a) * x + a * y
    }



    update()
    {
        if (this.isVisible(50, 150))
        {
            this.showGroup()

        }
        else
            this.hideGroup()

        if (this.isVisible(100, 200))
        {
            this.changeSunColor()
            var position = new THREE.Vector3();
            position.setFromMatrixPosition(this.camera.instance.matrixWorld);
            position.z = 0
            position.y += 1
            this.sun.position.copy(position)
        }
        else
        {
        }

        var position = new THREE.Vector3();
        
        if(this.pointLight)
        {
            position.setFromMatrixPosition(this.group.matrixWorld);
            this.pointLight.position.copy(position)
            this.pointLight.position.y += 2
        }

        if(this.focusedObject!=null)
        {
            position.setFromMatrixPosition(this.focusedObject.matrixWorld);
            position.z += 4
            position.y += 1
            this.camera.instance.position.lerp(position, 0.1)
        }
    
    }
}