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
		exact: "true",
		component: Home,
	},
	{
		path: "/",
		exact: "true",
		component: Signup,
	},
	{
		path: "/",
		exact: "true",
		component: Login,
	},
	{
		path: "/",
		exact: "true",
		component: Profile,
	},
	{
		path: "/",
		exact: "true",
		component: Kitchen,
	},
	{
		path: "/",
		exact: "true",
		component: Driver,
	},
	{
		path: "/",
		exact: "true",
		component: Cart,
	},
];
