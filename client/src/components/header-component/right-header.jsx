import React from 'react';

class RightHeader extends React.Component{
    render() {
        return(
            <div className={'right-header d-flex'}>
                <span onClick={this.props.toggleModal}>Log in</span>
                <span>Sing Up</span>
            </div>
        )
    }
}

export default RightHeader;