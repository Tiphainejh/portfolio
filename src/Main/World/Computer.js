import Main from "../Main.js";
import * as THREE from 'three'

export default class Computer
{
    constructor(yPosition)
    {
        this.main = new Main()
        this.scene = this.main.scene
        this.resources = this.main.resources
        this.time = this.main.time
        this.debug = this.main.debug
        this.camera = this.main.camera
        this.world = this.main.world
        this.window = this.main.window
        this.yPosition = yPosition
        this.xPosition = this.main.camera.width/4

        //debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('computer')
        }
       
        //setup
        this.resource = this.resources.items.computerModel
        this.currentImage = 0
        this.images = [this.resources.items.image, this.resources.items.image2]
        this.videos = {"sphereRadius" : this.resources.items.sphereRadius}
        this.colors = [0xff0000, 0x00ff00, 0x0000ff]
        this.currentColor = 0
        this.setModel()
        this.raycaster = new THREE.Raycaster();

        this.box3 = new THREE.Box3();
        this.size = new THREE.Vector3(); 
        this.boxHelper = new THREE.BoxHelper(this.model);
        this.box3.setFromObject(this.boxHelper);        
        this.box3.getSize(this.size);
        this.width = this.size.x
        this.height = this.size.y
        this.model.position.x = this.xPosition //- this.width
        this.model.position.y = - this.yPosition * this.world.objectDistance - this.height/2 
        this.isClickable = false
        this.originalSpacebarColor =  new THREE.Color(0.5, 0.5, 0.4);

    }

    setModel()
    {
        this.model = this.resource.scene
        this.screen = this.model.children[2]
        this.model.scale.set(0.045, 0.045, 0.045)
        //this.model.rotation.y = Math.PI/6
        this.model.castShadow = true;
        this.model.receiveShadow = true;
        this.scene.add(this.model)
    }

    changeColor(index)
    {
        const element = this.model.children[index]
        element.material.color.set(this.colors[this.currentColor])
        this.currentColor = (this.currentColor + 1)%this.colors.length
    }

    changeImage(index)
    {
        const element = this.model.children[index]
        var videoName = Object.keys(this.videos)[this.currentImage] 
        //element.material.map = this.images[this.currentImage] // for images
        element.material.map = this.videos[videoName]

        document.getElementById(videoName).play()
        this.videos[videoName].magFilter = THREE.LinearFilter;
        //this.videos[videoName].minFilter = THREE.NearestFilter;
        element.material.needsUpdate = true
        //this.currentImage = (this.currentImage + 1)%this.images.length
        this.currentImage = (this.currentImage + 1)%Object.keys(this.videos).length
    }

    resize()
    {
        this.xPosition = this.main.camera.width/4
        // this.boxHelper.update()
        // this.box3.getSize(this.size);
        // this.width = this.size.x
        // this.model.position.x = this.xPosition - this.width
        // this.model.position.y = - this.yPosition * this.world.objectDistance - this.height/2 
    }

    getChildByName(name)
    {
        for(const child of this.model.children)
        {
            if(child.userData.name == name)
            {
                return child
            }
        }
    }


    update()
    {
        this.boxHelper.update()
        if(this.camera && this.resources.sceneReady)
        {
            this.raycaster.setFromCamera(this.window.mouseVector.clone(), this.camera.instance);
        
            // calculate objects intersecting the picking ray
            var intersects = this.raycaster.intersectObjects(this.model.children);
            if (intersects.length > 0) {
                for(const intersect of intersects)
                {
                    if( intersect.object.userData.name == 'spacebar')
                    {
                        this.getChildByName('spacebar').material.color.set(0xff0000);
                        this.isClickable = true
                    }
                }

            } else {
                this.getChildByName('spacebar').material.color.set(this.originalSpacebarColor);

                this.isClickable = false
            }
        }
        
    }
}