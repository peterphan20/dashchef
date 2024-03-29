import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuButtonDesktop from "../atoms/MenuButtonDesktop";
import MenuAnchorDesktop from "../atoms/MenuAnchorDesktop";
import { USER_LOGOUT } from "../constants";

const MenuDesktop = ({ setIsLoginOpen, setIsSignupOpen, setIsCartOpen }) => {
	const user = useSelector((state) => state.userReducer);
	const dispatch = useDispatch();
	const navigateTo = useNavigate();

	const handlePageChangeClick = () => {
		window.scrollTo(0, 0);
	};

	const handleLoginClick = () => {
		window.scrollTo(0, 0);
		setIsLoginOpen(true);
	};

	const handleSignupClick = () => {
		window.scrollTo(0, 0);
		setIsSignupOpen(true);
	};

	const handleLogout = () => {
		localStorage.removeItem("authToken");
		setTimeout(() => window.scrollTo(0, 0), 250);
		navigateTo("/");
		dispatch({ type: USER_LOGOUT });
	};

	return (
		<nav className="flex justify-center items-center gap-10">
			<MenuAnchorDesktop link="/kitchens-list" placeholder="Browse kitchens" />
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
					link={`/kitchen/${user.kitchenID}`}
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
			<button
				className="flex flex-row justify-center items-start gap-2 text-base font-headers font-semibold hover:text-blue-500"
				onClick={() => setIsCartOpen(true)}
			>
				<i className="far fa-solid fa-cart-shopping" />
			</button>
		</nav>
	);
};

export default MenuDesktop;
