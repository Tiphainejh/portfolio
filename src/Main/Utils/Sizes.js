import EventEmitter from './EventEmitter.js'

export default class Sizes extends EventEmitter
{
    constructor()
    {
        super()

        //setup
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        window.addEventListener('resize', () =>
        {
            // Update sizes
            this.width = window.innerWidth
            this.height = window.innerHeight

            this.trigger('resize')
        })
    }
}