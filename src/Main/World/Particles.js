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

        particlesMaterial.size = 0.1
        particlesMaterial.sizeAttenuation = true
        
        particlesMaterial.color = new THREE.Color('#ff88cc')
        
        particlesMaterial.transparent = true
        particlesMaterial.alphaMap = this.particleTexture

        // particlesMaterial.alphaTest = 0.01
        // particlesMaterial.depthTest = false
        particlesMaterial.depthWrite = false
        particlesMaterial.blending = THREE.AdditiveBlending
        particlesMaterial.vertexColors = true
        
        const count = 5000
        
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)
        // si mon x = 3
        // je veux que mes particules aillent de 
        for (let i=0; i < count * 3; i++)
        {
            positions[i] = (Math.random() - 0.5) * 2
            colors[i] = Math.random()
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        
        const particles = new THREE.Points(particlesGeometry, particlesMaterial)
        particles.position.x = this.main.camera.width/4
        particles.position.y = - this.yPosition 
        this.scene.add(particles);
    }



    update()
    {

    }
}