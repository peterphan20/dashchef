import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { getKitchen } from "../api/kitchensAPI";
import Avatar from "../molecules/Avatar";
import defaultAvatar from "../assets/default-avatar.jpg";
import mobileHeaderImg from "../assets/mobile-header-image.jpg";
import { MENU_ITEMS_LOAD, SELECTED_KITCHEN_LOAD } from "../constants";
import MenuItems from "../molecules/MenuItems";

const Kitchen = () => {
	const history = useHistory();
	const { kitchenID } = useParams();
	const dispatch = useDispatch();
	const kitchen = useSelector((state) => state.selectedKitchenReducer);

	useEffect(() => {
		async function fetchKitchen() {
			const data = await getKitchen(kitchenID);
			console.log(data.rows[0].menuitems);
			if (!data || !data.rows) {
				history.push("/");
			} else {
				const kitchenData = data.rows[0];
				// console.log("api response", kitchenData);
				const menuItemData = data.rows[0].menuitems;
				// console.log("menu items array in response", menuItem);

				const payload = {
					id: kitchenData.id,
					address: kitchenData.address,
					avatarURL: kitchenData.avatarURL,
					chefFirstName: kitchenData.chefFirstName,
					chefLastName: kitchenData.chefLastName,
					createdAt: kitchenData.createdAt,
					email: kitchenData.email,
					name: kitchenData.name,
					phone: kitchenData.phone,
				};

				// const menuItemPayload = {
				// 	menuItemID: menuItemData.menuItemID,
				// 	menuItemName: menuItemData.menuItemName,
				// 	menuItemDescription: menuItemData.menuItemDescription,
				// 	menuItemPrice: menuItemData.menuItemPrice,
				// 	menuItemPhotoPrimaryURL: menuItemData.menuItemPhotoPrimaryURL,
				// 	menuItemGalleryPhotoURL: menuItemData.menuItemGalleryPhotoURL,
				// 	menuItemTags: menuItemData.menuItemTags,
				// };
				// console.log("menu item payload", menuItemPayload);

				dispatch({ type: MENU_ITEMS_LOAD, payload: menuItemData });
				dispatch({ type: SELECTED_KITCHEN_LOAD, payload });
			}
		}
		fetchKitchen();
		return () => {};
	}, [kitchenID, dispatch, history]);

	return (
		<div className="bg-gray-100 pb-10 px-4 w-full h-full min-h-screen">
			<div className="px-0 transform skew-y-3">
				<img src={mobileHeaderImg} />
			</div>
			<Avatar src={defaultAvatar} />
			<div className=" font-body">
				<h1 className="text-3xl font-bold pt-5">{kitchen.name}</h1>
				<h1 className="text-sm pt-1">{kitchen.address}</h1>
			</div>
			<div>
				<h1 className="font-headers text-lg font-bold border-b border-gray-300 pb-3 mb-5">
					Full Menu
				</h1>
				<MenuItems />
			</div>
			<div className="border border-gray-300 font-body rounded-md p-4 mt-10">
				<h1 className="text-md">Contact the chef:</h1>
				<h1 className="text-sm">Email for inquiries: {kitchen.email}</h1>
				<h1 className="text-sm">tel: {kitchen.phone}</h1>
			</div>
		</div>
	);
};

export default Kitchen;
