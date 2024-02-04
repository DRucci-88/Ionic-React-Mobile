// INTERSECTION

export interface HomeHit{
  recipe: HomeRecipe
  _links: HomeLinks
}

export interface HomeRecipe{
  label: string,
  image: string
}

export interface HomeLinks{
  self: HomeLink
}

export interface HomeLink{
  href: string,
}



