import Carousel from "react-bootstrap/Carousel";

function ImagePost({ listImage }) {
  return (
    <Carousel data-bs-theme="dark">
      {listImage.map((linkImage, index) => {
        return (
          <Carousel.Item interval={3000} key={index}>
            <img src={linkImage.link} alt={linkImage.link} className="img-post"/>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default ImagePost;
