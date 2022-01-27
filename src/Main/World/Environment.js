import Main from "../Main.js";
import * as THREE from 'three'

export default class Environment
{
    constructor()
    {
        this.main = new Main()
        this.scene = this.main.scene
        this.debug = this.main.debug

        //debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('environment')
        }
        this.setSunLight()
        this.setAmbiantLight()
        this.setPointLight()
    }

    setSunLight()
    {
        this.sunLight = new THREE.DirectionalLight(0xffffff, 1)
        this.sunLight.position.set(4, 4, 0)
        this.sunLight.castShadow = true
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.camera.left = - 7
        this.sunLight.shadow.camera.top = 7
        this.sunLight.shadow.camera.right = 7
        this.sunLight.shadow.camera.bottom = - 7
        this.scene.add(this.sunLight)

        if(this.debug.active)
        {
            this.debugFolder
            .add(this.sunLight, 'intensity')
            .name('sunlightintensity')
            .min(0)
            .max(10)
            .step(0.001)

            this.debugFolder
            .add(this.sunLight.position, 'x')
            .name('sunlightX')
            .min(-5)
            .max(5)
            .step(0.001)

            this.debugFolder
            .add(this.sunLight.position, 'y')
            .name('sunlightY')
            .min(-5)
            .max(5)
            .step(0.001)

            this.debugFolder
            .add(this.sunLight.position, 'z')
            .name('sunlightZ')
            .min(-10)
            .max(10)
            .step(0.001)
        }
    }

    setAmbiantLight()
    {
        this.ambientLight = new THREE.AmbientLight(0xffffff, 1)
        this.ambientLight.position.set(-2, 1, 0)
        this.scene.add(this.ambientLight)
        if(this.debug.active)
        {
            this.debugFolder
            .add(this.ambientLight, 'intensity')
            .name('ambientLighttintensity')
            .min(0)
            .max(10)
            .step(0.001)

            this.debugFolder
            .add(this.ambientLight.position, 'x')
            .name('ambientLightX')
            .min(-5)
            .max(5)
            .step(0.001)

            this.debugFolder
            .add(this.ambientLight.position, 'y')
            .name('ambientLightY')
            .min(-5)
            .max(5)
            .step(0.001)

            this.debugFolder
            .add(this.ambientLight.position, 'z')
            .name('ambientLightZ')
            .min(-10)
            .max(10)
            .step(0.001)
        }
    }

    setPointLight()
    {
        this.pointLight = new THREE.PointLight( 0xff0000, 10, 100);
        this.pointLight.position.set(1.5, -2, 0);
        this.scene.add(this.pointLight)
        if(this.debug.active)
        {
            this.debugFolder
            .add(this.pointLight, 'intensity')
            .name('pointLighttintensity')
            .min(0)
            .max(200)
            .step(0.001)

            this.debugFolder
            .add(this.pointLight.position, 'x')
            .name('pointLightX')
            .min(-5)
            .max(5)
            .step(0.001)

            this.debugFolder
            .add(this.pointLight.position, 'y')
            .name('pointLightY')
            .min(-5)
            .max(5)
            .step(0.001)

            this.debugFolder
            .add(this.pointLight.position, 'z')
            .name('pointLightZ')
            .min(-10)
            .max(10)
            .step(0.001)
        }
    }


}