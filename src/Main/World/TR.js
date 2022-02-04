import Main from "../Main.js";

export default class TR
{
    constructor()
    {
        this.main = new Main()
        this.scene = this.main.scene
        this.resources = this.main.resources
        this.time = this.main.time
        this.debug = this.main.debug

       
        //setup
        this.resource = this.resources.items.trModel


        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.5, 0.5, 0.5)
        this.model.position.set(8, 0.5, -15)
        //this.model.rotation.x = Math.PI /2
        this.scene.add(this.model)
    }

    update()
    {
        this.model.rotation.y = - this.time.elapsed * 0.00012
    }
}