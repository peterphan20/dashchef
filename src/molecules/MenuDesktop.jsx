import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuButtonDesktop from "../atoms/MenuButtonDesktop";
import MenuAnchorDesktop from "../atoms/MenuAnchorDesktop";
import { DISPLAY_LOGIN_MODAL, DISPLAY_SIGN_UP_MODAL, USER_LOGOUT } from "../constants";

const MenuDesktop = ({ setIsCartOpen }) => {
	const user = useSelector((state) => state.userReducer);
	const dispatch = useDispatch();
	const navigateTo = useNavigate();

	const handleCartClick = () => {
		console.log("open cart");
		setIsCartOpen(true);
	};

	const handlePageChangeClick = () => {
		window.scrollTo(0, 0);
	};

	const handleLoginClick = () => {
		window.scrollTo(0, 0);
		dispatch({ type: DISPLAY_LOGIN_MODAL });
	};

	const handleSignupClick = () => {
		window.scrollTo(0, 0);
		dispatch({ type: DISPLAY_SIGN_UP_MODAL });
	};

	const handleLogout = () => {
		localStorage.removeItem("authToken");
		setTimeout(() => window.scrollTo(0, 0), 250);
		navigateTo("/");
		dispatch({ type: USER_LOGOUT });
	};

	return (
		<nav className="flex justify-center items-center gap-4">
			<MenuAnchorDesktop link="/kitchens/all" placeholder="Browse kitchens" />
			{!user.loggedIn ? (
				<>
					<MenuButtonDesktop clickHandler={handleLoginClick} placeholder="Login" />
					<MenuButtonDesktop clickHandler={handleSignupClick} placeholder="Sign up" />
				</>
			) : (
				<MenuAnchorDesktop
					link={`/profile/${user.id}`}
					placeholder="Profile"
					clickHandler={handlePageChangeClick}
				/>
			)}
			{!user.isChef ? null : user.isChef && user.kitchenID ? (
				<MenuAnchorDesktop
					link={`/kitchen/id/${user.kitchenID}`}
					placeholder="Kitchen"
					clickHandler={handlePageChangeClick}
				/>
			) : (
				<MenuAnchorDesktop
					link="/create/kitchen"
					placeholder="Create a kitchen"
					clickHandler={handlePageChangeClick}
				/>
			)}
			{user.loggedIn ? (
				<MenuButtonDesktop placeholder="Sign out" clickHandler={handleLogout} />
			) : null}
			<MenuButtonDesktop icon="fas fa-shopping-cart" clickHandler={handleCartClick} />
		</nav>
	);
};

export default MenuDesktop;