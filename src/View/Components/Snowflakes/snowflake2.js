import React, {useEffect, useRef} from 'react';
import './index.css';
import {gsap} from "gsap";
import useAnimate from "./Controller/animate";

export default function Snowflake2() {
    const ref = useRef(null);

    const {animate} = useAnimate()


    useEffect(() => {

        ref.current && animate(ref.current)
    }, [ref]);
    return (
        <div ref={ref} className='snowflake s2'>

        </div>

    )
}