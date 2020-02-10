import React from 'react';

class BatdRoomsButton extends React.Component {
    render() {
        const { handleChange } = this.props;
        return (
            <div className="form-group mr-2 mb-0">
                <select className="form-control" name={'bathroom'} onChange={handleChange}>
                    <option value={""}>Choose BathRooms</option>
                    <option value={'1'}>1 Bath Rooms</option>
                    <option value={'2'}>2 Bath Rooms</option>
                    <option value={'3'}>3 Bath Rooms</option>
                    <option value={'4'}>4 Bath Rooms</option>
                </select>
            </div>
        )
    }
}

export default BatdRoomsButton;