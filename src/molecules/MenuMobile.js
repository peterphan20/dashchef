import React from "react";
import { useDispatch } from "react-redux";
import { toggleShowLoginModal, toggleShowSignUpModal } from "../actions/modalAction";
import MenuAnchorMobile from "../atoms/MenuAnchorMobile";
import MenuButtonMobile from "../atoms/MenuButtonMobile";

const MenuMobile = ({ setOpen, isOpen }) => {
	const dispatch = useDispatch();

	const handleClick = (id) => {
		setOpen(false);
		setTimeout(() => {
			document.getElementById(id).scrollIntoView();
		}, 300);
	};

	const handleLoginClick = () => {
		setOpen(false);
		window.scrollTo(0, 0);
		dispatch(toggleShowLoginModal());
	};

	const handleSignupClick = () => {
		setOpen(false);
		window.scrollTo(0, 0);
		dispatch(toggleShowSignUpModal());
	};

	// const handleLogout = () => {
	// 	localStorage.removeItem("authToken");
	// 	setOpen(false);
	// 	window.scrollTo(0, 0);
	// };

	return (
		<nav
			className={`fixed top-20 left-0 flex flex-col justify-start items-start bg-gray-100 px-2 py-5 transition-all duration-500 ease-out w-full h-screen z-10 transform ${
				isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
			}`}
		>
			<MenuButtonMobile clickHandler={handleLoginClick} text="Login" icon="sign-in-alt" />
			<MenuButtonMobile clickHandler={handleSignupClick} text="Sign up" icon="user-plus" />
			<MenuAnchorMobile text="Cart" link="/cart" icon="shopping-cart" clickHandler={handleClick} />
		</nav>
	);
};

export default MenuMobile;
