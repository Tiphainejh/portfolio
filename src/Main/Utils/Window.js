import Main from "../Main"
import EventEmitter from './EventEmitter.js'

export default class Window extends EventEmitter
{
    constructor()
    {
        super()
        this.main = new Main()
        this.sizes = this.main.sizes
        this.scrollY = window.scrollY
        this.currentSection = 0
        this.container_sections = document.getElementsByClassName("container_section")
        this.interests_section = this.container_sections[4]
        this.navElements = ["about_nav", "work_nav", "skills_nav", "education_nav", "interests_nav"]
        this.cursor = {
            x: 0,
            y: 0
        }
        this.scrollPercent = 0


        window.addEventListener('mousemove', (event) => 
        {
            this.cursor.x = event.clientX / this.sizes.height -0.5
            this.cursor.y = event.clientY / this.sizes.height -0.5
        })

        window.addEventListener('wheel', () =>
        {
            this.detectTrackPad()
        })

        window.addEventListener('scroll', () =>
        {
            this.detectTrackPad()
        })
    }

    detectTrackPad(e) {
        this.scrollY = window.scrollY
        const newSection = Math.round(this.scrollY / this.sizes.height)

        var css_var_s = getComputedStyle(document.querySelector(':root'))
        var menuTextColorHover = css_var_s.getPropertyValue('--default-color')
        var menuTextColor = css_var_s.getPropertyValue('--menu-text-color')

        if (newSection != this.currentSection)
        {
            document.getElementById(this.navElements[this.currentSection]).style.color = menuTextColor;
            document.getElementById(this.navElements[newSection]).style.color = menuTextColorHover;
            this.currentSection = newSection

            if(newSection == "4" )
            {
                this.trigger('interests')
            }
        }

        var windowBottom = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight;
        var elementTop = this.interests_section.getBoundingClientRect().top + this.scrollY
        this.scrollPercent = (windowBottom - elementTop) / this.interests_section.getBoundingClientRect().height * 100;
        // if (this.scrollPercent >= 100) {
        //     console.log("100")
        // } else if (windowBottom >= elementTop) {
        //     console.log(this.scrollPercent)
        // } else {
        //     console.log("0")
        // }
    }

    getTopPosition(section)
    {
        var element = this.container_sections[section]
        var topPosition = (element.getBoundingClientRect().top + this.scrollY) / this.sizes.height;
        return topPosition
    }

}