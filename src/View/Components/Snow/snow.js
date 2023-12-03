import React, {useEffect, useRef} from 'react';
import './index.css';
import Snowflake1 from "../Snowflakes/snowflake1";
import Snowflake2 from "../Snowflakes/snowflake2";
import {gsap} from "gsap";

export default function Snow() {
    let l = 120;
    let arr = new Array(l);
    for (let i = 0; i < l; i++) {
        i % 2 === 0 ? arr[i] = 0 : arr[i] = 1
    }

    return (
        <div className='Snow'>
            {arr.map((el, i) => {
                if (el === 1) return <Snowflake1 key={i}/>;
                return <Snowflake2 key={i}/>
            })}
        </div>
    )
}