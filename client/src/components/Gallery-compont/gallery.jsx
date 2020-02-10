import React from 'react';
import Card from "../card-component/card-component";

class Gallery extends React.Component {
   getApartmentsByCity = (apartments,cities) => {
      return cities.map((city) => {
         const cityId = city.id;
         return apartments.filter(apartment => apartment.cityId === cityId);
      });
   }

   render() {
      const {items, type ,apartments,user,onEditApartment} = this.props;
      const apartmentByCity = type === 'cities'  && apartments && this.getApartmentsByCity(apartments,items);

      const buildGalleryItems = () => {
         return items.map((item, i) => {
            return <Card {...item}
                         type={type}
                         key={i}
                         apartmentByCity={apartmentByCity[i]}
                         user={user}
                         onEditApartment={onEditApartment}/>
         })
      };

      return (
         <div className={'gallery-row row'}>
            {buildGalleryItems()}
         </div>
      )
   }
}

export default Gallery;