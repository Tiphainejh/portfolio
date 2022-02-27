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
        this.imageDuration = 0
        this.images = {
            0 : [this.resources.items.image0, this.resources.items.image1],
            1 : [this.resources.items.sphereRadius, this.resources.items.image3],
            2 : [this.resources.items.image4, this.resources.items.image5],
            3 : [this.resources.items.image6, this.resources.items.image7]
        }

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
        this.model.position.x = this.xPosition
        this.model.position.y = - this.yPosition - this.height/2 
        this.isClickable = false
        this.isClicked = false
        this.originalSpacebarColor =  new THREE.Color(0.5, 0.5, 0.4);
        this.isPlayingVideo = false

    }

    setModel()
    {
        this.model = this.resource.scene
        this.screen = this.model.children[2]
        this.model.scale.set(0.045, 0.045, 0.045)
        this.model.castShadow = true;
        this.model.receiveShadow = true;
        this.scene.add(this.model)
    }

    changeColor(element, color)
    {
        element.material.color.set(color)
    }
    
    changeImage(element, index)
    {
        if(this.isPlayingVideo == true)
        {
            clearInterval(this.world.displayImages) 
            this.world.displayImages = window.setInterval(() =>
            {
                this.isPlayingVideo = false
                this.changeImage(this.getChildByName('screen'), this.window.slideIndex)
            }, 1000)
        }

        const image = this.images[index][this.currentImage]
        if (image instanceof THREE.VideoTexture)
        {
            const videoID = image.image.id
            const video = document.getElementById(videoID)


            if(video.played.length === 0 || video.ended)
            {
                clearInterval(this.world.displayImages) 
                this.isPlayingVideo = true
                video.play()
                window.setTimeout(() =>
                {
                    clearInterval(this.world.displayImages) // in case the function is called before we got here
                    this.world.displayImages = window.setInterval(() =>
                    {  
                        this.isPlayingVideo = false
                        this.changeImage(this.getChildByName('screen'), this.window.slideIndex)
                    }, 1000)
                }, video.duration * 1000)
 
            }
            
        }
        
        element.material.map = image
        element.material.needsUpdate = true
        this.currentImage = (this.currentImage + 1)%this.images[index].length
    }

    resize()
    {
        this.xPosition = this.main.camera.width/4
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
    isHovered()
    {
        this.raycaster.setFromCamera(this.window.mouseVector.clone(), this.camera.instance);
        
        // calculate objects intersecting the picking ray
        var intersects = this.raycaster.intersectObjects(this.model.children);
        if (intersects.length > 0) {
            for(const intersect of intersects)
            {
                if( intersect.object.userData.name == 'spacebar')
                {
                    this.changeColor(this.getChildByName('spacebar'), 0xff0000)
                    this.isClickable = true
                }
            }

        } else {
            this.changeColor(this.getChildByName('spacebar'), this.originalSpacebarColor)
            this.isClickable = false
        }
    }
    
    checkScrollPercent()
    {
        if(this.window.workSectionScrollPercent > 0 && this.window.workSectionScrollPercent < 100)
        {
            console.log("ok")
            this.pointLight.intensity = 10
            this.isHovered()
        }
        else
        {

            this.pointLight.intensity = 0

        }
    }

    update()
    {
        this.boxHelper.update()
        
        if(this.camera && this.resources.sceneReady && !this.isClicked)
        {
            this.checkScrollPercent()
        }
        
    }
}