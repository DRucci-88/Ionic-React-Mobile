export interface Hit{
  recipe: Recipe,
  _links: Links
}

export interface Recipe{
  uri: string,
  label: string,
  image: string,
  source: string,
  url: string,
  shareAs: string,
  yield: string,
  ingredients: Ingredient[],
  calories: number,
  totalWeight: number,
  totalTime: number,
  cuisineType: string[],
  mealType: string[],
  dishType: string[],
  digest: Digest
}

export interface Digest{
  label: string,
  total: number,
  daily: number,
  unit: string
}

export interface Ingredient{
  text: string,
  weight: number,
  foodCategory: string,
  image: string,
}

export interface Links{
  self: Link
}

export interface Link{
  href: string
}
