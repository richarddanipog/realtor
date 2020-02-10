import React from "react";
import { getDataFromServer } from "../../app-data/app-data-actions";
import Gallery from "../Gallery-compont/gallery";
import { Loader } from "../loader/loader";


class SectionApartment extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: true,
         randomApartments: [],
         randomCities: []
      }
   }

   async componentDidMount() {
      await getDataFromServer('data', this.handleSuccess)
   }

   handleSuccess = (data) => {
      this.setState({
         randomApartments: data["apartments"],
         loading: false
      })
   }

   render() {
      const { loading, randomApartments, randomCities } = this.state;
      return (
         <section className={'container-fluid mt-4 gallery-apartments'}>
            {loading ? <Loader /> : <header>
               <div data-aos="fade-up" data-aos-duration={"1000"} data-aos-mirror={"true"} className={'text-center pb-4'} style={{borderBottom: '1px solid lightgrey'}}>
               <h3>We have the most listings and constant updates.<br/>So you’ll never miss out.</h3>
               </div>
               <div data-aos={"fade-right"} data-aos-duration={"1000"} data-aos-mirror={"true"}>
                  <Gallery items={randomApartments.slice(4, 8)} type={'apartments'} cities={randomCities} />
               </div>
            </header>}
         </section>
      )
   }
}

export default SectionApartment;