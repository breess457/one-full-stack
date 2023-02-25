import React,{useState} from 'react'
import Styles from '../assets/style/card.module.css'
import {useSpring, animated} from '@react-spring/web'

export default function CardCarousel() {
    const [show, setShow] = useState(false)
    const props3 = useSpring({
        opacity:1,
        transform:show? "scale(1.03)":"scale(1)",
        boxShadow:show
        ? "0 20px 25px rgb(0 0 0 / 25%)"
        : "0 2px 10px rgb(0 0 0 / 8%)"
    })
  return (
    <animated.div
        className={Styles.card}
        style={props3}
        onMouseEnter={()=>setShow(true)}
        onMouseLeave={()=>setShow(false)}
    ></animated.div>
  )
}
