import React from "react";
import {Link} from "react-router-dom";
import Gallery from "../Gallery-compont/gallery";

export default class SectionRecommended extends React.Component{
   render() {
      const{cities,apartments} = this.props;
      return (
         <section className={'mt-5'}>
            <h3>Recommended Cities</h3>
            <Link to={'/cities'}>All Cities</Link>
            <Gallery items={cities} type={'cities'} apartments={apartments}/>
         </section>
      )
   }
}