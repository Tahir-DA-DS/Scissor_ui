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
    const img = `https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/${width}x${height}`;

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