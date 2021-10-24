import Home from "../pages/Home";
import Profile from "../pages/Profile";
// import Kitchen from "../pages/Kitchen";
import KitchenCreate from "../organisms/KitchenCreate";
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
	// {
	// 	path: "/kitchen/:kitchenID",
	// 	exact: true,
	// 	component: Kitchen,
	// },
	// TODO: The route should match the file name, make it so that KitchenForm is actually
	// KitchenCreate and the path is /kitchen/create
	{
		path: "/kitchen/create",
		exact: true,
		component: KitchenCreate,
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
