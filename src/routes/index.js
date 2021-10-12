import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Kitchen from "../pages/Kitchen";
import Driver from "../pages/Driver";
import Cart from "../pages/Cart";

export const routes = [
	{
		path: "/",
		exact: true,
		component: Home,
	},
	{
		path: "/sign-up",
		exact: true,
		component: Signup,
	},
	{
		path: "/login",
		exact: true,
		component: Login,
	},
	{
		path: "/profile",
		exact: true,
		component: Profile,
	},
	{
		path: "/kitchen",
		exact: true,
		component: Kitchen,
	},
	{
		path: "/driver",
		exact: true,
		component: Driver,
	},
	{
		path: "/cart",
		exact: true,
		component: Cart,
	},
];
