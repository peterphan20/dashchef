import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cross as Hamburger } from "hamburger-react";

import MenuMobile from "../molecules/MenuMobile";
import MenuDesktop from "../molecules/MenuDesktop";
import Searchbar from "../molecules/Searchbar";

const Header = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [isOpen, setOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	const handleClick = () => {
		setTimeout(() => window.scrollTo(0, 0), 250);
		setOpen(false);
	};

	const trackWindowChanges = () => {
		setWindowWidth(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener("resize", trackWindowChanges);
		if (windowWidth > 864) {
			setOpen(false);
			setIsMobile(false);
		} else {
			setIsMobile(true);
		}
		return () => {
			window.removeEventListener("resize", trackWindowChanges);
		};
	}, [windowWidth]);

	const showMenu = () => {
		return windowWidth > 864 ? (
			<div className="flex justify-center items-center gap-5">
				<Searchbar />
				<MenuDesktop />
			</div>
		) : (
			<span className="z-30">
				<Hamburger toggled={isOpen} toggle={setOpen} />
			</span>
		);
	};

	return (
		<div className="sticky top-0 bg-red-600 z-20 w-full">
			<header className="flex justify-between items-center text-gray-100 px-4 pt-4 pb-12 w-full lg:pt-6 lg:pb-6 lg:max-w-7xl lg:mx-auto">
				<Link
					to="/"
					className="font-headers font-bold text-4xl lg:text-5xl"
					onClick={handleClick}
					aria-label="Click here to take you to the top of the application"
				>
					Dashchef
				</Link>
				{showMenu()}
				<MenuMobile setOpen={setOpen} isOpen={isOpen} />
			</header>
			{isMobile ? <Searchbar /> : null}
		</div>
	);
};

export default Header;
