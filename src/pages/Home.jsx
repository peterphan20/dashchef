import React from "react";
import DriverHero from "../organisms/DriverHero";
import TopRatedHero from "../organisms/TopRatedHero";

const Home = () => {
	return (
		<div className="flex flex-col justify-start items-center bg-gray-100 text-gray-900 px-3 w-full h-full min-h-screen">
			<TopRatedHero />
			<DriverHero />
		</div>
	);
};

export default Home;
