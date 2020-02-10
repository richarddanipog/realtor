import React, { Component } from 'react';
import '../style-css/add-apartment.css'
import validate, { field } from '../app-data/validator';
import InputErrors from '../app-data/inputErrors';
import { inputImages } from '../app-data/files-images'
import { getUserApartments, addApartments, getCities, editApartments } from '../app-data/app-data-actions';
import Gallery from '../components/Gallery-compont/gallery';
import UserDetails from '../components/user-details';
import { Redirect } from 'react-router-dom';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: field({ name: 'address', isRequired: true, minLength: 5 }),
            price: field({ name: 'price', isRequired: true }),
            number_of_room: field({ name: 'Number of rooms', isRequired: true }),
            number_of_bath: field({ name: 'Number of bath', isRequired: true }),
            image: field({ name: 'image', isRequired: false }),
            sale_status: field({ name: 'sale_status', isRequired: true }),
            property_type: field({ name: 'sale_status', isRequired: true }),
            sqft: field({ name: 'sqft', isRequired: true, minLength: 2 }),
            description: field({ name: 'description', isRequired: true, minLength: 3 }),
            city_id: field({ name: 'city_id', isRequired: true, minLength: 2 }),
            images: field({ name: 'images', isRequired: false, imagesLength: 0 }),
            availability: "available",
            status: 'pending',
            apartmentsUser: [],
            cities: [],
            redirectTo: false,
            edit: false
        }

        this.inputChange = this.inputChange.bind(this);
    }

    async componentDidMount() {
        if (this.props.user) {
            const apartments = await getUserApartments(this.props.user.id);
            const citiesData = await getCities();
            this.setState({
                apartmentsUser: apartments.data.apartments,
                cities: citiesData
            })
        }
    }

    //Bind the function will use the prototype chain, Ya'ani - 1 method per class
    inputChange({ target: { name, value, files } }) {
        /*preview images */
        if (files) { inputImages(files) }

        const errors = validate(name, value, this.state[name].validations);
        if (files) {
            this.setState({
                [name]: {
                    ...this.state[name],
                    files,
                    errors
                }
            });
        } else {
            this.setState({
                [name]: {
                    ...this.state[name],
                    value,
                    errors
                }
            });
        }
    }

    //Each object will have this onSubmit method - Ya'ani - 1 method per object!  A copy
    onSubmit =  (e) => {
        e.preventDefault();
        const form_data = new FormData();
        let isOK = true;
        for (let prop in this.state) {
            let errors;
            const field = this.state[prop];
            if (field.validations !== undefined) {
                errors = validate(prop, field.value, field.validations);
                if (errors.length) {
                    isOK = false;
                    this.setState({
                        [prop]: {
                            ...this.state[prop],
                            errors
                        }
                    });
                }
            }
        }
        if (isOK) {
            for (let prop in this.state) {
                if (this.state[prop] instanceof Object) {
                    if (prop === 'image') {
                        form_data.append('images', document.querySelector('.image').files[0])
                    }
                    if (prop === 'images') {
                        for (let i = 0; i < document.querySelector('.images').files.length; i++) {
                            form_data.append(prop, document.querySelector('.images').files[i])
                        }
                    }
                    else {
                        form_data.append(prop, this.state[prop].value)
                    }
                } else {
                    continue;
                }
            }
            if (this.props.user) {
                form_data.append("user_id", this.props.user.id)
            }
            form_data.append("availability", this.state.availability);
            form_data.append("status", this.state.status)
            if (this.state.edit) {
                 editApartments(form_data);
            } else {
                 addApartments(form_data)
                this.setState({
                    redirectTo: true
                })
            }
        }
    }

    onEditApartment = (byId) => {
        const editCurrentApartment = this.state.apartmentsUser.find(a => a.id === byId);
        const images = editCurrentApartment.images.split(',');
        inputImages(images);
        inputImages([editCurrentApartment.main_image]);
        this.setState({
            apartment_id: { name: 'apartment_id', value: byId },
            address: field({ name: 'address', value: editCurrentApartment.address, isRequired: true, minLength: 5 }),
            price: field({ name: 'price', value: editCurrentApartment.price, isRequired: true }),
            number_of_room: field({ name: 'Number of rooms', value: editCurrentApartment.number_of_room, isRequired: true }),
            number_of_bath: field({ name: 'Number of bath', value: editCurrentApartment.number_of_bath, isRequired: true }),
            sqft: field({ name: 'sqft', value: editCurrentApartment.sqft, isRequired: true, minLength: 2 }),
            description: field({ name: 'description', value: editCurrentApartment.description, isRequired: true, minLength: 3 }),
        })
        window.scrollTo(0, 0);
        this.setState({ edit: !this.state.edit })
    }

    render() {
        const { address, price, number_of_room, number_of_bath, image, sqft, description, cities } = this.state;
        const { user } = this.props;
        const citiesName = (data) => {
            return data.map((city, i) => <option key={i} value={city.id}>{city.name}</option>)
        }
        if (this.state.redirectTo === true) {
            console.log("redirect was true")
            return <Redirect to={'/apartments'} />
        }


        return (<div className={'container-fluid row'}>
            <div className={"bg-light border-right col-2"} id={"sidebar-wrapper"}>
                <div className="sidebar-heading">{user.first_name} {user.last_name} <i className={"fas fa-user-circle"} style={{ fontSize: '25px' }} /></div>
                <div className="user-tool list-group list-group-flush">
                    <a href={"#apartments-user"}>Active Apartment</a>
                    <a href={"#user-details"}>Details</a>
                    <a href={"/#"} onClick={this.props.logOutUser}>Log Out</a>
                </div>
            </div>
            <div className={'col-10'}>
                <div className={"alert alert-success add-apartments"} role={"alert"}>
                    <h4 className={"alert-heading text-center"}>ADD Apartment ?</h4>
                    <p className={"text-center"}>
                        Please fill in your details
                </p>
                    <hr style={{ color: 'white' }} />
                    <form onSubmit={this.onSubmit}>
                        <div className={"row form-group"}>
                            <div className={"col-md-3"}>
                                <label htmlFor={"exampleInputEmail1"}>Apt. Address</label>
                                <input type={"text"} value={address.value} name={"address"} className="form-control" placeholder={"Address"}
                                    onChange={this.inputChange}
                                ></input>
                                <InputErrors errors={address.errors}></InputErrors>
                            </div>
                            <div className={"col-md-3"}>
                                <label htmlFor={"exampleInputEmail1"}>Price</label>
                                <input type={"number"} path={"note"} value={price.value} name={"price"} className={"form-control"} placeholder={"Price"}
                                    onChange={this.inputChange}
                                ></input>
                                <InputErrors errors={this.state.price.errors}></InputErrors>
                            </div>
                            <div className={"col-md-3"}>
                                <label htmlFor={"exampleInputEmail1"}>Sqft</label>
                                <input type={"number"} value={sqft.value} name={"sqft"} className={"form-control"} placeholder={"Sqft"}
                                    onChange={this.inputChange}
                                ></input>
                                <InputErrors errors={sqft.errors}></InputErrors>
                            </div>
                            <div className={"col-md-3"}>
                                <label htmlFor={"exampleInputEmail1"}>Rooms</label>
                                <input type={"number"} value={number_of_room.value} name={"number_of_room"} className={"form-control"} placeholder={"Number Of Rooms"}
                                    onChange={this.inputChange}
                                ></input>
                                <InputErrors errors={number_of_room.errors}></InputErrors>
                            </div>
                            <div className={"col-md-3"}>
                                <label htmlFor={"exampleInputEmail1"}>Bath Rooms</label>
                                <input type={"number"} value={number_of_bath.value} name={"number_of_bath"} className={"form-control"} placeholder={"Bath Rooms"}
                                    onChange={this.inputChange}
                                ></input>
                                <InputErrors errors={number_of_bath.errors}></InputErrors>
                            </div>
                            {this.state.cities && <div className={'col-md-3'}>
                                <label htmlFor={"exampleInputEmail1"}>Choose City</label>
                                <select className={"form-control"} name={'city_id'} onChange={this.inputChange}>
                                    <option value={""}>Cities</option>
                                    {citiesName(cities)}
                                </select>
                            </div>}
                            <div className={"form-group col-md-10"}>
                                <label htmlFor={"exampleFormControlTextarea1"}>Description</label>
                                <textarea className={"form-control"} id={"exampleFormControlTextarea1"} rows={"3"} value={description.value} name={'description'} onChange={this.inputChange}></textarea>
                            </div>

                            <div className={'col-md-6'}>
                                <select className={"form-control"} name={'sale_status'} onChange={this.inputChange}>
                                    <option value={""}>Choose Rent/Sale</option>
                                    <option value={'rent'}>Rent</option>
                                    <option value={'sale'}>Sale</option>
                                    <option value={'both'}>Both</option>
                                </select>
                            </div>
                            <div className={'col-md-6'}>
                                <select className={"form-control"} name={'property_type'} onChange={this.inputChange}>
                                    <option value={""}>Property Type</option>
                                    <option value={'house'}>House</option>
                                    <option value={'ranch'}>Ranch</option>
                                    <option value={'condo'}>Condo</option>
                                    <option value={'land'}>Land</option>
                                </select>
                            </div>

                            <div className={"form-group col-sm-10 mt-4"}>
                                <label htmlFor={"inputPassword3"} className={"col-form-label mr-5"}>Apt. Upload Images </label>
                                <div>
                                    <input className={'images'} type={"file"} multiple
                                        id={"avatar1"} name={"images"}
                                        accept={"image/png, image/jpeg"} onChange={this.inputChange} />
                                    <InputErrors errors={image.errors}></InputErrors>
                                </div>
                                <div>
                                    <img id={'img-0'} className={'mt-2 mr-2'} width={"250px"} alt={''} />
                                    <img id={'img-1'} className={'mt-2 mr-2'} width={"250px"} alt={''} />
                                    <img id={'img-2'} className={'mt-2 mr-2'} width={"250px"} alt={''} />
                                    <img id={'img-3'} className={'mt-2 mr-2'} width={"250px"} alt={''} />
                                    <img id={'img-4'} className={'mt-2 mr-2'} width={"250px"} alt={''} />
                                </div>
                            </div>
                            <div className={"form-group col-sm-6"}>
                                <label htmlFor={"inputPassword3"} className={"col-form-label"}>Apt Main Image</label>
                                <div>
                                    <input className={'image'} type={"file"}
                                        id={"img"} name={"image"}
                                        accept={"image/png, image/jpeg"} onChange={this.inputChange} />
                                    <img id={"main-img"} className={'mt-2'} width={"250px"} alt={''} />
                                    <InputErrors errors={this.state.image.errors}></InputErrors>
                                </div>
                            </div>
                        </div>
                        <input type={"submit"} className={"btn btn-primary btn-block"} value={"submit"} />
                    </form>
                </div>
                <UserDetails user={user} />

                <div id={'apartments-user'} className={'container-fluid'} data-aos={"fade-right"} data-aos-duration={"2000"} data-aos-mirror={"true"}>
                    <h1>Your Active Apartments</h1>
                    {this.props.user && <Gallery items={this.state.apartmentsUser} user={user} onEditApartment={this.onEditApartment} />}
                </div>
            </div>
        </div>)
    }
}