import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Header extends Component {
   render() {
      const { user ,activeUserMenu,logOutUser,toggleUserMenu} = this.props;
      return (
         <div className={'container-fluid'}>
            <div className={'mb-3'} style={{ borderBottom: '1px solid lightgrey' }}>
               <Link to={`/`}>
                  <img className={'mt-3 mb-2'} height={'40px'} src={'../images/logo.png'} alt={""}/>
               </Link>
               <div className={'position-absolute login'}>

                  {user && <label className={'mr-3'} onClick={toggleUserMenu}><i className={"fas fa-user-circle"} style={{ fontSize: '25px' }} /></label>}
                  <label className={'mr-4'} >{user ? <span>{user.first_name}</span> : <i className="fas fa-user-circle" style={{ fontSize: '25px' }} onClick={this.props.toggleModal}/>}</label>

                  <span className={'mr-4'}>|</span>
                  <span className={'mr-4'}>Explore RealEstate</span>
               </div>
               {activeUserMenu && <div className={'card user-menu'}>
                  <div onClick={toggleUserMenu}><Link to={'/add-apartment'} style={{ color: 'black' }}>Profile</Link></div>
                  <hr/>
                  {user &&user.role_id === 1 && <div><Link to={"/admin"} style={{ color: 'black' }}>Admin</Link></div>}
                  <hr/>
                  <div onClick={() => { logOutUser(); toggleUserMenu() }}>Log Out</div>
               </div>}
            </div>
         </div>
      );
   }
}

export default Header;