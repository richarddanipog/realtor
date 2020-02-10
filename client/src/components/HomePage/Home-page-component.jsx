import React from 'react';
import MainSearchBox from "./main-search-box";
import '../../style-css/HomePage-style/home-page-style.css'
import SectionApartment from "./section-apartments-component";
import {Link} from 'react-router-dom';


class HomePage extends React.Component {
   render() {
      const { toggleModal,user ,logOutUser,toggleUserMenu,activeUserMenu} = this.props;
      return (
         <div className={'main-page'}>
            <MainSearchBox toggleModal={toggleModal} user={user} logOutUser={logOutUser} toggleUserMenu={toggleUserMenu} activeUserMenu={activeUserMenu}/>
            <SectionApartment />
            <div className={'mt-5'} style={{ backgroundColor: "#363636", color: 'white' }}>
               <h3 className={"heading-3 pt-3 ml-3"}>Your own home:</h3>
               <h2 className={"ml-5 mb-0 pb-3"}>The ultimate personal freedom</h2>
            </div>
            <div className="row m-0">
               <div className="story__pictures position-relative col-12 col-lg-6" style={{ backgroundImage: 'url(../images/back.jpg)' }}>  
               </div>

               <div className="story__content text-center col-12 col-lg-6">
                  <h3 className="heading-3 mb-sm">Happy Customers</h3>
                  <h2 className="heading-2 heading-2--dark mb-md">&ldquo;The best decision of our lives&rdquo;</h2>
                  <p className="story__text">
                     Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur distinctio necessitatibus pariatur voluptatibus. Quidem consequatur harum volupta!
                    </p>
                  <Link to={'/apartments'}><button className="btn">Find your own home</button></Link>
               </div>
            </div>  
         </div>
      )
   }
}

export default HomePage;