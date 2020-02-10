import React from 'react';

class CardDescribe extends React.Component {
   render() {
      const { bath, room, sqft, address ,city,country} = this.props;
      return (
         <div className={'apartment-info row m-0'}>

            {bath && <div className={'col-4 mt-2'}>
               <span><b>{bath}</b> bath</span>
            </div>}
            {room && <div className={'col-4 mt-2'}>
               <span><b>{room}</b> Rooms</span>
            </div>}
            {sqft && <div className={'col-4 mt-2'}>
               <span><b>{sqft}</b> Sqft</span>
            </div>}
            {city && country && <div className={'col-12'}>
               <span>
                  <span className={'mr-2'}>{address}</span> 
                  <b>{city}</b>,<b>{country}</b>
                  </span>
            </div>}
         </div>
      )
   }
}

export default CardDescribe;