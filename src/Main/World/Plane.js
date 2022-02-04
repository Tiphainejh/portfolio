import Main from "../Main.js";
import * as THREE from 'three'

export default class Plane
{
    constructor(yPosition)
    {
        this.main = new Main()
        this.scene = this.main.scene
        this.resources = this.main.resources
        this.time = this.main.time
        this.world = this.main.world
        this.window = this.main.window
        this.debug = this.main.debug
        this.yPosition = yPosition
        this.animationScripts = []
    

        //debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('plane')
        }
       
        //setup
        this.resource = this.resources.items.planeModel
        
        this.positions = {
            x : {
                startPosition : - this.main.camera.width/2 - 2,
                endPosition : this.main.camera.width/2 - 2
            },
            y : {
                startPosition : - this.yPosition + 2,
                endPosition : - this.yPosition + 2
            },
            z : {
                startPosition : 0,
                endPosition : 5
            }
        }


        this.animations = 
        {
            0 : {
                debut : 0,
                position : {
                    x : this.positions.x.startPosition,
                    y : this.positions.y.startPosition,
                    z : this.positions.z.startPosition
                },
                rotation : {
                    x : 0,
                    y : Math.PI / 2 ,
                    z : 0
                }
            },
            1 : {
                debut : 41,
                position : {
                    x : this.getPercentage(42, this.positions.x),
                    y : this.positions.y.startPosition,
                    z : this.positions.z.startPosition
                },
                rotation : {
                    x : 0,
                    y : Math.PI / 2 ,
                    z : THREE.MathUtils.degToRad(45)
                }
            },
            2 : {
                debut : 56,
                position : {
                    x : this.getPercentage(57, this.positions.x),
                    y : this.getPercentage(17, this.positions.y),
                    z : this.getPercentage(18, this.positions.z)
                },
                rotation : {
                    x : THREE.MathUtils.degToRad(10),
                    y : Math.PI / 2 - THREE.MathUtils.degToRad(25),
                    z : THREE.MathUtils.degToRad(73)
                }
            },
            3 : {
                debut : 65,
                position : {
                    x : this.getPercentage(66, this.positions.x),
                    y : this.getPercentage(38, this.positions.y),
                    z : this.getPercentage(36, this.positions.z)
                },
                rotation : {
                    x : THREE.MathUtils.degToRad(10),
                    y : Math.PI / 2 - THREE.MathUtils.degToRad(55),
                    z : THREE.MathUtils.degToRad(65)
                }
            },
            4 : {
                debut : 100,
                position : {
                    x : this.positions.x.endPosition,
                    y : this.positions.y.endPosition,
                    z : this.positions.z.endPosition
                },
                rotation : {
                    x : 0,
                    y : Math.PI /2 - THREE.MathUtils.degToRad(85),
                    z : THREE.MathUtils.degToRad(8)
                }
            }
        }



        this.animationScripts.push({
            start: this.animations[0]['debut'],
            end: this.animations[1]['debut'],
            func: () => {
                this.model.position.x = this.lerp(this.animations[0]['position']['x'], this.animations[1]['position']['x'], this.scalePercent(this.animations[0]['debut'], this.animations[1]['debut']))
                this.model.position.y = this.lerp(this.animations[0]['position']['y'], this.animations[1]['position']['y'], this.scalePercent(this.animations[0]['debut'], this.animations[1]['debut']))
                this.model.position.z = this.lerp(this.animations[0]['position']['z'], this.animations[1]['position']['z'], this.scalePercent(this.animations[0]['debut'], this.animations[1]['debut']))
                this.model.rotation.x = this.lerp(this.animations[0]['rotation']['x'], this.animations[1]['rotation']['x'], this.scalePercent(this.animations[0]['debut'], this.animations[1]['debut']))
                this.model.rotation.y = this.lerp(this.animations[0]['rotation']['y'], this.animations[1]['rotation']['y'], this.scalePercent(this.animations[0]['debut'], this.animations[1]['debut']))
                this.model.rotation.z = this.lerp(this.animations[0]['rotation']['z'], this.animations[1]['rotation']['z'], this.scalePercent(this.animations[0]['debut'], this.animations[1]['debut']))
            },
        })

