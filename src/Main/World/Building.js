import Main from "../Main.js";
import * as THREE from 'three'
import { Color } from "three";
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
        this.pointLight = null
        this.points = []
        this.canRotate = true

        //setup
        this.resource = model
        this.name = name
        
        
        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        var scale = 1
        this.model.scale.set(scale, scale, scale)
        this.model.position.set(this.xPosition, 0, this.zPosition)
        this.model.rotation.y = - Math.PI /2
        
        this.model.traverse((child) => 
        {
            if (child instanceof THREE.Mesh)
            {                
                child.name = this.name
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
        if(this.points)
        {
            for (const point of this.points)
            {
                var position = new THREE.Vector3();
                position.setFromMatrixPosition(this.model.matrixWorld);
                position.y += 5
                position.z += 1
                const name = point.element.className.split(' ')[1]
                const buildingName = name.split("-")[0]

                switch (buildingName)
                {
                    case 'campus':
                        if(name.split("-")[1] == 'master')
                            position.x -= 2
                        else
                            position.x += 5
                        point.position.copy(position)
                        break
                    case 'campus':
                        point.position.copy(position)
                        break
                    case 'namsan':
                    case 'business':
                        point.position.copy(position)
                        break
                }
            }
        }
        if(this.pointLight)
        {
            var position = new THREE.Vector3();
            position.setFromMatrixPosition(this.model.matrixWorld);
            this.pointLight.position.copy(position)
            // this.pointLight.position.x -= 0.5
            this.pointLight.position.y += 5
            // this.pointLight.position.z += 5
        }

    }
}