import React from 'react';
import './gallery-style.css';
import './style-css/header.css';
import GalleryWrapper from "./components/Gallery-compont/gallery-wrapper";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/Home-page-component";
import Apartment from "./components/Apartment-component/apartment";
import Form from './components/add-apartment-Form.jsx';
import Footer from "./components/HomePage/footer-component";
import AdminPage from "./components/admin-component.jsx"
import Register from './components/header-component/register';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            invalidError: false,
            apartments: [],
            cities: [],
            loading: true,
            redirect: false,
            activeUserMenu: false
        }
    };
    
    componentDidMount(){
        if(Cookies.get('user')){
            this.setState({ user:JSON.parse(Cookies.get('user'))})
        }
    }

    setUser = (u) => {
        if (u) {
            this.setState({
                user: u,
                redirect: false
            }, () => this.toggleModal())
        } else {
            this.setState({
                invalidError: true,
            })
        }
    }

    logOutUser = () => {
        this.setState({
            user: null,
            redirect: true
        })
        Cookies.remove('user')
    }

    toggleUserMenu = () => {
        this.setState({ activeUserMenu: !this.state.activeUserMenu });
     }

    toggleModal = () => {
        this.setState({
            isPopupActive: !this.state.isPopupActive
        })
    };

    render() {
        const { user, invalidError ,activeUserMenu} = this.state;

        return (
            <Router>
                {this.state.redirect && <Redirect to={"/"} />}
                <div id={'app'}>

                    {this.state.isPopupActive &&
                        <Register toggleModal={this.toggleModal} setUser={this.setUser} invalidError={invalidError} />
                    }
                    <Switch>

                        <Route path={'/apartments'}>
                            <GalleryWrapper type={'apartments'} toggleModal={this.toggleModal} user={user} logOutUser={this.logOutUser} toggleUserMenu={this.toggleUserMenu} activeUserMenu={activeUserMenu}/>
                        </Route>
                        <Route path={'/apartment/:id'}
                            component={(props) => <Apartment {...props} activeUserMenu={activeUserMenu} toggleUserMenu={this.toggleUserMenu} toggleModal={this.toggleModal} user={user} logOutUser={this.logOutUser}/>} />
                        {user && <Route path={'/add-apartment'}>
                            <Form user={user} logOutUser={this.logOutUser}/>
                        </Route>}
                        <Route path={'/admin'}>
                            <AdminPage logOutUser={this.logOutUser} user={user}/>
                        </Route>
                        <Route path={'/'}>
                            <HomePage toggleModal={this.toggleModal} user={user} logOutUser={this.logOutUser} toggleUserMenu={this.toggleUserMenu} activeUserMenu={activeUserMenu}/>
                        </Route>
                    </Switch>
                    <Footer />
                </div>
            </Router>
        )
    }
}


export default App;
