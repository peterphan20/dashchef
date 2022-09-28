import React from "react";
import { Link } from "react-router-dom";
import topKitchenImg from "../assets/top-kitchen-hero-img.jpg";
import driverHeroImg from "../assets/driver-hero-image.jpg";

const Home = () => {
	return (
		<div className="flex flex-col justify-start items-center bg-gray-100 text-gray-900 w-full h-full min-h-screen">
			<div className="mt-10 mx-auto max-w-7xl px-4 md:mt-16 lg:flex lg:justify-center lg:items-center lg:gap-14 lg:mb-8 lg:px-0 lg:mt-14 xl:mt-16">
				<div className="w-2/5 h-72">
					<img
						className="rounded w-full object-cover lg:h-full"
						src={topKitchenImg}
						alt="ingredients used for cooking delicious meals"
					/>
				</div>
				<div className="lg:flex lg:flex-col lg:justify-center lg:items-start lg:text-left">
					<h1 className="text-2xl tracking-tight font-bold text-gray-900 md:text-4xl">
						<span className="font-body block xl:inline">Our top rated chef</span>
					</h1>
					<p className="font-body text-base text-gray-500 mt-3 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-lg lg:mx-0">
						Want to know who our top rated chef is in your area. Click here to order now!
					</p>
					<div className="lg:w-1/3">
						<Link
							to="/kitchen/2"
							className="flex justify-center items-center bg-red-600 text-gray-100 text-base font-body border border-transparent rounded-md outline-none shadow py-2 px-5 my-5 w-full h-full hover:bg-red-500"
						>
							Order here
						</Link>
					</div>
				</div>
			</div>
			<div className="mt-10 mx-auto max-w-7xl px-4 md:mt-16 lg:flex lg:justify-center lg:items-center lg:gap-14 lg:mt-14 lg:px-0 xl:mt-16">
				<div className="lg:flex lg:flex-col lg:justify-center lg:items-start lg:text-left">
					<h1 className="text-2xl tracking-tight font-bold text-gray-900 md:text-4xl">
						<span className="font-body block xl:inline">Want to drive for Dashchef?</span>
					</h1>
					<p className="font-body text-base text-gray-500 mt-3 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-lg lg:mx-0">
						Looking to feed hungry patreons? Get paid to deliver home cooked meals on your own
						schedule.
					</p>
					<div className="lg:w-1/3">
						<Link
							to="/driver"
							className="flex justify-center items-center bg-yellow-400 text-base font-body border border-transparent rounded-md outline-none shadow py-2 px-5 my-5 w-full h-full hover:bg-yellow-300"
						>
							Deliver now!
						</Link>
					</div>
				</div>
				<div className="w-2/5 h-72">
					<img
						className="rounded w-full object-cover lg:w-full lg:h-full"
						src={driverHeroImg}
						alt="food delivery on a bike"
					/>
				</div>
			</div>
		</div>
	);
};

export default Home;
