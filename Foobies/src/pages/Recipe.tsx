import React, {useCallback, useEffect, useState} from "react";
import {
  IonContent,
  IonIcon,
  IonPage,
  IonRow,
  IonCardTitle,
  IonCardSubtitle,
  IonCol,
  IonGrid,
  IonList,
  IonListHeader,
  IonLabel,
  IonItem, IonImg, useIonAlert, IonButton
} from "@ionic/react";
import recipeStyle from './Recipe.module.scss';
import {useHistory, useParams} from "react-router";
import {layersOutline, peopleOutline, scaleOutline, timeOutline} from "ionicons/icons";
import axios from "axios";
import {Hit} from "../data/recipe-response";
import {getRecipeURLWithId} from "../data/config-api";
import AppBar from "../components/AppBar";
import {FavFirebase} from "../data/favFirebase";
import {getAuth} from "firebase/auth";
import {getFirestore, updateDoc, arrayUnion, doc, arrayRemove} from "firebase/firestore";

const Recipe: React.FC = () => {

  // https://stackoverflow.com/questions/63635997/how-to-access-route-params-from-react-router-dom-using-typescript-ex-some-ro
  const id = useParams<{ id: string }>();
  const url = getRecipeURLWithId(id.id);
  const [recipeAPI, setRecipeAPI] = useState<Hit>();
  const [errorAlert] = useIonAlert();
  const [present] = useIonAlert()
  const history = useHistory()
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const auth = getAuth()

  useEffect(() => {
    // console.log(id.id);
    // console.log(url);
    const stored: FavFirebase[] = JSON.parse(sessionStorage.getItem('fav')!)
    if (stored.length >= 0)
      for(let i = 0; i < stored.length; i++)
        if(stored[i].id.localeCompare(id.id) === 0)
          setIsFavorite(true)

    axios.get(url)
      .then((response) => {
        setRecipeAPI(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        // console.log(error.response.status);
        errorAlert(error.response.data[0].message);
      })

  }, []);

  const addToFavorite = () => {
    console.log("Add to Favorite")

    if (recipeAPI?.recipe.label === undefined || recipeAPI?.recipe.image === undefined)
      return
    const recipe : FavFirebase = {
      id: id.id,
      name: recipeAPI?.recipe.label,
      image: recipeAPI?.recipe.image!
    }
    // https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array
    auth.onAuthStateChanged( async (user) => {
      if(user){
        const db = getFirestore()
        await updateDoc(doc(db, 'users', user.uid), {
          fav: arrayUnion(recipe)
        })
        const stored: FavFirebase[] = JSON.parse(sessionStorage.getItem('fav')!)
        setIsFavorite(true)
        stored.push(recipe)
        sessionStorage.setItem('fav', JSON.stringify(stored))
        console.log(stored)
      }
      else {
        present({
          header: 'Add to favorite ?',
          message: 'You must sign in first',
          buttons: [{ text: 'Sign In', handler: () => history.replace('/profile') }, 'Ok'],
          onDidDismiss: (e) => console.log('did dismiss'),
        })
      }
    })

  }
  const removeFromFavorite = () => {
    console.log("Remove from Favorite")
    if (recipeAPI?.recipe.label === undefined || recipeAPI?.recipe.image === undefined)
      return
    const recipe : FavFirebase = {
      id: id.id,
      name: recipeAPI?.recipe.label,
      image: recipeAPI?.recipe.image!
    }
    // https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array
    auth.onAuthStateChanged( async (user) => {
      if(user){
        const db = getFirestore()
        await updateDoc(doc(db, 'users', user.uid), {
          fav: arrayRemove(recipe)
        })
        const stored: FavFirebase[] = JSON.parse(sessionStorage.getItem('fav')!)
        setIsFavorite(false)
        const index = stored.indexOf(recipe)
        if (index === -1)
          stored.splice(index, 1)
        sessionStorage.setItem('fav', JSON.stringify(stored))
        console.log(stored)
      }
      else {
        present({
          header: 'Add to favorite ?',
          message: 'You must sign in first',
          buttons: [{ text: 'Sign In', handler: () => history.replace('/profile') }, 'Ok'],
          onDidDismiss: (e) => console.log('did dismiss'),
        })
      }
    })
  }

  useCallback(async () => {
    console.log(id);
  }, [id])

  return (
    <IonPage>

      <AppBar title={'Recipe Detail'} backButton={true}/>

      <IonContent fullscreen>

        <div className={recipeStyle.headerImage}>
          <img src={recipeAPI?.recipe.image} alt="main cover"/>
          <div className={`${recipeStyle.headerInfo}`}>
            <h1>{recipeAPI?.recipe.label}</h1>
            <p>{recipeAPI?.recipe.dishType[0]}</p>
            <p>{recipeAPI?.recipe.mealType[0]}</p>
            <p>{recipeAPI?.recipe.cuisineType[0]}</p>
          </div>
        </div>

        <IonGrid>
          <IonRow className="ion-text-center">
            <IonCol size="6" sizeSm={'3'}>
              <IonCardTitle>
                <IonIcon icon={peopleOutline}/>
              </IonCardTitle>
              <IonCardSubtitle>serves {recipeAPI?.recipe.yield}</IonCardSubtitle>
            </IonCol>
            <IonCol size="6" sizeSm={'3'}>
              <IonCardTitle>
                <IonIcon icon={timeOutline}/>
              </IonCardTitle>
              <IonCardSubtitle>{recipeAPI?.recipe.totalTime ? `${recipeAPI.recipe.totalTime} mins` : "N/A"}</IonCardSubtitle>
            </IonCol>
            <IonCol size="6" sizeSm={'3'}>
              <IonCardTitle>
                <IonIcon icon={scaleOutline}/>
              </IonCardTitle>
              <IonCardSubtitle>{recipeAPI?.recipe.totalWeight.toFixed()}g</IonCardSubtitle>
            </IonCol>
            <IonCol size={'6'} sizeSm={'3'}>
              <IonCardTitle>
                <IonIcon icon={layersOutline}/>
              </IonCardTitle>
              <IonCardSubtitle>{recipeAPI?.recipe.calories.toFixed()} calories</IonCardSubtitle>
            </IonCol>
          </IonRow>

          {isFavorite ?
            <IonButton
              expand={'block'}
              color={'primary'}
              onClick={() => removeFromFavorite()}>
              Remove from Favorites
            </IonButton>
          :
            <IonButton
              expand={'block'}
              color={'secondary'}
              onClick={() => addToFavorite()}>
              Add to Favorites
            </IonButton>
          }

          <IonList>
            <IonListHeader lines={'full'}>
              <IonLabel>Ingredients ({recipeAPI?.recipe.ingredients.length})</IonLabel>
            </IonListHeader>
            {recipeAPI?.recipe.ingredients.map((ingredient, index) => {
              return (
                <IonItem key={index} lines={'full'} className={recipeStyle.ingredientItem}>
                  <IonImg src={ingredient.image} className={recipeStyle.ingredientImg}/>
                  <IonLabel className={'ion-margin-start'}>
                    <h2>{ingredient.text}</h2>
                  </IonLabel>
                </IonItem>
              )
            })}

          </IonList>

        </IonGrid>

      </IonContent>
    </IonPage>
  )
}

export default Recipe;