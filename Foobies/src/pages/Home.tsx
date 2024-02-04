import {
  IonCol,
  IonContent, IonGrid,
  IonPage,
  IonRow, IonSearchbar,
} from '@ionic/react';
import React, {useEffect, useState} from "react";
import homeStyle from './Home.module.scss'
import 'swiper/swiper.scss';
import 'swiper/swiper-bundle.css';

import {foodHeader, foodRecipes} from "../_recipes/food-recipes";
import {drinksHeader, drinksRecipes} from "../_recipes/drinks-recipes";
import {dessertsHeader, dessertsRecipes} from "../_recipes/desserts-recipes";

import {HomeHit} from "../data/static-recipe";
import HeaderSlide from "../components/HeaderSlide";
import DataSlider from "../components/DataSlider";
import {useHistory} from "react-router";
import AppBar from "../components/AppBar";

import "../firebaseConfig";
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const Home: React.FC = () => {

  // Firebase 9 Modular
  const storage = getStorage();
  const db = getFirestore();

  const getData = async () => {
    // const querySnapshot = await getDocs(collection(db, 'users'));
    // console.log(querySnapshot.docs[0].data());
  }

  const history = useHistory();
  // Food Slider
  const [foodDataSlider, setFoodDataSlider] = useState<Array<HomeHit>>([]);
  // Drinks Slider
  const [drinksDataSlider, setDrinksDataSlider] = useState<Array<HomeHit>>([])
  // desserts Slider
  const [dessertsDataSlider, setDessertsDataSlider] = useState<Array<HomeHit>>([])

  const foodCategoryHandler = (selectedCategory: string) => {
    console.log(selectedCategory);
    switch (selectedCategory.toLowerCase()){
      case "chicken" : setFoodDataSlider(foodRecipes.chicken.hits); break;
      case "egg" : setFoodDataSlider(foodRecipes.egg.hits); break;
      case "fish" : setFoodDataSlider(foodRecipes.fish.hits); break;
      case "meat" : setFoodDataSlider(foodRecipes.meat.hits); break;
      case "pasta" : setFoodDataSlider(foodRecipes.pasta.hits); break;
      case "rice" : setFoodDataSlider(foodRecipes.rice.hits); break;
      default : setFoodDataSlider(foodRecipes.chicken.hits); break;
    }
  }

  const drinksCategoryHandler = (selectedCategory: string) => {
    console.log(selectedCategory);
    switch (selectedCategory.toLowerCase()) {
      case 'boba': setDrinksDataSlider(drinksRecipes.boba.hits); break;
      case 'cocktail': setDrinksDataSlider(drinksRecipes.cocktail.hits); break;
      case 'coffee': setDrinksDataSlider(drinksRecipes.coffee.hits); break;
      case 'juice': setDrinksDataSlider(drinksRecipes.juice.hits); break;
      case 'milk': setDrinksDataSlider(drinksRecipes.milk.hits); break;
      case 'milkshake': setDrinksDataSlider(drinksRecipes.milkshake.hits); break;
      // case 'thai tea': setDrinksDataSlider(drinksRecipes.thai_tea.hits); break;
      default: setDrinksDataSlider(drinksRecipes.boba.hits); break;
    }
  }

  const dessertsCategoryHandler = (selectedCategory: string) => {
    console.log(selectedCategory);
    switch (selectedCategory.toLowerCase()) {
      case 'brownies': setDessertsDataSlider(dessertsRecipes.brownies.hits); break;
      case 'cake': setDessertsDataSlider(dessertsRecipes.cake.hits); break;
      case 'pancake': setDessertsDataSlider(dessertsRecipes.pancake.hits); break;
      case 'pudding': setDessertsDataSlider(dessertsRecipes.pudding.hits); break;
      default: setDessertsDataSlider(dessertsRecipes.brownies.hits); break;
    }
  }

  const goToRecipeHandler = (href: string) => {
    // console.log(href);  // Raw URL to JSON
    const id = href.split('?')[0].split('/')[6];
    // console.log(id);
    history.push(`/recipe/${id}`)
  }

  useEffect(() => {
    setFoodDataSlider(foodRecipes.chicken.hits);
    setDrinksDataSlider(drinksRecipes.boba.hits);
    setDessertsDataSlider(dessertsRecipes.brownies.hits);
    getData().then(() => '')
  }, []);



// splash screen - login page - homepage
  return (
    <IonPage className={homeStyle.topbar}>

      <AppBar title={'Home Page'} backButton={false}/>

      <IonContent>
        <div className={homeStyle.topHeader}>
        <IonGrid >
          <IonRow>
            <IonCol>
              <div  className={homeStyle.search} onClick={() => history.push('/search')} >
                <IonSearchbar placeholder={'I am hungry'}/>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>

        <h3 className={homeStyle.title}>Food</h3>
        <HeaderSlide
          slideHeader={foodHeader}
          setCategory={foodCategoryHandler}/>
        <DataSlider
          slideData={foodDataSlider}
          goToRecipe={goToRecipeHandler}/>

        <h3 className={homeStyle.title}>Drinks</h3>
        <HeaderSlide
          slideHeader={drinksHeader}
          setCategory={drinksCategoryHandler}/>
        <DataSlider
          slideData={drinksDataSlider}
          goToRecipe={goToRecipeHandler}/>

        <h3 className={homeStyle.title}>Desserts</h3>
        <HeaderSlide
          slideHeader={dessertsHeader}
          setCategory={dessertsCategoryHandler}/>
        <DataSlider
          slideData={dessertsDataSlider}
          goToRecipe={goToRecipeHandler}/>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Home;
