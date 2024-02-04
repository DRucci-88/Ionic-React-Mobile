const ingredients: string[] = [
  'Chicken', 'Egg', 'Fish', 'Meat', 'Pasta', 'Rice',
  'Bacon','Mushroom','Onion','Spinach','Peperoni',
  'Sausage','Cheese'
]

const diet: string[] = [
  '','balanced','high-fiber','high-protein','low-carb','low-fat','low-sodium'
]

const cuisineType: string[] = [
  '','American','Asian','British','Central Europa','Chinese',
  'French','Indian','Japanese','South East Asian'
]

const mealType: string[] = [
  '','Breakfast','Dinner','Lunch','Snack'
]

export const cookQuery = {
  ingredients: ingredients,
  diet: diet,
  cuisineType: cuisineType,
  mealType: mealType
}