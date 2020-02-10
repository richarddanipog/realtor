import React, { Component } from 'react';
import { getAllUsers, getDataFromServer } from '../app-data/app-data-actions';
import Gallery from '../components/Gallery-compont/gallery';

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allApartments: [],
            allUsers: [],
            showApartments: false,
            showUsers: true
        }
    }

    async componentDidMount() {
        await getDataFromServer("data", this.getAllApartments, { size: 999999 })
        const users = await getAllUsers();
        this.setState({
            allUsers: users
        })
    }

    getAllApartments = (data) => {
        this.setState({
            allApartments: data.apartments
        })
    }

    onShow = () => {
        this.setState({
            showUsers: !this.state.showUsers,
            showApartments: !this.state.showApartments
        })
    }

    render() {
        const { allUsers, allApartments, showUsers, showApartments } = this.state;
        const { logOutUser, user } = this.props;
        
        const countUserActive = (arr)=>{
            let countUsers = 0
            for (let i=0; i<arr.length; i++){
                countUsers +=1
            }
            return countUsers
        }
        const listOfUsers = (user, i) => {
            return (
                <tr key={i}>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.status}</td>
                </tr>
            )
        }

        return (
            <div className={'row m-0'}>
                <div className={"bg-light border-right col-2"} id={"sidebar-wrapper"} style={{ height: '100vh' }}>
                    {user && <div className="sidebar-heading">{user.first_name} {user.last_name} <i className={"fas fa-user-circle"} style={{ fontSize: '25px' }} /></div>}
                    <div className="user-tool list-group list-group-flush">
                        <div onClick={() => this.onShow()}>All Apartment</div>
                        <div onClick={() => this.onShow()}>All Users</div>
                        <div onClick={() => logOutUser()}>Log Out</div>
                    </div>
                </div>
                <div className="col-10">
                    <div className={'row justify-content-around'}>
                        <div className="card bg-danger text-white mt-4 col-xl-3">
                            <div className="card-body">All User</div>
                            <div className="card-footer d-flex align-items-center justify-content-between">
                                <a className="small text-white stretched-link" href="/#">View Details : {allUsers.length} Users</a>
                                <div className="small text-white"><svg className="svg-inline--fa fa-angle-right fa-w-8" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg></div>
                            </div>
                        </div>
                        <div className="card bg-warning text-white mt-4 col-xl-3">
                            <div className="card-body">All Apartments</div>
                            <div className="card-footer d-flex align-items-center justify-content-between">
                                <a className="small text-white stretched-link" href="/#">View Details : {allApartments.length} Apartments</a>
                                <div className="small text-white"><svg className="svg-inline--fa fa-angle-right fa-w-8" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg></div>
                            </div>
                        </div>
                        <div className="card bg-primary text-white mt-4 col-xl-3">
                            <div className="card-body">Users Active</div>
                            <div className="card-footer d-flex align-items-center justify-content-between">
                                <a className="small text-white stretched-link" href="/#">View Details : {countUserActive(allUsers)} Users are active</a>
                                <div className="small text-white"><svg className="svg-inline--fa fa-angle-right fa-w-8" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg></div>
                            </div>
                        </div>
                        <div className="card bg-success text-white mt-4 col-xl-3">
                            <div className="card-body">Danger Card</div>
                            <div className="card-footer d-flex align-items-center justify-content-between">
                                <a className="small text-white stretched-link" href="/#">View Details</a>
                                <div className="small text-white"><svg className="svg-inline--fa fa-angle-right fa-w-8" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg></div>
                            </div>
                        </div>
                    </div>
                    {showUsers && <table id="example" className="table table-striped table-bordered mt-5" style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Fisrt Name</th>
                                <th>Last Name</th>
                                <th>Emain</th>
                                <th>Phone</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map((user, i) => listOfUsers(user, i))}
                        </tbody>
                    </table>}
                    {showApartments && <Gallery items={allApartments} />}
                </div>
            </div>
        );
    }
}

export default AdminPage;