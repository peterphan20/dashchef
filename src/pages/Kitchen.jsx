import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getKitchen } from "../api/kitchensAPI";
import Carousel from "../organisms/Carousel";
import RenderMenuItems from "../organisms/RenderMenuItems";
import Avatar from "../molecules/Avatar";
import defaultAvatar from "../assets/default-avatar.jpg";
import mobileHeaderImg from "../assets/mobile-header-image.jpg";
import { MENU_ITEMS_LOAD, SELECTED_KITCHEN_LOAD } from "../constants";
import KitchenItemsPanel from "../organisms/KitchenItemsPanel";

const Kitchen = () => {
	const navigateTo = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userReducer);
	const kitchen = useSelector((state) => state.selectedKitchenReducer);
	const { kitchenID } = useParams();

	useEffect(() => {
		async function fetchKitchen() {
			const data = await getKitchen(kitchenID);
			if (!data || !data.rows) {
				navigateTo("/");
			} else {
				const kitchenData = data.rows[0];
				const menuItemData = data.rows[0].menuitems;

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
	}, [kitchenID, dispatch, navigateTo]);

	return (
		<div className="bg-gray-100 w-full h-full min-h-screen">
			<div>
				<img
					src={mobileHeaderImg}
					alt="banner"
					className="h-56 w-full object-cover sm:h-72 md:h-96 xl:h-96"
				/>
			</div>
			<div className="relative flex justify-between w-full">
				<div className="w-full lg:max-w-4xl lg:mx-auto">
					<Avatar
						src={!kitchen.avatarURL ? defaultAvatar : kitchen.avatarURL}
						alt="Image of the kitchen"
						link={`/image-upload/kitchen/${kitchenID}`}
						className="transform -translate-y-1/2"
						disabled={user.kitchenID !== kitchenID}
					/>
					<div className="font-body pb-10 transform -translate-y-5">
						<h1 className="text-3xl font-bold lg:text-4xl xl:text-5xl">{kitchen.name}</h1>
						<h1 className="text-sm pt-1 lg:text-base xl:text-lg">{kitchen.address}</h1>
					</div>
					<div>
						<h1 className="font-headers text-lg font-bold border-b border-gray-300 pb-3 mb-1 lg:text-2xl">
							Full Menu
						</h1>
						<RenderMenuItems kitchen={kitchen} />
					</div>
					<div className="bg-gray-200 border border-gray-300 font-body rounded-md p-4 mt-8 w-full lg:p-7 lg:mb-20 lg:w-96">
						<h1 className="text-md lg:text-xl">Contact the chef:</h1>
						<h1 className="text-sm lg:text-base">Email for inquiries: {kitchen.email}</h1>
						<h1 className="text-sm lg:text-base">tel: {kitchen.phone}</h1>
					</div>
				</div>
				<div>
					<KitchenItemsPanel />
				</div>
			</div>
		</div>
	);
};

export default Kitchen;
