import React from "react";
import driverHeroImg from "../assets/driver-hero-image.jpg";

const DriverHero = () => {
	return (
		<div className="mt-10 mx-auto max-w-7xl px-4 md:mt-16 lg:flex lg:justify-center lg:items-center lg:gap-20 lg:mt-14 xl:mt-16">
			<div className="lg:flex lg:flex-col lg:justify-center lg:items-start lg:text-left">
				<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 md:text-6xl">
					<span className="font-body block xl:inline">Want to drive for Dashchef?</span>
				</h1>
				<p className="font-body mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
					Looking to feed hungry patreons? Get paid to deliver home cooked meals on your own
					schedule.
				</p>
				<button className="bg-yellow-300 text-base font-body border border-transparent rounded-md outline-none shadow py-2 px-5 my-5 w-full h-full">
					Deliver now!
				</button>
			</div>
			<div className="lg:w-4/5">
				<img
					className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
					src={driverHeroImg}
					alt="food delivery on a bike"
				/>
			</div>
		</div>
	);
};

export default DriverHero;
