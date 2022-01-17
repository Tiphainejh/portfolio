import Main from './Main.js'
import * as THREE from 'three'
export default class Camera
{
    constructor()
    {
        this.main = new Main()
        this.sizes = this.main.sizes
        this.scene = this.main.scene
        this.canvas = this.main.canvas
        this.window = this.main.window
        this.world = this.main.world
        this.time = this.main.time

        this.setInstance()
        
        const vFOV = (this.instance.fov * Math.PI) / 180;
        this.height = 2 * Math.tan(vFOV / 2) * Math.abs(this.instance.position.z);
        this.width = this.height * this.instance.aspect;
        
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.z = 6
        
        this.cameraGroup = new THREE.Group()
        this.cameraGroup.add(this.instance)
        
        this.scene.add(this.cameraGroup)
    }


    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.instance.position.y = - this.window.scrollY / this.sizes.height * this.world.objectDistance
        const parallaxX = this.window.cursor.x * 0.5 
        const parallaxY = -this.window.cursor.y * 0.5 
        this.cameraGroup.position.x += (parallaxX - this.cameraGroup.position.x) * this.time.delta * 0.01
        this.cameraGroup.position.y += (parallaxY - this.cameraGroup.position.y) * this.time.delta * 0.01
    }
}
