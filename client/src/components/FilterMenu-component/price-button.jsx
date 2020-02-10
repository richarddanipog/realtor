import React from 'react';

class PriceButton extends React.Component {
    render() {
        const { handleChange } = this.props;
        return (
            <div className="form-group ml-2 mr-2 mb-0">
                <select className="form-control" name={'price'} onChange={(e) => handleChange(e)}>
                    <option value={"-"}>Price</option>
                    <option value={'100000-300000'}>$100k - $300k</option>
                    <option value={'300000-600000'}>$300k - $600k</option>
                    <option value={'600000-900000'}>$600k - $900k</option>
                    <option value={'900000-3500000'}>$900k - $3.5M</option>
                    <option value={'3500000-'}>$3.5M - ANY</option>
                </select>
            </div>
        )
    }
}

export default PriceButton;