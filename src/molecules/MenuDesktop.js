import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import MenuButtonDesktop from "../atoms/MenuButtonDesktop";
import MenuAnchorDesktop from "../atoms/MenuAnchorDesktop";
import { DISPLAY_LOGIN_MODAL, DISPLAY_SIGN_UP_MODAL, USER_LOGOUT } from "../constants";

const MenuDesktop = () => {
	const user = useSelector((state) => state.userReducer);
	const dispatch = useDispatch();
	const history = useHistory();

	const handleClick = (id) => {
		setTimeout(() => {
			document.getElementById(id).scrollIntoView();
		}, 300);
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
		history.push("/");
		dispatch({ type: USER_LOGOUT });
	};

	return (
		<nav className="flex justify-center items-center gap-4">
			{!user.loggedIn ? (
				<>
					<MenuButtonDesktop clickHandler={handleLoginClick} placeholder="Login" />
					<MenuButtonDesktop clickHandler={handleSignupClick} placeholder="Sign up" />
				</>
			) : (
				<MenuAnchorDesktop
					link="/profile"
					placeholder="Profile"
					clickHandler={handlePageChangeClick}
				/>
			)}
			{!user.isChef ? null : user.isChef && user.kitchenID ? (
				<MenuAnchorDesktop
					link={`/kitchen/${user.kitchenID}`}
					placeholder="Kitchen"
					clickHandler={handlePageChangeClick}
				/>
			) : (
				<MenuAnchorDesktop
					link="/kitchen/create"
					placeholder="Create a kitchen"
					clickHandler={handlePageChangeClick}
				/>
			)}
			{user.loggedIn ? (
				<MenuButtonDesktop placeholder="Sign out" clickHandler={handleLogout} />
			) : null}
			<MenuAnchorDesktop link="/cart" icon="fas fa-shopping-cart" clickHandler={handleClick} />
		</nav>
	);
};

export default MenuDesktop;
