import Main from "../Main.js";
import * as THREE from 'three'

export default class Torus
{
    constructor(yPosition)
    {
        this.main = new Main()
        this.scene = this.main.scene
        this.resources = this.main.resources
        this.time = this.main.time
        this.debug = this.main.debug
        this.yPosition = yPosition
        this.world = this.main.world

        
        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }


    setMaterial()
    {
        this.material = new THREE.MeshToonMaterial()
        this.gradientTexture = this.resources.items.gradientTexture
        this.gradientTexture.generateMipmaps = false
        this.gradientTexture.minFilter = THREE.NearestFilter
        this.gradientTexture.magFilter = THREE.NearestFilter
        this.material.gradientMap = this.gradientTexture
    }

    setGeometry()
    {
        this.geometry = new THREE.TorusGeometry(1, 0.4, 16, 60)
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.y = - this.yPosition * this.world.objectDistance
        //this.mesh.position.x = 2
        this.mesh.position.x = 1.5
        this.scene.add(this.mesh)
    }

    update()
    {
        this.mesh.rotation.x = this.time.elapsed * 0.00010
        this.mesh.rotation.y = this.time.elapsed * 0.00012
    }
}