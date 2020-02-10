import React from 'react';
import ApartmentDetails from "./apartment-details-component";
import '../../style-css/single-apartment-style.css'
import { Loader } from "../loader/loader";
import Header from '../header';
import { getCurrentApartment } from '../../app-data/app-data-actions'


class Apartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apartment: null,
            images: [],
            loading: true,
        }
    };

    async componentDidMount() {
        try {
            const currentApartment = await getCurrentApartment(this.props.match.params.id);
            this.setState({
                apartment:currentApartment[0],
                loading: false
            }, () => this.getImages())
        } catch (error) {
            console.log(error)
        }

    };

    getImages = () => {
        this.setState({
            images: this.state.apartment.images.split(',')
        })
    }

    render() {
        const { apartment, images, loading } = this.state;
        const { toggleUserMenu, activeUserMenu, toggleModal, logOutUser } = this.props
        return (
            <div>
                <Header toggleModal={toggleModal} user={this.props.user} toggleUserMenu={toggleUserMenu} activeUserMenu={activeUserMenu} logOutUser={logOutUser} />
                {loading ? <Loader /> :
                    <div>
                        <div className={'container-fluid'}>
                            <h4>{apartment.description} <i className="fas fa-medal" /></h4>
                        </div>

                        <div className={'row images m-0'} >
                            <div className={'col-sm-12 col-md-6 p-0 overflow-hidden'} style={{ height: '50vh' }}>
                                <img height={'100%'} width={'100%'} src={`http://localhost:3001/${images[0]}`} alt={""} />
                            </div>
                            <div className={'col-sm-12 col-md-6 p-0'}>
                                <div className={'row m-0'}>
                                    <div className={'col-6 p-0 overflow-hidden'} style={{ height: '25vh' }}><img height={'100%'} width={'100%'} src={`http://localhost:3001/${images[1]}`} alt={""} /></div>
                                    <div className={'col-6 p-0 overflow-hidden'} style={{ height: '25vh' }}><img height={'100%'} width={'100%'} src={`http://localhost:3001/${images[2]}`} alt={""} /></div>
                                    <div className={'col-6 p-0 overflow-hidden'} style={{ height: '25vh' }}><img height={'100%'} width={'100%'} src={`http://localhost:3001/${images[3]}`} alt={""} /></div>
                                    <div className={'col-6 p-0 overflow-hidden'} style={{ height: '25vh' }}><img height={'100%'} width={'100%'} src={`http://localhost:3001/${images[4]}`} alt={""} /></div>
                                </div>
                            </div>
                        </div>
                        <ApartmentDetails apartment={{ ...apartment }}  />
                    </div>
                }
            </div>
        )
    }
}

export default Apartment;