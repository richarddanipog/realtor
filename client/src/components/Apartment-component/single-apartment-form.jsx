import React from "react";

class ApartmentForm extends React.Component {
    render() {
        return (
            <form className={'apartment-form active'}>
                <h6>More about the apartment</h6>
                <div className="input-group mb-2 mr-sm-2">
                    <i className="fas fa-user-alt ml-2" />
                    <input type="text" className="form-control" id="inlineFormInputGroupUsername1" placeholder="Full Name" />
                </div>
                <div className="input-group mb-2 mr-sm-2">
                    <i className="far fa-envelope ml-2" />
                    <input type="text" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Email" />
                </div>
                <div className="input-group mb-2 mr-sm-2">
                    <i className="fas fa-phone ml-2" />
                    <input type="text" className="form-control" id="inlineFormInputGroupUsername3" placeholder="Phone" />
                </div>
                <div><textarea type="text" className="form-control" id="inlineFormInputGroupUsername4" placeholder="Text Here..." ></textarea></div>
                <button className={'btn btn-danger'}>
                    <i className="fas fa-envelope-open-text mr-2"></i>
                    Contact User
                </button>
            </form>
        )
    }
}

export default ApartmentForm;