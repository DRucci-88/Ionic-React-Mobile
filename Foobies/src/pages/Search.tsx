import React, {useRef, useState} from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonPage,
  IonRow,
  IonSearchbar, useIonAlert, useIonLoading, useIonViewDidEnter
} from "@ionic/react";
import AppBar from "../components/AppBar";
import ListRecipeCard from "../components/ListRecipeCard";
import {HomeHit} from "../data/static-recipe";
import axios from "axios";
import {getListRecipeWithSearch} from "../data/config-api";
import {useHistory} from "react-router";

const Search: React.FC = () => {

  const searchInputRef = useRef<HTMLIonSearchbarElement>(null)
  const [listRecipe, setListRecipe] = useState<HomeHit[]>([]);
  const [presentLoader, dismissLoader] = useIonLoading();
  const [errorAlert] = useIonAlert();
  const history = useHistory();

  const getRecipeFromAPI = async () => {
    const searchInput = searchInputRef.current?.value as string;
    const url = getListRecipeWithSearch(searchInput);
    presentLoader({
      message: "Please Wait ...",
      spinner: 'bubbles',
      backdropDismiss: true,
      duration: 4000
    });
    await axios.get(url)
      .then((response) => {
        setListRecipe(response.data.hits);
        // console.log(response.data.hits as HomeHit[]);
      })
      .catch((error) => {
        errorAlert(error.response.data[0].message);
      });
    setTimeout(() => {
      dismissLoader();
    },300);
  }

  const goToRecipeHandler = (href: string) => {
    const id = href.split('?')[0].split('/')[6];
    console.log(id);
    history.replace(`/recipe/${id}`);
  }

  useIonViewDidEnter(() => {
    searchInputRef.current?.setFocus();
  })

  return(
    <IonPage>

      <AppBar title={'Search Recipe'} backButton={true}/>

      <IonContent >
        <IonRow>
          <IonCol size={'8'}>
            <IonSearchbar
              ref={searchInputRef}
              placeholder={'Search some food...'}/>
          </IonCol>
          <IonCol size={'4'} className={'ion-align-self-center'}>
            <IonButton
              onClick={getRecipeFromAPI}
              expand={'block'} className={'ion-no-margin '}>
              Search
            </IonButton>
          </IonCol>
        </IonRow>

        <ListRecipeCard
          listRecipe={listRecipe} goToRecipe={goToRecipeHandler}/>

      </IonContent>
    </IonPage>
  )
}

export default Search;