import React from "react";
import Image from "next/image"
import Link from "next/link"

import { HStack } from "@chakra-ui/react"


import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
    weight:'400',
    subsets:['latin'],
})

function Navbar(){
    return(
        <div className="flex flex-wrap justify-center items-center text-center align-middle py-5">
            <Image src="/logo1.png" width={50} height={50} alt="logoimg"/>
            <span className={ubuntu.className}style={{fontSize:"2rem", padding:"2rem"}}>Circu<span style={{color:"#30EB33", fontWeight:"700", fontStyle:"Ubuntu"}}>IT</span></span>

            <HStack wrap="wrap" gap="6" style={{paddingLeft:"45vw"}}>
                <Link href="/" style={{color:"#ffffff", fontWeight:"700", fontStyle:"Ubuntu"}}>Home</Link>
                <Link href="/cgpt" style={{color:"#30EB33", fontWeight:"400", fontStyle:"Ubuntu"}}>CircuitGPT</Link>
                <Link href="https://vid-pcd.vercel.app" style={{color:"#30EB33", fontWeight:"400", fontStyle:"Ubuntu"}}>VidPCD</Link>
                <Link href="https://docs.google.com/presentation/d/1Ox_YhCXSkQJWNEU0Z9dFkfCBd9CFC02krdW4rCw75H0/edit?usp=sharing" style={{color:"#30EB33", fontWeight:"400", fontStyle:"Ubuntu"}}>Docs</Link>
                
            </HStack>
        </div>
    );
}

export default Navbar