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
        this.isNotFocused = true
        this.setInstance()
        
        const vFOV = (this.instance.fov * Math.PI) / 180;
        this.height = 2 * Math.tan(vFOV / 2) * Math.abs(this.instance.position.z);
        this.width = this.height * this.instance.aspect;
        
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 50)
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

    zoomToSelection(camera, controls, selection, fitRatio = 1.2)
    {
        const box = new THREE.Box3();
      
        for (const object of selection) box.expandByObject(object);
      
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
      
        const maxSize = Math.max(size.x, size.y, size.z);
        const fitHeightDistance =
          maxSize / (2 * Math.atan((Math.PI * camera.fov) / 360));
        const fitWidthDistance = fitHeightDistance / camera.aspect;
        const distance = fitRatio * Math.max(fitHeightDistance, fitWidthDistance);
      
        const direction = controls.target
          .clone()
          .sub(camera.position)
          .normalize()
          .multiplyScalar(distance);
      
        controls.maxDistance = distance * 10;
        controls.target.copy(center);
      
        camera.near = distance / 100;
        camera.far = distance * 100;
        camera.updateProjectionMatrix();
      
        camera.position.copy(controls.target).sub(direction);
      
    }

    update()
    {
        if(this.isNotFocused)
            this.instance.position.y = - this.window.scrollY / this.sizes.height * this.window.objectDistance
        const parallaxX = this.window.cursor.x * 0.5 
        const parallaxY = -this.window.cursor.y * 0.5 
        this.cameraGroup.position.x += (parallaxX - this.cameraGroup.position.x) * this.time.delta * 0.003
        this.cameraGroup.position.y += (parallaxY - this.cameraGroup.position.y) * this.time.delta * 0.003
    }
}
