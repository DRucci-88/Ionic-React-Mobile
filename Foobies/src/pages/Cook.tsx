import React, {useState} from "react";
import {
  IonButton,
  IonContent, IonGrid, IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption, useIonAlert, useIonLoading,
} from "@ionic/react";
import AppBar from "../components/AppBar";
import {cookQuery} from "../data/cook-data";
import {getListRecipeWithQuery} from "../data/config-api";
import {HomeHit} from "../data/static-recipe";
import axios from "axios";
import {useHistory} from "react-router";
import ListRecipeCard from "../components/ListRecipeCard";
import cookStyle from "./Cook.module.scss";

const Cook: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [diet, setDiet] = useState<string>("");
  const [mealType, setMealType] = useState<string>("");
  const [presentCookLoader, dismissCookLoader] = useIonLoading();
  const [listRecipe, setListRecipe] = useState<HomeHit[]>([])
  const [errorAlert] = useIonAlert()
  const history = useHistory()

  const recipeResult = async () => {
    const url = getListRecipeWithQuery(ingredients, diet, mealType);
    console.log(url);
    presentCookLoader({
      message: "Please Wait ...",
      spinner: 'bubbles',
      backdropDismiss: true,
      duration: 4000
    });
    await axios.get(url)
      .then((response) => {
        setListRecipe(response.data.hits)
      })
      .catch((error) => {
        errorAlert(error.response.data[0].message)
      });
    setTimeout(() => {
      dismissCookLoader();
    }, 300);
  }

  const goToRecipeHandler = (href: string) => {
    const id = href.split('?')[0].split('/')[6];
    console.log(id);
    history.push(`/recipe/${id}`);
  }

  return (
    <IonPage className={cookStyle.topbar}>
      <AppBar title={'Recipe'} backButton={false}/>

      <IonContent>
        <div className={cookStyle.topHeader}>
          <IonGrid>
            <IonRow>
              <p className={cookStyle.title}>
                No need to worry about what to cook today.
                Just choose the ingredient you have (Choose at least 1 ingredient)
              </p>
            </IonRow>
          </IonGrid>
          <IonItem>
            <IonLabel>Ingredients </IonLabel>
            <IonSelect className={cookStyle.select} value={ingredients} multiple={true} cancelText="Nah" okText="Okay!"
                       onIonChange={e => setIngredients(e.detail.value)}>
              {cookQuery.ingredients.map((value => (
                <IonSelectOption key={value} value={value}>{value}</IonSelectOption>
              )))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Diet </IonLabel>
            <IonSelect className={cookStyle.select} value={diet} multiple={false} cancelText="Nah" okText="Okay!"
                       onIonChange={e => setDiet(e.detail.value)}>
              {cookQuery.diet.map((value => (
                <IonSelectOption key={value} value={value}>{value}</IonSelectOption>
              )))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Meal Type </IonLabel>
            <IonSelect className={cookStyle.select} value={mealType} multiple={false} cancelText="Nah" okText="Okay!"
                       onIonChange={e => setMealType(e.detail.value)}>
              {cookQuery.mealType.map((value => (
                <IonSelectOption key={value} value={value}>{value}</IonSelectOption>
              )))}
            </IonSelect>
          </IonItem>

          <IonButton className={cookStyle.button} onClick={recipeResult}>Search</IonButton>

          <ListRecipeCard listRecipe={listRecipe} goToRecipe={goToRecipeHandler}/>

        </div>
      </IonContent>
    </IonPage>
  )
}
export default Cook;
