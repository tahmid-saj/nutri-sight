import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

import "./home.styles.scss";

import AboutLinks from "./about-links/about-links.component";

const spanStyle = {
  padding: '20px',
  // background: '#efefef',
  color: '#000000'
}

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '650px'
}

const slideImages = [
  {
    url: 'https://img.freepik.com/premium-photo/top-view-classic-spaghetti-pasta-with-tomato-sauce-dark-plate-copy-space_67155-5968.jpg',
    caption: 'Nutrient Predictor'
  },
  {
    url: 'https://img.freepik.com/premium-photo/background-cooking-black-wooden-background-top-view-free-space-your-text_187166-5650.jpg',
    caption: 'Nutrition Tracker'
  },
  {
    url: 'https://i.pinimg.com/736x/e6/7d/af/e67daf68a6e8f6d4a9283cb7d64b098c.jpg',
    caption: 'Recipes'
  },
  {
    url: 'https://img.freepik.com/free-photo/flat-lay-tasty-local-food-assortment-with-copy-space_23-2148833802.jpg',
    caption: 'Calories Tracker'
  },
];

const Home = () => {
  return (
    <div className="slide-container">
      <Slide>
      {slideImages.map((slideImage, index)=> (
          <div key={index}>
            <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
              <span style={ spanStyle }>{slideImage.caption}</span>
            </div>
          </div>
        ))} 
      </Slide>

      <AboutLinks />
    </div>
  );
};

export default Home;