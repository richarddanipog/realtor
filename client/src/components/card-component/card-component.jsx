import React from 'react';
import CardImage from "./card-image";
import CardDescribe from "./card-describe";
import { Link } from "react-router-dom";
import { deleteApartment } from '../../app-data/app-data-actions';
import Modal from 'react-bootstrap/Modal';

class Card extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         activeModal: false
      }
   }
   deleteApt = async (byId) => {
      await deleteApartment(byId);
   }

   toggleModalWindow = () => {
      this.setState({ activeModal: !this.state.activeModal })
   }

   render() {
      const { onEditApartment, apartmentByCity, main_image, title, label, description, number_of_bath, price, number_of_room, sqft, address, type, images, id, for_rent, for_sale, country,city, user, user_id } = this.props;
      
      const currentUser = user ? user.id : null;
      const { activeModal } = this.state
      return (
         <div className={'gallery-card col-xs-12 col-sm-10 col-md-6 col-lg-3 mt-5'}>
            <Link to={`/apartment/${id}`}>

               <div className={'title'}>{type === "apartments" ? title : label}</div>
               <div className={'box'}>

                  <CardImage img={main_image}
                     price={price}
                     type={type}
                     label={label}
                     images={images}
                     sale={for_sale}
                     rent={for_rent} 
                     description={description}/>


                  <CardDescribe description={description}
                     bath={number_of_bath}
                     room={number_of_room}
                     sqft={sqft}
                     address={address} type={type}
                     city={city}
                     country={country}
                     apartmentByCity={apartmentByCity}
                     user={user}
                     user_id={user_id}
                  />
               </div>
            </Link>
            {currentUser === user_id && window.location.href === 'http://localhost:3000/add-apartment'&&
               <div className={'profile-tool'}>
                  <i className={"fas fa-edit mr-3 edit-apartment-icon"} onClick={() => onEditApartment(id)} />
                  <i className={"fas fa-trash delete-apartment-icon"} onClick={() => this.toggleModalWindow()} />
                  <Modal show={activeModal} onHide={() => this.toggleModalWindow()}>
                     <Modal.Header closeButton>
                        <Modal.Title>Warning !</Modal.Title>
                     </Modal.Header>
                     <Modal.Body>Are you sure you want to delete this apartment ?</Modal.Body>
                     <Modal.Footer>
                        <button className={'btn btn-primary'} onClick={() => this.toggleModalWindow()}>Close</button>
                        <button className={'btn btn-danger'} onClick={() => this.deleteApt(id)}>Delete</button>
                     </Modal.Footer>
                  </Modal>
               </div>}

         </div>
      )
   }
}

export default Card;