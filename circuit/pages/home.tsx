'use client'
import React from "react";
import Image from "next/image"
import Navbar from "../app/components/navbar";
import Footer from "../app/components/footer"
import { Ubuntu } from "next/font/google";

import {TypeAnimation} from "react-type-animation"


const ubuntu = Ubuntu({
    weight:'400',
    subsets:['latin'],
})

function Guide(){
    return(
        <div style={{backgroundColor:"#fdfbd4", padding:"5rem"}}>
            <span style={{fontSize:"4rem", fontWeight:"600", color:"#30EB33"}}>How CircuIT Labs Work?</span>
            <br /><br />
            <div style={{textAlign:"left", alignItems:"start", justifyContent:"left"}}>
                <h1 style={{color:"#1d1d1d", fontSize:"2rem", fontWeight:"600"}}>Step 1: Scan Component to Be Built</h1>
                <div className="flex flex-wrap gap-10" style={{color:"#1d1d1d", fontStyle:"Ubuntu", fontSize:"2rem", fontWeight:"400"}}>
                    <Image src="/segcircori.jpg" width={360} height={240} alt="Segmented Circuit"></Image>
                    
                    <Image src="/segcirc.jpg" width={360} height={240} alt="Segmented Circuit"></Image>

                    Our embedded segmentation model determines the components you need to build the given component.
                </div>
            </div>

            <br /><br /><br />
            
            <div
                style={{
                    textAlign: "right",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    color:"#1d1d1d",
                    fontSize:"2rem",
                    fontFamily:"Ubuntu"
                }}
                >
                <h1
                    style={{
                    color: "#1d1d1d",
                    fontSize: "2rem",
                    fontWeight: "600",
                    }}
                >
                    Step 2: Navigate CircuIT Smart Lab
                </h1>
                <Image
                    className="px-10"
                    style={{ position: "relative" }}
                    src="/seglab.png"
                    width={360}
                    height={240}
                    alt="Segmented Circuit"
                />
                <br />
                The required components are marked in lab and navigation is displayed.
                </div>
                <br /><br />


            <div style={{textAlign:"left", alignItems:"start", justifyContent:"left"}}>
                <h1 style={{color:"#1d1d1d", fontSize:"2rem", fontWeight:"600"}}>Step 3: Simulate and Compose the Circuit</h1>
                <div className="flex flex-wrap gap-10" style={{color:"#1d1d1d", fontStyle:"Ubuntu", fontSize:"2rem", fontWeight:"400"}}>
                    <Image src="/simul1.png" width={360} height={240} alt="Segmented Circuit"></Image>
                    <Image src="/simul2.png" width={600} height={50} alt="Segmented Circuit"></Image>
                </div>
            </div>

            <br /><br /><br />


            <div style={{textAlign:"left", alignItems:"start", justifyContent:"left"}}>
                <h1 style={{color:"#1d1d1d", fontSize:"2rem", fontWeight:"600"}}>It is that Simple!</h1>
            </div>
        </div>
    );
}

function HomePage(){
    return(
        <>
            <div className={ubuntu.className} style={{background:"#1d1d1d", height:"100vh", width:"100vw"}}>
                <Navbar></Navbar>
                <div className="flex flex-wrap justify-center align-middle items-center py-10" style={{gap:"20vw", padding:"3rem"}}>
                    <div>
                        <span style={{maxWidth:"40vw"}}> 
                            <span style={{fontSize:"5rem"}}>Welcome to CircuIT!</span> 
                            <br></br> 
                            <span>Smart Lab Solutions which navigate, guide, build and simulate circuitry</span>
                        
                        </span>
                        <br></br>
                        <br></br>
                        <TypeAnimation style={{color:"#30EB33", fontWeight:"600", fontSize:"2rem"}}
                            sequence={[
                                "Step 1: Scan Component to be built",
                                200,
                                "Step 2: Navigate Lab and Get Components",
                                200,
                                "Step 3: Simulate Circuit Connections",
                            ]}
                            repeat={Infinity}
                        />
                    </div>
                    
                    <Image src="/homebegin.png" width={350} height={350} alt="homeimg" />
                    
                </div>
            </div>

            <Guide />
            <Footer />
        </>
        
    );
}

export default HomePage;