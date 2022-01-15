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
        this.setInstance()
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
        //console.log(this.instance.position)
        // const parallaxX = this.window.cursor.x * 0.5  //TODO cursor
        // const parallaxY = -this.window.cursor.y * 0.5 //TODO cursor
        // this.cameraGroup.position.x += (parallaxX - this.cameraGroup.position.x) * 5 * this.time.deltaTime
        // this.cameraGroup.position.y += (parallaxY - this.cameraGroup.position.y) * 5 * this.time.deltaTime
    }
}
