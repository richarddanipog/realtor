import React, { Component } from 'react';
import "../../style-css/register-style.css"
import { loginUser, signUpUser } from '../../app-data/app-data-actions';
import validate, { field } from '../../app-data/validator';
import InputErrors from '../../app-data/inputErrors';
import {Redirect} from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            active: true,
            containerClassName: '',
            email: field({ name: 'email', isRequired: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ }),
            password: field({ name: 'password', isRequired: true, minLength: 5 }),
            phone: field({ name: 'phone', isRequired: true, minLength: 10 }),
            first_name: field({ name: 'first_name', isRequired: true, minLength: 2 }),
            last_name: field({ name: 'last_name', isRequired: true, minLength: 2 }),
        }
    }
    toggleRegister = () => {
        this.setState({
            containerClassName: !this.state.active ? '' : 'right-panel-active',
            active: !this.state.active
        })
    }

    handleChange = ({ target: { name, value } }) => {
        const errors = validate(name, value, this.state[name].validations);
        this.setState({
            [name]: {
                ...this.state[name],
                value,
                errors
            }
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let isOK = true;

        for (let prop in this.state) {
            let errors;
            const field = this.state[prop];
            if (field instanceof Object) {
                errors = validate(prop, field.value, field.validations);
            } else {
                continue;
            }
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
        isOK = true;
        if (isOK) {
            const result = {};
            for (let prop in this.state) {
                if (this.state[prop] instanceof Object) {
                    result[prop] = this.state[prop].value;
                } else {
                    continue;
                }
            }
            //Send the data somewhere
            loginUser({ email: this.state.email.value, password: this.state.password.value })
                .then(sucsess => this.props.setUser(sucsess.data));
        }
    }

    onSignUpUser = async (e) => {
        e.preventDefault();
        const { email, password, phone, first_name, last_name } = this.state
        await signUpUser({ email: email.value, password: password.value, first_name: first_name.value, last_name: last_name.value, phone: phone.value });
        this.setState({
            redirect: !this.state.redirect
        })
    }

    render() {
        const { containerClassName ,redirect} = this.state;
        const { invalidError } = this.props;

        if(redirect){
            return <Redirect to={"/"}/>
        }
        return (
            <div className={'pop-style'}>
                <div className={`mt-5 register position-absolute container ${containerClassName}`} id="container">
                    <div className="form-container sign-up-container">
                        <form action="#">
                            <h1>Create Account</h1>
                            <div className="social-container">
                                <a href="/#" className="social"><i className="fab fa-facebook-f"></i></a>
                                <a href="/#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                <a href="/#" className="social"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>or use your email for registration</span>
                            <div className={"row"}>
                                <div className={"col-6"}><input type="text" placeholder="First Name" name={'first_name'} onChange={this.handleChange} required minLength={5} />
                                    <InputErrors errors={this.state.first_name.errors}></InputErrors></div>
                                <div className={"col-6"}><input type="text" placeholder="Last Name" name={'last_name'} onChange={this.handleChange} required minLength={5} />
                                    <InputErrors errors={this.state.last_name.errors}></InputErrors></div>

                            </div>
                            <input type="email" placeholder="Email" name={'email'} onChange={this.handleChange} required />
                            <InputErrors errors={this.state.email.errors}></InputErrors>
                            <input type="phone" placeholder="Phone" name={'phone'} onChange={this.handleChange} required />
                            <InputErrors errors={this.state.phone.errors}></InputErrors>
                            <input type="password" placeholder="Password" name={'password'} onChange={this.handleChange} required minLength={5} />
                            <InputErrors errors={this.state.password.errors}></InputErrors>
                            <button onClick={e => this.onSignUpUser(e)}>Sign Up</button>
                        </form>
                        <button className={'exit-logIn'} onClick={this.props.toggleModal}><b>X</b></button>
                    </div>
                    <div className="form-container sign-in-container">
                        <form action="/#">
                            <h1>Sign in</h1>
                            <div className="social-container">
                                <a href="/#" className="social"><i className="fab fa-facebook-f"></i></a>
                                <a href="/#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                <a href="/#" className="social"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>or use your account</span>
                            <input type="email" placeholder="Email" name={'email'} onChange={this.handleChange} />
                            <input type="password" placeholder="Password" name={'password'} onChange={this.handleChange} />
                            {invalidError && <label className="form-text text-danger">invalid email or password</label>}
                            <a href="/#">Forgot your password?</a>
                            <button onClick={(e) => this.onSubmit(e)}>Sign In</button>
                        </form>
                        <button className={'exit-logIn'} onClick={this.props.toggleModal}><b>X</b></button>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button className="ghost" id="signIn" onClick={() => this.toggleRegister()}>Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button className="ghost" id="signUp" onClick={() => this.toggleRegister()}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;