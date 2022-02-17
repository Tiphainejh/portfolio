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
        //debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('environment')
        }
        this.setSunLight()
        this.setAmbiantLight()
        
        this.world.computer.pointLight = this.setPointLight(1.5, -2, 0)
        this.world.interests.plane.pointLight = this.setPointLight(0, 0, 0)
        this.education.pointLight = this.setSunLight(0, 0, 0)


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

    setSunLight()
    {
        var sunLight = new THREE.DirectionalLight(0xff0000, 1)
        sunLight.position.set(4, 4, 0)
        sunLight.castShadow = true
        sunLight.shadow.mapSize.set(1024, 1024)
        sunLight.shadow.camera.far = 15
        sunLight.shadow.camera.left = - 7
        sunLight.shadow.camera.top = 7
        sunLight.shadow.camera.right = 7
        sunLight.shadow.camera.bottom = - 7
        // const helper = new THREE.DirectionalLightHelper( sunLight, 5 );
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

    setPointLight(x, y, z)
    {
        var pointLight = new THREE.PointLight( 0xff0000, 10, 100);
        pointLight.position.set(x, y, z);
        this.scene.add(pointLight)
        
        // const sphereSize = 1;
        // const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
        // this.scene.add( pointLightHelper );
        
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