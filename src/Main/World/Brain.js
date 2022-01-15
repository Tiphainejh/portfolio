import Main from "../Main.js";

export default class brain
{
    constructor()
    {
        this.main = new Main()
        this.scene = this.main.scene
        this.resources = this.main.resources
        this.time = this.main.time
        this.debug = this.main.debug

        //debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('brain')
        }
       
        //setup
        this.resource = this.resources.items.brainModel
        
        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.005, 0.005, 0.005)
        this.model.rotation.x = Math.PI /2
        this.scene.add(this.model)
    }

    update()
    {
        this.model.rotation.z = this.time.elapsed * 0.00012
    }
}