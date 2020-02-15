import React from 'react';
import GoogleMaps from "./google-maps-component";
import ApartmentForm from '../Apartment-component/single-apartment-form';

class ApartmentDetails extends React.Component {
    render() {
        const { apartment } = this.props;
        return (
            <div className={'container-fluid details'}>
                <h2 className={'pt-3 pb-3'} style={{ fontWeight: 'bold' }}>$ {apartment.price} </h2>
                <div className={'row mr-5'}>
                    <div className={'col-sm-12 col-lg-6'}>
                        <span>
                            <b>{apartment.number_of_bath}</b> bath <i className="fas fa-bath" />
                        </span>
                        <span>
                            <b>{apartment.number_of_room}</b> rooms <i className="fas fa-door-open" />
                        </span>
                        {apartment.sqft && <span><b>{apartment.sqft}</b> sqft </span>}
                        <span>
                            {apartment.address},
                    </span>
                        <span style={{ color: 'grey', textDecoration: 'underline' }}>{apartment.city}</span>
                        <span style={{ color: 'grey', textDecoration: 'underline' }}>{apartment.country}</span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    <GoogleMaps getCityName={apartment.city} />
                </div>
                <ApartmentForm />
                <div className={'mt-5'}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
        )
    }
}

export default ApartmentDetails;