        this.animationScripts.push({
            start: this.animations[1]['debut']+1,
            end: this.animations[2]['debut'],
            func: () => {
                this.model.position.x = this.lerp(this.animations[1]['position']['x'], this.animations[2]['position']['x'], this.scalePercent(this.animations[1]['debut'], this.animations[2]['debut']))
                this.model.position.y = this.lerp(this.animations[1]['position']['y'], this.animations[2]['position']['y'], this.scalePercent(this.animations[1]['debut'], this.animations[2]['debut']))
                this.model.position.z = this.lerp(this.animations[1]['position']['z'], this.animations[2]['position']['z'], this.scalePercent(this.animations[1]['debut'], this.animations[2]['debut']))
                this.model.rotation.x = this.lerp(this.animations[1]['rotation']['x'], this.animations[2]['rotation']['x'], this.scalePercent(this.animations[1]['debut'], this.animations[2]['debut']))
                this.model.rotation.y = this.lerp(this.animations[1]['rotation']['y'], this.animations[2]['rotation']['y'], this.scalePercent(this.animations[1]['debut'], this.animations[2]['debut']))
                this.model.rotation.z = this.lerp(this.animations[1]['rotation']['z'], this.animations[2]['rotation']['z'], this.scalePercent(this.animations[1]['debut'], this.animations[2]['debut']))
            },
        })

        this.animationScripts.push({
            start: this.animations[2]['debut']+1,
            end: this.animations[3]['debut'],
            func: () => {
                this.model.position.x = this.lerp(this.animations[2]['position']['x'], this.animations[3]['position']['x'], this.scalePercent(this.animations[2]['debut'], this.animations[3]['debut']))
                this.model.position.y = this.lerp(this.animations[2]['position']['y'], this.animations[3]['position']['y'], this.scalePercent(this.animations[2]['debut'], this.animations[3]['debut']))
                this.model.position.z = this.lerp(this.animations[2]['position']['z'], this.animations[3]['position']['z'], this.scalePercent(this.animations[2]['debut'], this.animations[3]['debut']))
                this.model.rotation.x = this.lerp(this.animations[2]['rotation']['x'], this.animations[3]['rotation']['x'], this.scalePercent(this.animations[2]['debut'], this.animations[3]['debut']))
                this.model.rotation.y = this.lerp(this.animations[2]['rotation']['y'], this.animations[3]['rotation']['y'], this.scalePercent(this.animations[2]['debut'], this.animations[3]['debut']))
                this.model.rotation.z = this.lerp(this.animations[2]['rotation']['z'], this.animations[3]['rotation']['z'], this.scalePercent(this.animations[2]['debut'], this.animations[3]['debut']))
            },
        })

        this.animationScripts.push({
            start: this.animations[3]['debut']+1,
            end: this.animations[4]['debut'],
            func: () => {
                this.model.position.x = this.lerp(this.animations[3]['position']['x'], this.animations[4]['position']['x'], this.scalePercent(this.animations[3]['debut'], this.animations[4]['debut']))
                this.model.position.y = this.lerp(this.animations[3]['position']['y'], this.animations[4]['position']['y'], this.scalePercent(this.animations[3]['debut'], this.animations[4]['debut']))
                this.model.position.z = this.lerp(this.animations[3]['position']['z'], this.animations[4]['position']['z'], this.scalePercent(this.animations[3]['debut'], this.animations[4]['debut']))
                this.model.rotation.x = this.lerp(this.animations[3]['rotation']['x'], this.animations[4]['rotation']['x'], this.scalePercent(this.animations[3]['debut'], this.animations[4]['debut']))
                this.model.rotation.y = this.lerp(this.animations[3]['rotation']['y'], this.animations[4]['rotation']['y'], this.scalePercent(this.animations[3]['debut'], this.animations[4]['debut']))
                this.model.rotation.z = this.lerp(this.animations[3]['rotation']['z'], this.animations[4]['rotation']['z'], this.scalePercent(this.animations[3]['debut'], this.animations[4]['debut']))
            },
        })
        
            this.setModel()




    }

    getPercentage(value, position)
    {
        if(position.startPosition > position.endPosition)
        {
            const length = position.startPosition - position.endPosition 
            return position.startPosition - value / 100 * (length) 
        }
        else
        {
            const length = position.endPosition - position.startPosition 
            return position.startPosition + value / 100 * (length)
        }
    }

    lerp(x, y, a)
    {
        return (1 - a) * x + a * y
    }
    
    scalePercent(start, end) {
        return (this.window.planeSectionScrollPercent - start) / (end - start)
    }
    
    playScrollAnimations() {
        this.animationScripts.forEach((a) => {
            if (this.window.planeSectionScrollPercent >= a.start && this.window.planeSectionScrollPercent < a.end) {
                a.func()
            }
        })
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.009, 0.009, 0.009)
        this.model.rotation.y = Math.PI / 2
        this.model.position.y = - this.yPosition + 2
        this.model.position.x = this.positions.x.startPosition
        this.scene.add(this.model)
    }
    
 
    update()
    {  
        this.playScrollAnimations()
        if(this.window.planeSectionScrollPercent > 50 && this.window.planeSectionScrollPercent < 150)
        {
            this.model.visible = true
            this.pointLight.intensity = 10
        }
        else
        {
            this.model.visible = false
            this.pointLight.intensity = 0

        }
    }
}