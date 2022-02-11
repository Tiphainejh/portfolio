import EventEmitter from "./EventEmitter.js"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'
import {gsap} from 'gsap'
import Main from "../Main.js"

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        super()
        
        this.main = new Main()

        //options
        this.sources = sources

        //setup
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0
        this.sceneReady = false 

        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        const loadingBarElement = document.querySelector('.loading-bar')
        this.loadingManager = new THREE.LoadingManager(
            //loaded
            () =>
            {
                let overlay = this.main.world.overlay
                gsap.delayedCall(0.5, () =>
                {
                    gsap.to(overlay.material.uniforms.uAlpha, {duration: 3, value: 0})
                    loadingBarElement.classList.add('ended')
                    loadingBarElement.style.transform = ''
                })
                gsap.delayedCall(1, () =>
                {
                    overlay.material.dispose()
                    overlay.geometry.dispose()
                    this.main.scene.remove(this.main.world.overlay.mesh)
                })
                
                gsap.delayedCall(2, () =>
                {
                    this.sceneReady = true
                })

            },
            //progress
            (itemURL, itemsLoaded, itemsTotal) =>
            {
                
                const progressRatio = itemsLoaded / itemsTotal
                loadingBarElement.style.transform = `scaleX(${progressRatio})`
            }
        )
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader(this.loadingManager)
        this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager)
        this.loaders.fontLoader = new THREE.FontLoader(this.loadingManager)
    }

    startLoading()
    {

        //load each source
        for(const source of this.sources)
        {
            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        file.encoding = THREE.sRGBEncoding;        
                        file.flipY = false;
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'videoTexture')
            {
                const video = document.getElementById(source.name);
                const file = new THREE.VideoTexture(video)
                file.encoding = THREE.sRGBEncoding;    
                file.magFilter = THREE.LinearFilter;
                file.minFilter = THREE.NearestFilter;    
                file.flipY = false;
                this.sourceLoaded(source, file)
            }
            else if(source.type === 'font')
            {
                this.loaders.fontLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file

        this.loaded++
        if(this.loaded == this.toLoad)
        {
            this.trigger('ready')
        }
    }
}