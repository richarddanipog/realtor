import React from 'react';
import ApartmentCarouselImages from "./carousel-apartment-images";
import ApartmentDetails from "./apartment-details-component";
import '../../style-css/single-apartment-style.css'
import { Loader } from "../loader/loader";
const axios = require('axios')

class Apartment extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         apartment: [],
         apartmentLocation: null,
         loading: true,
      }
   };

   componentDidMount() {
      axios.get(`/apartments/${this.props.match.params.id}`)
         .then(sucsess => this.setState({
            apartment: sucsess.data[0][0],
            apartmentLocation: sucsess.data[1][0][0],
            loading: false
         }))
   };
   componentDidUpdate() {
      window.scrollTo(0, 0);
   }
   render() {
      const { apartment, apartmentLocation, loading } = this.state;
      const getCityName = this.props.cities ? this.props.cities.find(city => city.id === apartment.cityId) : undefined;
      return (
         <div>
            {loading ? <Loader /> :
               <div className={'container-fluid'}>
                  <ApartmentCarouselImages images={apartment.images} apartment={{ ...apartment }} />
                  <ApartmentDetails apartment={{ ...apartment }} getCityName={getCityName} apartmentLocation={apartmentLocation} />
                  <br /><br />
               </div>
            }
         </div>
      )
   }
}

export default Apartment;