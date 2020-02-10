import React from 'react'
import RoomButton from "./room-button";
import PriceButton from "./price-button";
import BatdRoomsButton from "./beds-button";

class FilterMenu extends React.Component {
    render() {
        const { handleChange, toggleSubmit ,countries} = this.props;

        const countriesList = (country) =>{
            return <option value={country.id} key={country.id}>{country.name}</option>
        }

        return (
            <div className={'filter'}>
                <form className={'filter-navigation d-flex mt-2 flex-wrap'} onSubmit={e => toggleSubmit(e)}>
                    <PriceButton handleChange={handleChange}/>
                    <RoomButton handleChange={handleChange} />
                    <BatdRoomsButton handleChange={handleChange} />

                    <div className="form-group mr-2 mb-0">
                        <select className="form-control" name={'sale_status'} onChange={(e) => handleChange(e)}>
                            <option value={""}>Choose Rent/Sale</option>
                            <option value={'rent'}>Rent</option>
                            <option value={'sale'}>Sale</option>
                            <option value={'both'}>Both</option>
                        </select>
                    </div>

                    <div className="form-group mr-2 mb-0">
                        <select className="form-control" name={'country_id'} onChange={(e) => handleChange(e)}>
                            <option value={""}>Countries</option>
                            {countries.map(country => countriesList(country))}
                        </select>
                    </div>
                    <button type="submit" className="ml-3">Submit</button>
                </form>

            </div>
        )
    }
}

export default FilterMenu;