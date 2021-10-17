import React from "react";
import { useDispatch } from "react-redux";
import { toggleShowLoginModal } from "../actions/modalAction";
import MenuAnchorMobile from "../atoms/MenuAnchorMobile";

const MenuMobile = ({ setOpen, isOpen }) => {
	const dispatch = useDispatch();

	// const handleClick = (id) => {
	// 	setOpen(false);
	// 	setTimeout(() => {
	// 		document.getElementById(id).scrollIntoView();
	// 	}, 300);
	// };

	const handlePageChangeClick = () => {
		setOpen(false);
		window.scrollTo(0, 0);
		dispatch(toggleShowLoginModal());
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
			<button
				className="flex justify-start items-center gap-3 text-gray-900 border-b border-gray-300 px-2 mb-4 w-full"
				onClick={handlePageChangeClick}
			>
				Login
				<i className="fas fa-sign-in-alt"></i>
			</button>
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
