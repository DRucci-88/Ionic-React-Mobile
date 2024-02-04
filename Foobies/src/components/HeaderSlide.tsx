import React from "react";
import {FreeMode} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react/swiper-react";
import {IonCard, IonCardContent, IonCardTitle} from "@ionic/react";
import './HeaderSlide.css';
const HeaderSlide: React.FC<{
  slideHeader: Array<string>;
  setCategory: (selectedCategory: string) => void;
}> = props => {
  return(
    <Swiper
      modules={[FreeMode]}
      freeMode={true}
      slidesPerView={3}>
      {props.slideHeader.map((header, index) => {
        return (
          <SwiperSlide
            key={index}
            onClick={() => props.setCategory(header)}
          >
            <IonCard>
              <IonCardContent>
                <IonCardTitle className={'category'}>
                  {header}
                </IonCardTitle>
              </IonCardContent>
            </IonCard>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default HeaderSlide;