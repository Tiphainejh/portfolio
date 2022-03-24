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

        //setup
        this.resource = this.resources.items.bonfireModel


        this.setModel()
        this.setAnimations()
    }

    setModel()
    {
        this.model = this.resource.scene
        let scale = 0.2
        this.model.scale.set(scale, scale, scale)
        this.model.position.y = - this.yPosition - 1.5
        this.model.rotation.y = Math.PI /2
        this.scene.add(this.model)

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
        if ( this.mixer ) this.mixer.update( this.time.delta * 0.0012 );
    }
}