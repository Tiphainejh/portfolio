import Main from "../Main.js";
import * as THREE from 'three'

export default class Environment
{
    constructor()
    {
        this.main = new Main()
        this.scene = this.main.scene
        this.debug = this.main.debug
        this.world = this.main.world
        this.education = this.world.education
        this.bonfire = this.world.bonfire

        //debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('environment')
        }
        this.setSunLight()
        this.setAmbiantLight()
        
        this.world.computer.pointLight = this.setPointLight(1.5, -2, 0)
        this.world.interests.plane.pointLight = this.setPointLight(0, 0, 0)
        this.education.pointLight = this.setSunLight(20)
        this.bonfire.fireLight = this.setPointLight(-0.2, -17.5, 0, 0xffbc00, 3, 5)
        this.bonfire.lanternLight = this.setPointLight(1.2, -16.59, 1.3, 0xffe6a1, 1, 3)
    }

    setRectLight()
    {
        const width = 10;
        const height = 10;
        const intensity = 100;
        const rectLight = new THREE.RectAreaLight( 0x0000ff, intensity,  width, height );
        rectLight.position.set( 5, 5, 0 );
        rectLight.lookAt( 0, 0, 0 );
        this.scene.add( rectLight )

        if(this.debug.active)
        {
            this.debugFolder
            .add(rectLight, 'intensity')
            .name('rectlightintensity')
            .min(0)
            .max(100)
            .step(0.001)

            this.debugFolder
            .add(rectLight.position, 'x')
            .name('sunlightX')
            .min(-5)
            .max(5)
            .step(0.001)

            this.debugFolder
            .add(rectLight.position, 'y')
            .name('sunlightY')
            .min(-5)
            .max(5)
            .step(0.001)

            this.debugFolder
            .add(rectLight.position, 'z')
            .name('sunlightZ')
            .min(-10)
            .max(10)
            .step(0.001)
        }

    }

    setSunLight(intensity = 1)
    {
        var sunLight = new THREE.DirectionalLight(0xff0000, 1)
        sunLight.position.set(4, 4, 0)
        sunLight.castShadow = true
        sunLight.shadow.mapSize.set(1024, 1024)
        sunLight.shadow.camera.far = 10
        sunLight.shadow.camera.left = - 20
        sunLight.shadow.camera.top = 20
        sunLight.shadow.camera.right = 20
        sunLight.shadow.camera.bottom = - 10
        // const helper2 = new THREE.CameraHelper( sunLight.shadow.camera );
        // this.scene.add( helper2 )
        // const helper = new THREE.DirectionalLightHelper( sunLight );
        // this.scene.add(helper);
        this.scene.add(sunLight)

        if(this.debug.active)
        {
            this.debugFolder
            .add(sunLight, 'intensity')
            .name('sunlightintensity')
            .min(0)
            .max(10)
            .step(0.001)

            this.debugFolder
            .add(sunLight.position, 'x')
            .name('sunlightX')
            .min(-5)
            .max(5)
            .step(0.001)

            this.debugFolder
            .add(sunLight.position, 'y')
            .name('sunlightY')
            .min(-5)
            .max(5)
            .step(0.001)

            this.debugFolder
            .add(sunLight.position, 'z')
            .name('sunlightZ')
            .min(-10)
            .max(10)
            .step(0.001)
        }
        return sunLight
    }

    setAmbiantLight()
    {
        var ambientLight = new THREE.AmbientLight(0xffffff, 1)
        ambientLight.position.set(-2, 1, 0)
        this.scene.add(ambientLight)
        if(this.debug.active)
        {
            this.debugFolder
            .add(ambientLight, 'intensity')
            .name('ambientLighttintensity')
            .min(0)
            .max(10)
            .step(0.001)

            this.debugFolder
            .add(ambientLight.position, 'x')
            .name('ambientLightX')
            .min(-5)
            .max(5)
            .step(0.001)

            this.debugFolder
            .add(ambientLight.position, 'y')
            .name('ambientLightY')
            .min(-5)
            .max(5)
            .step(0.001)

            this.debugFolder
            .add(ambientLight.position, 'z')
            .name('ambientLightZ')
            .min(-10)
            .max(10)
            .step(0.001)
        }
        return ambientLight
    }

    setPointLight(x, y, z, color = 0xff0000, intensity = 10, distance = 100)
    {
        var pointLight = new THREE.PointLight(color, intensity, distance);
        pointLight.position.set(x, y, z);
        this.scene.add(pointLight)
        pointLight.castShadow = true

        // const sphereSize = 0.5;
        // const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize );
        // this.scene.add(pointLightHelper );
        
        if(this.debug.active)
        {
            this.debugFolder
            .add(pointLight, 'intensity')
            .name('pointLighttintensity')
            .min(0)
            .max(200)
            .step(0.001)

            this.debugFolder
            .add(pointLight.position, 'x')
            .name('pointLightX')
            .min(-5)
            .max(5)
            .step(0.001)

            this.debugFolder
            .add(pointLight.position, 'y')
            .name('pointLightY')
            .min(-20)
            .max(5)
            .step(0.001)

            this.debugFolder
            .add(pointLight.position, 'z')
            .name('pointLightZ')
            .min(-10)
            .max(10)
            .step(0.001)
        }

        return pointLight
    }

    update()
    {

    }
}