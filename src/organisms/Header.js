import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cross as Hamburger } from "hamburger-react";

import MenuMobile from "../molecules/MenuMobile";
import MenuDesktop from "../molecules/MenuDesktop";
import Searchbar from "../molecules/Searchbar";

const Header = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [isOpen, setOpen] = useState(false);

	const trackWindowChanges = () => {
		setWindowWidth(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener("resize", trackWindowChanges);
		if (windowWidth > 864) {
			setOpen(false);
		}

		return () => {
			window.removeEventListener("resize", trackWindowChanges);
		};
	}, [windowWidth]);

	const showMenu = () => {
		return windowWidth > 864 ? (
			<MenuDesktop />
		) : (
			<span className="z-30">
				<Hamburger toggled={isOpen} toggle={setOpen} />
			</span>
		);
	};

	return (
		<div className="sticky top-0 bg-red-600 z-10 w-full">
			<header className="flex justify-between items-center text-gray-100 px-4 pt-4 pb-12">
				<Link
					to="/"
					className="font-headers font-bold text-4xl"
					onClick={() => setTimeout(() => window.scrollTo(0, 0), 250)}
					aria-label="Click here to take you to the top of the application"
				>
					Dashchef
				</Link>
				{showMenu()}
				<MenuMobile setOpen={setOpen} isOpen={isOpen} />
			</header>
			<Searchbar />
		</div>
	);
};

export default Header;
