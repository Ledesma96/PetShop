import Carousel from 'react-bootstrap/Carousel';


const CarrouselHome = () => {
  return (
    <Carousel className='mt-2 Carrousel'>
    <Carousel.Item>
        <img
          className="d-block w-100 carrouselImage"
          src="images/1600w-CrIm78Vq09U.webp"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3></h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
    <Carousel.Item>
        <img
          className="d-block w-100 carrouselImage"
          src="images/1600w-_wEygJzI0_0.webp"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3></h3>
          <p>
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='carrouselItem'>
        <img
          className="d-block w-100 h-50 carrouselImage"
          src="images/banner-outpets.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3></h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarrouselHome