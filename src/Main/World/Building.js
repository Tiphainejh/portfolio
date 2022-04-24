import Main from "../Main.js";
import * as THREE from 'three'

export default class Building
{
    constructor(xPosition, zPosition, model, name)
    {
        this.main = new Main()
        this.scene = this.main.scene
        this.resources = this.main.resources
        this.time = this.main.time
        this.debug = this.main.debug
        this.xPosition = xPosition
        this.zPosition = zPosition
        this.canRotate = true

        //setup
        this.resource = model
        this.name = name
        
        
        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        var scale = 0.15
        this.model.scale.set(scale, scale, scale)
        this.model.position.set(this.xPosition, 0, this.zPosition)
        this.model.rotation.y = - Math.PI /2
        
        this.model.traverse((child) => 
        {
            if (child instanceof THREE.Mesh)
            {                
                child.name = this.name
                child.castShadow = true
                child.receiveShadow = true

                if(child.material.name == 'Blue')
                {
                    const material = new THREE.MeshPhysicalMaterial({
                        roughness: 0.06,
                        reflectivity: 0.9,
                        clearcoat: 1,
                        transparent: true,
                        opacity: 0.7,
                        metalness:0.3,
                        color: 0x267494
                    });
                    child.material = material
                   
                }
            }
        })
    }

    hide()
    {
        this.model.traverse((child) => 
        {
            if (child instanceof THREE.Mesh)
            {                
               child.visible = false
            }
        })

    }

    show()
    {
        this.model.traverse((child) => 
        {
            if (child instanceof THREE.Mesh)
            {                
               child.visible = true
            }
        })
    }


    rotate()
    {
        if(this.canRotate)
            this.model.rotation.y = -this.time.elapsed * 0.00012
    }

    stopRotation()
    {
        this.model.rotation.y = this.model.rotation.y
        this.canRotate = false
    }

    update()
    {
        this.rotate()

        var position = new THREE.Vector3();
        position.setFromMatrixPosition(this.model.matrixWorld);

    }
}