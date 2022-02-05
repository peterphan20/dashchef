import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import MenuAnchorMobile from "../atoms/MenuAnchorMobile";
import MenuButtonMobile from "../atoms/MenuButtonMobile";
import { DISPLAY_LOGIN_MODAL, DISPLAY_SIGN_UP_MODAL, USER_LOGOUT } from "../constants";

const MenuMobile = ({ setOpen, isOpen, setIsCartOpen }) => {
	const user = useSelector((state) => state.userReducer);
	const dispatch = useDispatch();
	const history = useHistory();

	// const handleClick = (id) => {
	// 	setOpen(false);
	// 	setTimeout(() => {
	// 		document.getElementById(id).scrollIntoView();
	// 	}, 300);
	// };

	const handlePageChangeClick = () => {
		setOpen(false);
		window.scrollTo(0, 0);
	};

	const handleLoginClick = () => {
		setOpen(false);
		window.scrollTo(0, 0);
		dispatch({ type: DISPLAY_LOGIN_MODAL });
	};

	const handleSignupClick = () => {
		setOpen(false);
		window.scrollTo(0, 0);
		dispatch({ type: DISPLAY_SIGN_UP_MODAL });
	};

	const handleCartClick = () => {
		setOpen(false);
		setIsCartOpen(true);
	};

	const handleLogout = () => {
		localStorage.removeItem("authToken");
		localStorage.removeItem("isChef");
		setOpen(false);
		setTimeout(() => window.scrollTo(0, 0), 250);
		history.push("/");
		dispatch({ type: USER_LOGOUT });
	};

	return (
		<nav
			className={`fixed left-0 flex flex-col justify-start items-start bg-gray-100 px-4 py-5 transition-all duration-500 ease-out w-full h-screen z-10 transform ${
				isOpen ? "opacity-100 translate-y-0 top-20" : "opacity-0 -translate-y-full top-0"
			}`}
		>
			<MenuAnchorMobile link="/kitchens/all" placeholder="Browse kitchens" />
			{!user.loggedIn ? (
				<>
					<MenuButtonMobile
						clickHandler={handleLoginClick}
						placeholder="Login"
						icon="fas fa-sign-in-alt"
					/>
					<MenuButtonMobile
						clickHandler={handleSignupClick}
						placeholder="Sign up"
						icon="fas fa-user-plus"
					/>
				</>
			) : (
				<>
					<MenuAnchorMobile
						link={`/profile/${user.id}`}
						placeholder="Profile"
						clickHandler={handlePageChangeClick}
					/>
					<MenuButtonMobile placeholder="Sign out" clickHandler={handleLogout} />
				</>
			)}
			{!user.isChef ? null : user.isChef && user.kitchenID ? (
				<MenuAnchorMobile
					link={`/kitchen/id/${user.kitchenID}`}
					placeholder="Kitchen"
					clickHandler={handlePageChangeClick}
				/>
			) : (
				<MenuAnchorMobile
					link="/create/kitchen"
					placeholder="Create a kitchen"
					clickHandler={handlePageChangeClick}
				/>
			)}
			<MenuButtonMobile
				placeholder="Cart"
				icon="fas fa-shopping-cart"
				clickHandler={handleCartClick}
			/>
		</nav>
	);
};

export default MenuMobile;
