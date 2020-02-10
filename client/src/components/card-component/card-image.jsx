import React from 'react';

class CardImage extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         hover: false,
      }
   }

   toggleHover = () => {
      this.setState({
         hover: !this.state.hover
      })
   };

   render() {
      const { img, price, description, images, type, rent, sale } = this.props;

      let backgroundImg;
      if (this.state.hover && images) {
         backgroundImg = {
            backgroundImage: `url(/${images.split(",")[Math.floor(Math.random() * images.split(",").length)]})`,
            transition: ' background-image .6s'
         }
      } else {
         backgroundImg = { backgroundImage: `url(/${img})`, transition: ' background-image .6s' }
      }

      return (
         <div className={'img-wrapper position-relative'} style={backgroundImg}
            onMouseOver={this.toggleHover}
            onMouseOut={this.toggleHover}>
            {price && type === 'apartments' && <div className={'price position-absolute'}>
               <div style={{ fontSize: '10px' }}>Co-op</div>
               ${price}
            </div>}
            {type === 'apartments' && <span className={'label position-absolute'}>{description}</span>}
            {rent && <div className={'rent position-absolute'}>For rent</div>}
            {sale && <div className={'sale position-absolute'}>For sale</div>}
            <svg className={'heart-logo'} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 31 31" focusable="false"><title>Save this home</title><path transform="translate(3 3)" fill="#000" fillOpacity="0.2" stroke="#FFF" strokeWidth="2" d="M18.5,0.00109769484 C22.0897727,0.00109769484 25,2.81119649 25,6.27991218 C25,8.06147091 24.2318182,9.66630077 22.9977273,10.8100988 L12.5,21 L1.8125,10.6256861 C0.690909091,9.49725576 0,7.96706915 0,6.27881449 C0,2.81119649 2.91022727,3.19744231e-14 6.5,3.19744231e-14 C9.20227273,3.19744231e-14 11.5193182,1.5949506 12.5,3.86388584 C13.4795455,1.5949506 15.7965909,0.00109769484 18.5,0.00109769484 L18.5,0.00109769484 Z"></path></svg>
         </div>
      )
   }
}

export default CardImage;
