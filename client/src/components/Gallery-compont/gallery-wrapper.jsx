import React from 'react';
import FilterMenu from "../FilterMenu-component/filter-menu";
import Gallery from "./gallery";
import NotFound from '../FilterMenu-component/not-found';
import { Loader } from "../loader/loader";
import { getDataFromServer, getCountries } from "../../app-data/app-data-actions";
import Header from '../header';

class GalleryWrapper extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         items: [],
         loading:true,
         rooms: '',
         bathroom: '',
         sale_status: '',
         filteredItems: '',
         minPrice: '',
         maxPrice: '',
         firstPage: 1,
         country_id: '',
         query: {},
         disabled: false,
         countries: [],
         apartmentsLength: 0
      }
   }

   async componentDidMount() {
      getDataFromServer('data', this.handleSuccess, this.state.query);
      this.setState({
         query: { ...this.state.query, size: 99999 }
      })
      this.state.query.size = 999999;
      getDataFromServer('data', this.getApartmentLength, this.state.query);
      const countries = await getCountries();
      this.setState({
         countries: countries,
         query: {}
      })
   };

   componentDidUpdate() {
      window.scrollTo(0, 0);
   };

   getApartmentLength = (data) => {
      this.setState({
         apartmentsLength: data.apartments.length
      })
   }

   handleSuccess = (data) => {
      this.setState({
         items: data.apartments,
         loading: false
      })
   };

   handleChange = (e) => {
      e.preventDefault();
      const name = e.target.name;
      const value = e.target.value;
      if (name === 'price') {
         const priceArr = value.split('-');
         this.setState({
            minPrice: priceArr[0],
            maxPrice: priceArr[1]
         })
      } else {
         this.setState({
            [name]: value
         })
      }
   };

   toggleSubmit = (e) => {
      e.preventDefault();
      this.filterItemsByData()
   };

   filterItemsByData = async () => {
      const { rooms, minPrice, maxPrice, bathroom, sale_status, country_id } = this.state;

      if (sale_status || sale_status === "") {
         this.setState({
            sale_status: sale_status,
            query: await { ...this.state.query, sale_status }
         }, () => { getDataFromServer('data', this.handleSuccess, this.state.query) })
      }

      if (rooms || rooms === "") {
         this.setState({
            rooms: rooms,
            query: {
               ...this.state.query,
               number_of_room: await rooms
            }
         })
      }
      if (bathroom || bathroom === "") {
         this.setState({
            bathroom: bathroom,
            query: {
               ...this.state.query,
               number_of_bath: await bathroom
            }
         });
      }
      if (minPrice || minPrice === "") {
         this.setState({
            minPrice: minPrice,
            query: {
               ...this.state.query,
               minPrice:await minPrice
            }
         });
      }
      if (maxPrice || maxPrice === "") {
         this.setState({
            maxPrice: maxPrice,
            query: {
               ...this.state.query,
               maxPrice:await maxPrice
            }
         });
      }
      if (country_id || country_id === "") {
         this.setState({
            country_id: country_id,
            query: {
               ...this.state.query,
               country_id
            }
         });
      }
      this.setState({
         query: {
            ...this.state.query,
            size: 9999
         }
      }, () => getDataFromServer('data', this.handleSuccess, this.state.query))
   };


   onNextPage = async () => {
      if (this.state.firstPage * 12 < this.state.apartmentsLength) {
         this.setState({
            query: {
               ...this.state.query,
               page: await this.state.firstPage + 1
            }
         })
         if (this.state.items.length !== 0) {
            this.setState({
               firstPage: this.state.firstPage + 1,
            })
         }
         await getDataFromServer('data', this.handleSuccess, this.state.query);
      }
   };

   onPreviousPage = async () => {
      this.setState({
         query: {
            ...this.state.query,
            page: await this.state.firstPage - 1
         }
      })
      getDataFromServer('data', this.handleSuccess, this.state.query)
      this.setState({
         firstPage: this.state.firstPage - 1,
      })
   };

   render() {
      const { city, loading, items, firstPage, countries } = this.state;
      console.log(items)
      const { type, toggleModal, user, logOutUser, toggleUserMenu, activeUserMenu } = this.props;
      return (
         <div>
            <Header toggleModal={toggleModal} user={user} logOutUser={logOutUser} toggleUserMenu={toggleUserMenu} activeUserMenu={activeUserMenu} />
            {type === 'apartments' && <FilterMenu handleChange={this.handleChange}
               resetFilters={this.resetFilters}
               toggleSubmit={this.toggleSubmit}
               city={city}
               countries={countries} />}
            {loading ? Loader() : <div className={'container-fluid'}>
               {items.length !== 0 ? <Gallery items={items} type={type} user={user} />
               :
               <NotFound/>
               }
               <br />
            </div>}
            <nav aria-label={"Page navigation example"}>
               <ul className={"pagination justify-content-center"}>
                  <li className={`page-item ${firstPage === 1 && "disabled"}`} style={{ color: '#000', cursor: "pointer" }}>
                     <span className={"page-link"}  onClick={() => this.onPreviousPage()}>Prev</span>
                  </li>
                  <li className={"page-item"}><span className={"page-link"} style={{ color: '#000', cursor: "pointer" }}>{firstPage}</span></li>
                  <li className={`page-item`}>
                     <span className={`page-link`} title={'Next Page'} style={{ color: '#000', cursor: "pointer" }} onClick={() => this.onNextPage()}>Next</span>
                  </li>
               </ul>
            </nav>
            <div className={"parallax d-flex justify-content-center align-items-center mt-5"} style={{ backgroundImage: 'url(../../images/neighborhoods.jpg)', color: '#fff' }}>
               <div>
                  <h1>Search For Your Neighbors</h1>
               </div>
            </div>
         </div>
      )
   }
}

export default GalleryWrapper;