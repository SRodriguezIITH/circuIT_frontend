import React from 'react';
import './styles/footerStyle.css';
import { isMobile } from 'react-device-detect';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {


    

  let maxWid = "18vw";
  if (isMobile){
    maxWid = "60vw";
  }
  return (
    <footer className="footer">
      <ToastContainer />
      <div className="footersection" style={{marginLeft:"8vw"}}>
        <h3 className='footerh3'>Circu<span style={{color:"#30EB33", fontWeight:"700", fontStyle:"Ubuntu"}}>IT</span> <br></br>Smart Labs</h3>
        <p style={{fontWeight:"300", maxWidth:maxWid, fontSize:"1rem"}}>
          The International Relations Cell (IRC) is a student body working along
          with the Office of International Relations (OIR). It works to promote
          the exchange of students, faculties, and ideas between IIT Hyderabad
          and its international partners and establishing the globalization of
          IIT Hyderabad.
        </p>
      </div>
      <div className="footersection" style={{marginLeft:"7vw"}}>
        <h3 className="footerh3">Quick <br></br>links</h3>
        <ul className='footerul'>
          <li className='footerli'><a href="/home" style={{marginBottom:"5vh"}}>Home</a></li>
          <li className='footerli'><a href="/circgpt">CircuIT GPT</a></li>
          <li className='footerli'><a href="https://vid-pcd.vercel.app">Programs</a></li>
          <li className='footerli'><a href="/abtus">About Us</a></li>
          <li className='footerli'><a href="/docs">Docs</a></li>
        </ul>
      </div>
      <div className="footersection">
        <h3 className='footerh3'>Contact <br></br>Us</h3>
        <ul className='footerul'>
          <li className='footerli'><a href="mailto:dean.ir@iith.ac.in" style={{textDecorationLine: "underline"}}>bm23btech11023@iith.ac.in</a></li>
          <li className='footerli'><a href="mailto:office.ir@iith.ac.in" style={{textDecorationLine: "underline"}}></a></li>
          <li className='footerli'></li>
        </ul>
      </div>
      <div className="footersection">
        <h3 className='footerh3'></h3>
        <br></br>
        <br></br>
      </div>
      <div className="footerbottom">
        <p>© 2024-25 Sonit Patil. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;