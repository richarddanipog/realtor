import React from "react";
import "../../style-css/HomePage-style/footer-style.css";

class Footer extends React.Component{
   render() {
      return(
         <footer className={'mt-5 '}><hr/>  
            <div className={'footer row justify-content-between'}>
               <div className={'d-flex'}>
                  <label><a href={"/"} style={{color:"#3b5998"}}><i className="fab fa-facebook-square"/></a></label>
                  <label><a href={"/"} style={{color:'#38A1F3'}}><i className="fab fa-twitter"/></a></label>
                  <label><a href={"/"} style={{color:'#0077B5'}}><i className="fab fa-linkedin"/></a></label>
                  <label><a href={"/"} style={{color:'#231F20'}}><i className="fab fa-instagram"/></a></label>
                  <label><a href={"/"} style={{color:'#BD081C'}}><i className="fab fa-pinterest-square"/></a></label>
                  <label><a href={"/"} style={{color:'#ED3833'}}><i className="fab fa-youtube"/></a></label>
               </div>
               <div><img src="../images/logo.png" alt="logo" height={'50px'}/></div>
            </div>
            <hr/>
            <div className={'footer-about'} style={{backgroundImage:'url(../../../images/wave.png)',backgroundSize:'cover',width:" 100%",height:'220px',backgroundColor:'#363636'}}>
            <ul className={'row m-0'}>
                  <li><a href={'/'}>About us</a></li>
                  <li><a href={'/'}>Careers</a></li>
                  <li><a href={'/'}>Feedback</a></li>
               </ul>
               <p className={'ml-5'}>© 2020 Richard Danipog, Inc. All rights reserved. rights reserved.</p>
            </div>
            </footer>
      )
   }
}

export default Footer;