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
        this.navElements = ["about_nav", "work_nav", "skills_nav", "education_nav", "interests_nav"]
        this.cursor = {
            x: 0,
            y: 0
        }
        this.scrollPercent = 0


        window.addEventListener('mousemove', (event) => 
        {
            this.cursor.x = event.clientX / this.sizes.width -0.5
            this.cursor.y = event.clientY / this.sizes.height -0.5

            this.mouseVector = new THREE.Vector3();
            this.mouseVector.x = 2 * (event.clientX /  this.sizes.width) - 1;
            this.mouseVector.y = 1 - 2 * ( event.clientY / this.sizes.height );
        })

        window.addEventListener('wheel', () =>
        {
            this.detectTrackPad()
        })

        window.addEventListener('scroll', () =>
        {
            this.detectTrackPad()
        })

        this.slideIndex = 0;
        this.showSlides(this.slideIndex);

        var prev = document.getElementById("prev");
        var next = document.getElementById("next");


        window.addEventListener('click', () =>
        {
            const computer = this.main.world.computer
            console.log(computer.isClickable)
            if (computer.isClickable)
                this.showSlides(1);
        })

        prev.addEventListener('click', () =>
        {
            this.showSlides(-1);
        })

        next.addEventListener('click', () =>
        {
            this.showSlides(1);
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

        var windowBottom = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight;
        var elementTop = this.planeSection.getBoundingClientRect().top + this.scrollY
        this.scrollPercent = (windowBottom - elementTop) / this.planeSection.getBoundingClientRect().height * 100;
    }

    getTopPosition(section)
    {
        var element = this.containerSections[section]
        var topPosition = (element.getBoundingClientRect().top + this.scrollY) / this.sizes.height;
        return topPosition
    }

}