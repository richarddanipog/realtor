import React from 'react';
import { Carousel } from 'react-bootstrap';
import ApartmentForm from "./single-apartment-form";

class ApartmentCarouselImages extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         imgNumber: 1
      }
   }

   galleyImagesApt = (images) => {
      return images.split(",").map((img, i) => {
         return <Carousel.Item key={i}>
            <img className={'single-image w-100'} src={"http://localhost:3001/" + img} alt={'apartments'} />
         </Carousel.Item>
      })
   };

   numberImageActive = () => {
      this.state.imgNumber > this.props.images.split(",").length - 1 ?
         this.setState({
            imgNumber: 1
         })
         :
         this.setState({
            imgNumber: this.state.imgNumber + 1
         })
   };

   checkIfSale = (status) => {
      return status == 'sale' ? "Active" : "No Active"
   };

   render() {
      const { apartment, images } = this.props;
      const { imgNumber } = this.state;
      return (
         <div className={'carousel-images mt-5'}>
            <div>
               <Carousel onSlideEnd={this.numberImageActive} indicators={false}>
                  {this.galleyImagesApt(images)}
               </Carousel>
            </div>

            <div className={'business-card d-flex position-absolute'}>
               <img src={"http://www.leesharing.com/wp-content/uploads/2018/03/1-171.jpg"} width={'100px'}
                  alt={"brand"} />
               <p>Present By: Apt. {apartment.id}<br /> {apartment.title}</p>
            </div>
            <div className={'upload-time position-absolute'}>NEW - 11 HOURS AGO</div>
            <div className={'status-apartment position-absolute'}>For Sale
               - {this.checkIfSale(apartment.sale_status)}</div>
            <div className={'icon-heart active'}>
               <i className="far fa-heart" />
            </div>
            <div className={'current-image position-absolute'}><i
               className="fas fa-camera-retro mr-1" /> {imgNumber} / {images.split(",").length}</div>
            <ApartmentForm />
         </div>
      )
   }
}

export default ApartmentCarouselImages;