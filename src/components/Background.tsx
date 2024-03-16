import {useState, useEffect} from 'react'
import { Image } from '@chakra-ui/react';

function getWindowDimensions(){
    const {innerHeight:height,  innerWidth:width} = window

    return {
        width,
        height
    }
}

function USERWINDOWDIMENSIONS(){
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    )

    useEffect(()=>{

        function handleResize(){
            setWindowDimensions(getWindowDimensions())
        }

        window.addEventListener("resize", handleResize)
    }, [])

    return windowDimensions
}
function Background() {

    const {width, height} = USERWINDOWDIMENSIONS()
    const img = `https://source.unsplash.com/random/${width}x${height}`;

    return <Image
        position="fixed"
        top="0"
        left="0"
        bottom="0"
        right="0"
        zIndex = "1"
        src={img}
        alt="bg"
    />;
}

export default Background