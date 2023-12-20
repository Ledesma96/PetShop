import React from 'react'
import CarrouselHome from './components/CarrouselHome'
import FeaturingCategories from './components/FeaturingCategories'
import NewsProducts from './components/NewsProducts'
import Coments from './components/Coments'

const Home = () => {
  return (
    <>
      <CarrouselHome></CarrouselHome>
      <FeaturingCategories></FeaturingCategories>
      <NewsProducts></NewsProducts>
      <Coments></Coments>
    </>
  )
}

export default Home