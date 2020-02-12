import React from 'react';
import { Link } from "react-router-dom";

export default class MainSearchBox extends React.Component {


   render() {
      const { user, logOutUser, toggleUserMenu, activeUserMenu } = this.props;
      return (
         <div style={{ height: '100vh' }} className={'mainSearchBox'}>
            <video className={'videoWrapper'} height={'100%'} width={'100%'} style={{ objectFit: 'fill' }}
               autoPlay={'on'} muted={'on'} loop={'loop'}>
               <source src={"../../images/houseTour.mp4"} type={"video/mp4"} />
            </video>
            <div className={'content'}>
               <div className={'text-center'}>
                  <Link to={'/'}>
                     <img className={'myLogo'} src={'./images/logo.png'} alt={""} />
                  </Link>
                  <div className={'position-absolute login'}>

                     {user && <label className={'mr-3'} onClick={toggleUserMenu}><i className={"fas fa-user-circle"} style={{ fontSize: '25px' }} /></label>}
                     <label className={'mr-4'} >{user ? user.first_name : <i className="fas fa-user-circle" style={{ fontSize: '25px' }} onClick={this.props.toggleModal} />}</label>

                     <span className={'mr-4'}>|</span>
                     <span className={'mr-4'}>Explore RealEstate</span>
                  </div>
                  {activeUserMenu && <div className={'card user-menu'} style={{ zIndex: '99999' }}>
                     <div onClick={toggleUserMenu}><Link to={'/add-apartment'} style={{ color: 'black' }}>Profile</Link></div>
                     <hr />
                     {user && user.role_id === 1 && <div><Link to={"/admin"} style={{ color: 'black' }}>Admin</Link></div>
                     }
                     <hr />
                     <div onClick={() => { logOutUser(); toggleUserMenu() }}>Log Out</div>
                  </div>}
                  <h1>The Home of Home Search</h1>
                  <h5>With the most complete source of homes for sale & real estate near you</h5>

                  <div className={'d-flex justify-content-center mt-5'}>
                     <input type={'text'} placeholder={'Address, School, City, Zip or Neighborhood'} />
                     <Link to={'/apartments'}>
                        <button>Search</button>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}