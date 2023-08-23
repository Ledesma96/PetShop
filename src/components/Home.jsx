import React from 'react'
import CarrouselHome from './CarrouselHome'
import FeaturingCategories from './FeaturingCategories'
import NewsProducts from './NewsProducts'
import Coments from './Coments'

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