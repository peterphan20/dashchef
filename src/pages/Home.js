import React from "react";
import DriverHero from "../organisms/DriverHero";
import TopRated from "../organisms/TopRated";

/**
 * Above driver hero, add another photo with tag line "Order now from top kitchen"
 * "Order from top kitchen" button that's hard coded to a kitchen for showcasing
 * Scratch searchbar component with button that takes to all kitchen wall
 * Below driver's hero, add top 5 kitchen flexbox/grid
 *
 */

const Home = () => {
	return (
		<div className="flex flex-col justify-start items-center bg-gray-100 text-gray-900 px-3 w-full h-full min-h-screen">
			<TopRated />
			<DriverHero />
		</div>
	);
};

export default Home;
