import React from "react";
import MenuAnchorMobile from "../atoms/MenuAnchorMobile";

const MenuMobile = ({ setOpen, isOpen }) => {
	const handleClick = (id) => {
		setOpen(false);
		setTimeout(() => {
			document.getElementById(id).scrollIntoView();
		}, 300);
	};

	const handlePageChangeClick = () => {
		setOpen(false);
		window.scrollTo(0, 0);
	};

	const handleLogout = () => {
		localStorage.removeItem("authToken");
		setOpen(false);
		window.scrollTo(0, 0);
	};

	return (
		<nav
			className={`fixed top-20 left-0 flex flex-col justify-start items-start bg-gray-100 px-2 py-5 transition-all duration-500 ease-out w-full h-screen z-10 transform ${
				isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
			}`}
		>
			<MenuAnchorMobile
				text="Search"
				link="/"
				icon="search"
				clickHandler={() => handleClick("home")}
			/>
			<MenuAnchorMobile
				text="Profile"
				link="/login"
				icon="sign-in-alt"
				clickHandler={handleLogout}
			/>
			<MenuAnchorMobile
				text="Profile"
				link="/sign-up"
				icon="user-plus"
				clickHandler={handlePageChangeClick}
			/>
			<MenuAnchorMobile
				text="Cart"
				link="/cart"
				icon="shopping-cart"
				clickHandler={handlePageChangeClick}
			/>
		</nav>
	);
};

export default MenuMobile;
