import ImagePopup from "@/src/modals/ImagePopup";
import React, { useRef, useState } from "react";
import Slider from "react-slick";

const setting = {
  dots: true,
  centerMode: true,
  centerPadding: "500px",
  slidesToShow: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: "350px",
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: "200px",
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 992,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: "150px",
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 778,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: "0px",
        slidesToShow: 1,
      },
    },
  ],
};

const project_gallery = [
  "/assets/img/project/project2.jpg",
  "/assets/img/project/project1.jpg",
  "/assets/img/project/project3.jpg",
  "/assets/img/project/project2.jpg",
  "/assets/img/project/project1.jpg",
];

const ProjectArea = () => {
  const sliderRef = useRef(null);  
  // photoIndex
  const [photoIndex, setPhotoIndex] = useState(null);
  // image open state
  const [isOpen, setIsOpen] = useState(false);
  // handleImagePopup
  const handleImagePopup = (i) => {
    setPhotoIndex(i);
    setIsOpen(true);
  };
  //  images
  const images = project_gallery.map((item) => item);


  return (
    <>
      <div className="project-area">
        <div className="tp-project-active tp-team-space">
          <Slider {...setting} ref={sliderRef}>
            {project_gallery.map((item, i) => (
              <div key={i} className="project-item slick-center">
                <img src={item} alt="theme-pure" />
                <button onClick={() => handleImagePopup(i)} style={{ cursor: "pointer" }} className="popup-image">
                  <i className="fal fa-plus"></i>
                </button>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {isOpen && (
        <ImagePopup
          images={images}
          setIsOpen={setIsOpen}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
        />
      )}

    </>
  );
};

export default ProjectArea;
