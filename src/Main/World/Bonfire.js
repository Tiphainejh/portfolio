import Main from "../Main.js";
import * as THREE from 'three'

export default class Bonfire
{
    constructor(yPosition)
    {
        this.main = new Main()
        this.scene = this.main.scene
        this.resources = this.main.resources
        this.time = this.main.time
        this.debug = this.main.debug
        this.yPosition = yPosition
        this.window = this.main.window
        this.camera = this.main.camera
        //setup
        this.resource = this.resources.items.bonfireModel
        this.fireLight = null
        this.lanternLight = null
        this.raycaster = new THREE.Raycaster();
        this.isDisplayed = false
        this.setModel()
        this.setAnimations()
        this.allObjects = []
        
        this.model.traverse((child) => 
        {
            this.allObjects.push(child)
        })
        
        this.texts = {
            "Canvas" : { 
                'element' : document.getElementById("interest_canvas")
            },
            "Run" : {
                'element' : document.getElementById("interest_run")
            },
            "Yoga" : {
                'element' : document.getElementById("interest_yoga")
            },
            "Yarn" : {
                'element' : document.getElementById("interest_yarn")
            }
        }
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.traverse((child) => 
        {
            if (child instanceof THREE.Mesh)
            {   
                if (child.name == "Fire")
                {
                    this.fireLightPosition = child.position   
                }

                if((child.name.startsWith("Run")) || (child.name.startsWith("yoga")) || (child.name.startsWith("Canvas")) || (child.name.startsWith("yarn")))
                {
                    child.castShadow = true
                }
         
                child.receiveShadow = true
            }

          })
        let scale = 0.2
        this.model.scale.set(scale, scale, scale)
        this.model.position.y = - this.yPosition - 1.3
        this.model.rotation.y = Math.PI /2
        this.scene.add(this.model)

    }

    onHover()
    {
        this.raycaster.setFromCamera(this.window.mouseVector.clone(), this.camera.instance)
        var intersects = this.raycaster.intersectObjects(this.allObjects, true)
        if (intersects.length > 0) {
            document.body.style.cursor = "pointer";
            var name = intersects[0].object.name
            if(name.startsWith("Run"))
            {
                this.displayText('Run')
            }
                
            else if(name.startsWith("yoga"))
            {
                this.displayText('Yoga')
            }
            
            else if(name.startsWith("Canvas"))
            {
                this.displayText("Canvas")
            }
            
            else if(name.startsWith("yarn"))
            {
                this.displayText("Yarn")
            }
                
                
        } else {
            document.body.style.cursor = "default";
        }
    }

    displayText(section)
    {
        this.isDisplayed = true
        for (let p in this.texts)
        {
            this.texts[p]['element'].style.display = "none";
        }

        this.texts[section]['element'].style.display = "block";
        window.setTimeout(() => {this.isDisplayed = false}, 500)
    }

    setAnimations()
    {
        this.animations = this.resource.animations
        this.mixer = new THREE.AnimationMixer( this.model );
        this.animations.forEach( ( clip ) => {
            if (clip.name.includes("Jump"))
            {
                const index = this.animations.indexOf(clip);
                if (index > -1) {
                    this.animations.splice(index, 1)
                }
            }
        })
        this.animations.forEach( ( clip ) => {
            if (clip.name.includes("Idle"))
            {
                const index = this.animations.indexOf(clip);
                if (index > -1) {
                    this.animations.splice(index, 1)
                }
            }
        })

        this.animations.forEach( ( clip ) => {
        if (clip.name.includes("Jump") || clip.name.includes("Idle"))
        {
            const index = this.animations.indexOf(clip);
            if (index > -1) {
                this.animations.splice(index, 1)
            }
        }
            this.mixer.clipAction( clip ).play();
        })
    }

    stopAnimations()
    {
        this.animations.forEach( ( clip ) => {
            this.mixer.clipAction( clip ).stop();
        })
    }

    playAnimations()
    {
        this.animations.forEach( ( clip ) => {
            this.mixer.clipAction( clip ).play();
        })
    }

  

    update()
    {
        if ( this.mixer ) {this.mixer.update( this.time.delta * 0.0012 );}
        if(!this.isDisplayed)
            this.onHover()
        // if (this.fireLight)
        // {
        //     window.setInterval(() =>
        //     {
        //         this.fireLight.intensity = this.randomInRange(2, 3)
        //     }, 2000)
            
        // }
    }
}