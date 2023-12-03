import {gsap} from "gsap";

export default function useAnimate(){


    const animate = (el)=>{
        let width = window.innerWidth
        let height = window.innerHeight
        let scaleFactor = gsap.utils.random(0, 1, 0.01)
        let scale = gsap.utils.interpolate(0.2, 0.8, scaleFactor)
        let duration = gsap.utils.interpolate(2,5, 1-scaleFactor)
        let opacity = gsap.utils.interpolate(0.2, 0.7, scaleFactor)

        gsap.set(el, {y:-250, x:gsap.utils.random(0,width), scale:scale, opacity:opacity}).then(res=>{

        })
        gsap.to(el, {y:height + 200, x:"-=300",
            duration:duration,
            delay:"random(0,5)",
            ease:"none",
            rotation:"random(-60, 300)",
            onComplete:animate,
            onCompleteParams:[el]
        })
    }

    return {animate}
}