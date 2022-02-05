import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Kitchen from "../pages/Kitchen";
import CreateKitchen from "../organisms/CreateKitchen";
import Driver from "../pages/Driver";
import Cart from "../pages/Cart";
import EditKitchen from "../pages/EditKitchen";
import CreateMenuItem from "../organisms/CreateMenuItem";
import ImageUpload from "../pages/ImageUpload";
import KitchensList from "../pages/KitchensList";

export const routes = [
	{
		path: "/",
		exact: true,
		component: Home,
	},
	{
		path: "/profile/:userID",
		exact: true,
		component: Profile,
	},
	{
		path: "/kitchens/all",
		exact: true,
		component: KitchensList,
	},
	{
		path: "/kitchen/id/:kitchenID",
		exact: true,
		component: Kitchen,
	},
	{
		path: "/create/kitchen",
		exact: true,
		component: CreateKitchen,
	},
	{
		path: "/edit/kitchen/:kitchenID",
		exact: true,
		component: EditKitchen,
	},
	{
		path: "/create/menu-item",
		exact: true,
		component: CreateMenuItem,
	},
	{
		path: "/image-upload/:userID",
		exact: true,
		component: ImageUpload,
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
