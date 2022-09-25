import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllKitchen } from "../api/kitchensAPI";
import { KITCHENS_LOAD } from "../constants";
import defaultAvatar from "../assets/default-avatar.jpg";
import AspectRatioImg from "../molecules/AspectRatioImg";

const KitchensList = () => {
	const dispatch = useDispatch();
	const navigateTo = useNavigate();
	const kitchens = useSelector((state) => state.kitchensReducer);

	useEffect(() => {
		async function getKitchens() {
			const data = await getAllKitchen();
			if (!data || !data.rows) {
				navigateTo("/");
			} else {
				const kitchensData = data.rows;
				dispatch({ type: KITCHENS_LOAD, payload: kitchensData });
			}
		}
		getKitchens();
	}, [dispatch, navigateTo]);

	const renderedKitchenCards = kitchens.map((kitchen) => {
		return (
			<div key={kitchen.id} className="bg-gray-50 border border-gray-200 h-64 lg:w-80 lg:max-h-96">
				<Link to={`/kitchen/${kitchen.id}`}>
					<AspectRatioImg
						src={kitchen.avatarURL ? kitchen.avatarURL : defaultAvatar}
						alt="kitchen's avatar"
					/>
					<div className="flex flex-col justify-center items-start font-body lg:text-sm lg:p-2">
						<h1 className="font-headers font-bold lg:text-base px-2">{kitchen.name}</h1>
						<h1 className="text-xs px-2">{kitchen.address}</h1>
					</div>
				</Link>
			</div>
		);
	});

	return (
		<div className="bg-gray-100 w-full h-full min-h-screen">
			<div className="lg:py-10 lg:mx-auto lg:max-w-6xl">
				<h1 className="font-headers font-bold lg:text-3xl">Browse local kitchens: </h1>
				<p className="font-body lg:mb-10 lg:text-base">{kitchens.length} results</p>
				<div className="grid grid-cols-3 gap-y-5 lg:max-w-6xl mx-auto">{renderedKitchenCards}</div>
			</div>
		</div>
	);
};

export default KitchensList;
