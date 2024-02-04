import React from "react";
import {Autoplay, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react/swiper-react";
import {IonCard, IonCardContent, IonCardTitle, IonImg} from "@ionic/react";
import {HomeHit} from "../data/static-recipe";
import './HeaderSlide.css';

const DataSlider: React.FC<{
  slideData: Array<HomeHit>;
  goToRecipe: (href: string) => void;
}> = props => {
  return(
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={10}
      slidesPerView={2}
      loop={true}
      lazy={true}
      pagination={{clickable: true}}
      autoplay={{"delay": 3000, "disableOnInteraction": false}}
    >
      {props.slideData.map((recipe, index) => {
            return (
              <SwiperSlide key={index} className={'ion-margin-bottom'}>
                <IonCard onClick={() => props.goToRecipe(recipe._links.self.href)}>
                  <IonImg src={recipe.recipe.image} alt={recipe.recipe.label} className={'image'}/>
                  <IonCardContent>
                    <IonCardTitle className={'title'}>{recipe.recipe.label}</IonCardTitle>
                  </IonCardContent>
                </IonCard>
              </SwiperSlide>
            )
          }
        )}
    </Swiper>
  )
}

export default DataSlider;