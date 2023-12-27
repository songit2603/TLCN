import ImagePopup from '@/src/modals/ImagePopup';
import React, { useRef, useState } from 'react';
import Slider from 'react-slick';


const setting = {
    slidesToShow:4,
    arrows: false,
    autoplay:true,
    Infinity:true,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                arrows: false,
                slidesToShow: 4
            }
        },
        {
            breakpoint: 992,
            settings: {
                arrows: false,
                slidesToShow: 3
            }
        },
        {
            breakpoint: 768,
            settings: {
                arrows: false,
                slidesToShow: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                arrows: false,
                slidesToShow: 1
            }
        }
    ]
}
const gallery_data = [
    "assets/img/gallary/gallary.jpg",
    "assets/img/gallary/gallary-1.jpg",
    "assets/img/gallary/gallary-3.jpg",
    "assets/img/gallary/gallary-1.jpg",
    "assets/img/gallary/gallary-3.jpg",
]
const GallaryArea = () => {
    const sliderRef = useRef(null)
    
    // photoIndex
    const [photoIndex, setPhotoIndex] = useState(0);

    // image open state
    const [isOpen, setIsOpen] = useState(false);

    // handleImagePopup
    const handleImagePopup = (i) => {
        setPhotoIndex(i);
        setIsOpen(true);
    };
    
    //  images
    const img = gallery_data.map((item) => item);
    return (
        <>
            <div className="gallary-area mb-115">
                <div className="container-fluid p-0">
                    <div className="gallary-slider-active">
                        <Slider {...setting} ref={sliderRef}>
                            {gallery_data.map((item, i) => 
                                <div key={i} className="gallary-item">
                                    <a onClick={() => handleImagePopup(i)} className="popup-image" href="#"><img src={item} alt="theme-pure" /></a>
                                </div> 
                            )}
                        </Slider> 
                    </div>
                </div>
            </div>

            {/* image light box start */}
            {isOpen && (
                <ImagePopup
                images={img}
                setIsOpen={setIsOpen}
                photoIndex={photoIndex}
                setPhotoIndex={setPhotoIndex}
                />
            )}
            {/* image light box end */}
        </>
    );
};

export default GallaryArea;