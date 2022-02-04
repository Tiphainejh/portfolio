import Main from "../Main"
import EventEmitter from './EventEmitter.js'
import * as THREE from 'three'

export default class Window extends EventEmitter
{
    constructor()
    {
        super()
        this.main = new Main()
        this.sizes = this.main.sizes
        this.world = this.main.world
        this.scrollY = window.scrollY
        this.currentSection = 0
        this.containerSections = document.getElementsByClassName("container_section")
        this.interestsSection = this.containerSections[4]
        this.planeSection = document.getElementById("plane_section")
        this.educationSection = document.getElementById("education")
        this.workSection = document.getElementById("work")
        this.navElements = ["about_nav", "work_nav", "skills_nav", "education_nav", "interests_nav"]
        this.cursor = {
            x: 0,
            y: 0
        }
        this.planeSectionScrollPercent = 0
        this.educationSectionScrollPercent = 0
        this.mouseVector = new THREE.Vector3();
        this.objectDistance = 4


        window.addEventListener('mousemove', (event) => 
        {
            this.cursor.x = event.clientX / this.sizes.width -0.5
            this.cursor.y = event.clientY / this.sizes.height -0.5

            this.mouseVector.x = 2 * (event.clientX /  this.sizes.width) - 1;
            this.mouseVector.y = 1 - 2 * ( event.clientY / this.sizes.height );
        })

        
        window.addEventListener('wheel', () =>
        {
            this.hideSections()

            this.detectTrackPad()
        })

        window.addEventListener('scroll', () =>
        {
            this.hideSections()

            this.detectTrackPad()
        })

        this.slideIndex = 0;
        this.showSlides(this.slideIndex);

        this.pages = document.querySelectorAll('.container_section')

        window.addEventListener('click', () =>
        {
            const computer = this.main.world.computer
            if (computer.isClickable)
            {
                computer.isClicked = true
                this.showSlides(1);
                const spacebar = computer.getChildByName('spacebar')
                const screen = computer.getChildByName('screen')
                computer.changeColor(spacebar, 0x00ff00)
                computer.changeImage(screen, this.slideIndex)
                computer.currentImage = 0


                window.setInterval(() =>
                {
                    computer.isClicked = false
                }, 1000)
            }
        })

        

    }

    mod(n, m) 
    {
        return ((n % m) + m) % m;
    }

    showSlides(n)
    {
        var slides = document.getElementsByClassName("mySlides");
        this.slideIndex = this.mod(this.slideIndex+=n, slides.length)

        for (var slide of slides)
            slide.style.display = "none";

        slides[this.slideIndex].style.display = "block";
    }

    detectTrackPad(e) {
        this.scrollY = window.scrollY
        const newSection = Math.round(this.scrollY / this.sizes.height)
        var css_var_s = getComputedStyle(document.querySelector(':root'))
        var menuTextColorHover = css_var_s.getPropertyValue('--default-color')
        var menuTextColor = css_var_s.getPropertyValue('--menu-text-color')

        if (newSection != this.currentSection && newSection != (this.navElements.length))
        {
            document.getElementById(this.navElements[this.currentSection]).style.color = menuTextColor;
            document.getElementById(this.navElements[newSection]).style.color = menuTextColorHover;
            document.getElementById(this.navElements[newSection]).style.fontWeight = "bold";
            this.currentSection = newSection

            if(newSection == "4" )
            {
                this.trigger('interests')
            }
        }

        //TODO organise
        this.planeSectionScrollPercent = this.getScrollPercent(this.planeSection)
        this.educationScrollPercent = this.getScrollPercent(this.educationSection)
        this.workScrollPercent = this.getScrollPercent(this.workSection)
    }

    getScrollPercent(section)
    {
        var windowBottom = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight;
        return (windowBottom - this.getTopHTMLPosition(section)) / section.getBoundingClientRect().height * 100;
    }

    getTopHTMLPosition(element)
    {
        return element.getBoundingClientRect().top + this.scrollY
    }

    hideSections()
    {
        for(var i = 0; i< this.pages.length; i++)
        {
            if (window.scrollY < this.pages[i].offsetTop )
                this.pages[i].classList.add('visible')
            else
            this.pages[i].classList.remove('visible');
        }
    }

    getTopWorldPosition(section)
    {
        var element = this.containerSections[section]
        var topPosition = this.getTopHTMLPosition(element) / this.sizes.height;
        return topPosition * this.objectDistance
    }

    update()
    {
        // for(var i = 0; i< this.pages.length; i++)
        // {
        //     if(i == this.currentSection)
        //     {
        //         this.pages[i].classList.add('visible')
        //     }
        //     else
        //     {
        //         this.pages[i].classList.remove('visible')
        //     }
        // }
    }
}
