import React from "react";
import {HomeHit} from "../data/static-recipe";
import {IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonCol, IonImg, IonRow} from "@ionic/react";
import './ListRecipeCard.css';

const ListRecipeCard: React.FC<{
  listRecipe: HomeHit[];
  goToRecipe: (href: string) => void;
}> = props => {

  return (
    <IonRow className="stylingEmptyPage">
      {props.listRecipe.length === 0 && <div className="searchEmpty">
          <img src={"assets/images/search.png"} alt="" />
            <h2 className="h2Card">Item not found</h2>
            <p>Try searching the item with a different keyword.</p>
          </div>}
      {props.listRecipe.map((recipe, index) => {
        return(
          <IonCol size={'6'} sizeSm={'4'} sizeMd={'3'} key={index}>
            <IonCard
              onClick={() => props.goToRecipe(recipe._links.self.href)}>
              <IonCardContent>
                <IonCardTitle>
                  {recipe.recipe.label.length > 20 ?
                    recipe.recipe.label.substr(0, 20) + "..."
                    :
                    recipe.recipe.label}
                </IonCardTitle>
              </IonCardContent>
              <IonImg src={recipe.recipe.image} />
            </IonCard>
          </IonCol>
        )
      })}

    </IonRow>
  )
}

export default ListRecipeCard;
