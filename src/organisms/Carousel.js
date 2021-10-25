import React from "react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

//Import swiper styles
import "swiper/css";
import "swiper/css/Navigation";
import "swiper/css/Pagination";
import "swiper/css/Autoplay";
import "swiper/css/a11y";

const Carousel = ({ lists }) => {
	const renderedTile = lists.map((tile) => {
		return <SwiperSlide>{tile.name}</SwiperSlide>;
	});

	return (
		<Swiper
			modules={[Navigation, Pagination, A11y, Autoplay]}
			spaceBetween={50}
			slidesPerView={3}
			navigation
			pagination={{ clickable: true }}
			onSwiper={(swiper) => console.log(swiper)}
			onSlideChange={() => console.log("slide change")}
		>
			{renderedTile}
		</Swiper>
	);
};

export default Carousel;
