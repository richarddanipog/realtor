import React from 'react';

class RoomButton extends React.Component {
    render() {
        const {handleChange} = this.props;
        return (
            <div className="form-group mr-2 mb-0 ml-2">
                <select className="form-control" name={'rooms'} onChange={(e) => handleChange(e)}>
                    <option value={""}>Choose Rooms</option>
                    <option value={'1'}>1 Rooms</option>
                    <option value={'2'}>2 Rooms</option>
                    <option value={'3'}>3 Rooms</option>
                    <option value={'4'}>4 Rooms</option>
                </select>
            </div>
        )
    }

}

export default RoomButton;