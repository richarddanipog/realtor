import React, { Component } from 'react';

class NotFound extends Component {
    render() {
        return (
            <div data-aos="fade-up" data-aos-duration="2000" data-aos-anchor-placement="bottom-bottom" className={'not-found d-flex justify-content-center align-items-center text-center mt-5'} style={{ height: '60vh', background: ' linear-gradient(45deg, rgba(73,155,234,1) 0%, rgba(26,188,156,1) 100%)', color: '#fff', borderRadius: '10px' }}>
                <h1>We did not find any results for the requested search<br />Please try another search</h1>
            </div>
        );
    }
}

export default NotFound;