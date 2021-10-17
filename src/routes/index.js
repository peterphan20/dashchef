import Home from "../pages/Home";
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
