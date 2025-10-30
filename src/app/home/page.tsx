import React from "react";
import HeroPage from "./Hero";
import MainCourse from "../menu/MainCourse";
import Drinks from "../menu/DrinksMenu";
import LuxuryVideoParallax from "./LuxuryVideoParallax";
import DrinkVideoParallax from "./DrinkVideoParallax";
import ExperienceShowcase from "./gallery/ExperienceShowcase";
import LuxuryFooter from "./LuxuryFooter";
import LuxuryContact from "./LuxuryContact";
import ExperienceGallery from "./gallery/ExperienceGallery";
import DoYouWantToOrder from "./order/DoYouWantToOrder";

const HomePage = () => {
  return (
    <>
      <HeroPage />
      <LuxuryVideoParallax
        videoId="lcU3pruVyUw"
        title="5 Star Restaurant"
        subtitle="Exquisite Luxury Dining Experience"
        description="Where culinary artistry meets unparalleled ambiance in an atmosphere of refined elegance and sophistication"
      />
      <MainCourse />
      <DrinkVideoParallax />
      <Drinks />
      <ExperienceGallery />
      <ExperienceShowcase />
      {/* <DoYouWantToOrder /> */}
      <LuxuryContact />
      <LuxuryFooter />
    </>
  );
};

export default HomePage;
