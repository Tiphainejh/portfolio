import Main from "../Main"

export default class Window
{
    constructor()
    {
        this.main = new Main()
        this.sizes = this.main.sizes
        this.scrollY = window.scrollY
        this.currentSection = 0
        this.navElements = ["about_nav", "work_nav", "skills_nav", "education_nav", "interests_nav"]
        this.cursor = {
            x: 0,
            y: 0
        }

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
        }
    }
}