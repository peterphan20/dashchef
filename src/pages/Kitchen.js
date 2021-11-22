import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { getKitchen } from "../api/kitchensAPI";
import Carousel from "../organisms/Carousel";
import RenderMenuItems from "../molecules/RenderMenuItems";
import Avatar from "../molecules/Avatar";
import defaultAvatar from "../assets/default-avatar.jpg";
import mobileHeaderImg from "../assets/mobile-header-image.jpg";
import { MENU_ITEMS_LOAD, SELECTED_KITCHEN_LOAD } from "../constants";

const Kitchen = () => {
	const history = useHistory();
	const { kitchenID } = useParams();
	const dispatch = useDispatch();
	const kitchen = useSelector((state) => state.selectedKitchenReducer);

	useEffect(() => {
		async function fetchKitchen() {
			const data = await getKitchen(kitchenID);
			// console.log(data.rows[0].menuitems);
			if (!data || !data.rows) {
				history.push("/");
			} else {
				const kitchenData = data.rows[0];
				// console.log("api response", kitchenData);
				const menuItemData = data.rows[0].menuitems;
				// console.log("menu items array in response", menuItemData);

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

				dispatch({ type: MENU_ITEMS_LOAD, payload: menuItemData });
				dispatch({ type: SELECTED_KITCHEN_LOAD, payload });
			}
		}
		fetchKitchen();
		return () => {};
	}, [kitchenID, dispatch, history]);

	return (
		<div className="bg-gray-100 pb-10 w-full h-full min-h-screen">
			<div>
				<img
					src={mobileHeaderImg}
					alt="banner"
					className="h-56 w-full object-cover sm:h-72 md:h-96 xl:h-96"
				/>
			</div>
			<div className="px-4 w-full lg:max-w-7xl lg:mx-auto">
				<Avatar src={!kitchen.avatarURL ? defaultAvatar : kitchen.avatarURL} />
				<div className="font-body pb-10 transform -translate-y-5">
					<h1 className="text-3xl font-bold lg:text-4xl xl:text-5xl">{kitchen.name}</h1>
					<h1 className="text-sm pt-1 lg:text-base xl:text-lg">{kitchen.address}</h1>
				</div>
				<Carousel />
				<div>
					<h1 className="font-headers text-lg font-bold border-b border-gray-300 pb-3 mb-1 lg:text-2xl">
						Full Menu
					</h1>
					<RenderMenuItems />
				</div>
				<div className="border border-gray-300 font-body rounded-md p-4 mt-8 w-full lg:w-96">
					<h1 className="text-md lg:text-xl">Contact the chef:</h1>
					<h1 className="text-sm lg:text-base">Email for inquiries: {kitchen.email}</h1>
					<h1 className="text-sm lg:text-base">tel: {kitchen.phone}</h1>
				</div>
			</div>
		</div>
	);
};

export default Kitchen;
