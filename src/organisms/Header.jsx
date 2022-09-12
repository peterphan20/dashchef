import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cross as Hamburger } from "hamburger-react";

import MenuMobile from "../molecules/MenuMobile";
import MenuDesktop from "../molecules/MenuDesktop";

const Header = ({ setIsLoginOpen, setIsSignupOpen, setIsCartOpen }) => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [isOpen, setOpen] = useState(false);

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
		}
		return () => {
			window.removeEventListener("resize", trackWindowChanges);
		};
	}, [windowWidth]);

	const showMenu = () => {
		return windowWidth > 864 ? (
			<div>
				<MenuDesktop
					setIsLoginOpen={setIsLoginOpen}
					setIsSignupOpen={setIsSignupOpen}
					setIsCartOpen={setIsCartOpen}
				/>
			</div>
		) : (
			<span className="z-30">
				<Hamburger toggled={isOpen} toggle={setOpen} />
			</span>
		);
	};

	return (
		<div className="sticky top-0 left-0 bg-red-600 z-20 w-full">
			<header className="flex justify-between items-center text-gray-100 p-5 w-full lg:p-0 lg:py-6 lg:max-w-7xl lg:mx-auto">
				<Link
					to="/"
					className="font-headers font-bold text-4xl lg:text-5xl"
					onClick={handleClick}
					aria-label="Click here to take you to the top of the application"
				>
					Dashchef
				</Link>
				{showMenu()}
				<MenuMobile
					setOpen={setOpen}
					isOpen={isOpen}
					setIsLoginOpen={setIsLoginOpen}
					setIsSignupOpen={setIsSignupOpen}
					setIsCartOpen={setIsCartOpen}
				/>
			</header>
		</div>
	);
};

export default Header;
