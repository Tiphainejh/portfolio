import Main from "../Main.js";
import * as THREE from 'three'

export default class Particles
{
    constructor(yPosition)
    {
        this.main = new Main()
        this.scene = this.main.scene
        this.resources = this.main.resources
        this.time = this.main.time
        this.debug = this.main.debug
        this.world = this.main.world
        this.camera = this.main.camera
        this.yPosition = yPosition

        //debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('particles')
        }
            
        /**
         * Textures
         */
        this.particleTexture = this.resources.items.particles
         
        /**
         * Test cube
         */
        
        const particlesGeometry = new THREE.BufferGeometry(1, 32, 32)
        const particlesMaterial = new THREE.PointsMaterial({size: 0.1, sizeAttenuation: true})

        particlesMaterial.size = 0.2
        particlesMaterial.sizeAttenuation = true
        
        particlesMaterial.color = new THREE.Color('#ffffff')
        
        particlesMaterial.transparent = true
        particlesMaterial.alphaMap = this.particleTexture

        // particlesMaterial.alphaTest = 0.01
        // particlesMaterial.depthTest = false
        particlesMaterial.depthWrite = false
        particlesMaterial.blending = THREE.AdditiveBlending
        particlesMaterial.vertexColors = true
        
        const count = 3000

        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)
        // si mon x = 3
        // je veux que mes particules aillent de 
        for (let i=0; i < count ; i++)
        {   
            const i3 = i * 3

            // positions[i] = (Math.random() - 0.5) * 8
            positions[i3    ] = (Math.random() - 0.5) * (this.camera.width + 2)
            positions[i3 + 1] = Math.pow(Math.random(), 5) * (Math.random() < 0.5 ? 1 : - 1) * 7
            positions[i3 + 2] = (Math.random() - 0.5) * (this.camera.width + 2)

            colors[i3    ] = 1
            colors[i3 + 1] = 1
            colors[i3 + 2] = 1
            // colors[i] = Math.random()
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        
        this.particles = new THREE.Points(particlesGeometry, particlesMaterial)
        // particles.position.x = this.main.camera.width/4
        this.particles.position.y = - this.yPosition - this.main.camera.height
        this.particles.position.z = - 2
        this.scene.add(this.particles);

    }



    update()
    {

    }
}