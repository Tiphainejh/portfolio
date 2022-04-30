import Main from "../Main.js";
import * as THREE from 'three'

export default class Skills
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
        this.light = null
        this.hollo = null

        //debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('skills')
        }
       
        //setup
        this.resource = this.resources.items.skillsModel
        this.images = {
            'french' : this.resources.items.french,
            'korean' : this.resources.items.korean,
            'english' : this.resources.items.english,
            'javascript' : this.resources.items.javascript,
            'php' : this.resources.items.php,
            'python' : this.resources.items.python,
            'symfony' : this.resources.items.symfony,
            'scikit' : this.resources.items.scikit,
            'threejs' : this.resources.items.threejs
        }

        this.setModel()
        this.model.position.y = - this.yPosition - 1
        this.model.position.x = -4.5
        this.setAnimations()

    }

    changeImage(imageName)
    {
        this.hollo.visible = true
        this.hollo.material.map = this.images[imageName]
        this.hollo.material.needsUpdate = true
    }

    setAnimations()
    {
        this.animations = this.resource.animations
        this.mixer = new THREE.AnimationMixer( this.model );
        this.playAnimations()
    }

    playAnimations()
    {
        this.animations.forEach( ( clip ) => {
            this.mixer.clipAction( clip ).play();
        })
    }


    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.2, 0.2, 0.2)
        this.model.castShadow = true;
        this.model.receiveShadow = true;
        this.scene.add(this.model)
        
        this.model.traverse((child) => 
        {
            if (child instanceof THREE.Mesh)
            {   
                console.log(child.name)       

                if(child.material.name == 'Hologram-object.001')
               {
                    const loader =  new THREE.TextureLoader
                    const material = new THREE.MeshBasicMaterial({
                    map: loader.load('textures/korean_hollo.png'),
                    transparent: true,
                    opacity: 0.4
                    });
                    child.material = material
                    child.material.side = THREE.DoubleSide;
                    child.visible = false
                    this.hollo = child
                }
                else {
                    child.castShadow = true
                    child.receiveShadow = true
                }
                if(child.material.name == 'Metalic')
                {
                    const material = new THREE.MeshStandardMaterial({
                        color: 0xfcc742,
                        emissive: 0x111111,
                        metalness: 0.9,
                        roughness: 0.4,
                      });
                    child.material = material
                   
                }
            }
        })
    }

  

    update()
    {
        if ( this.mixer ) this.mixer.update( this.time.delta * 0.0012 );
    }
}