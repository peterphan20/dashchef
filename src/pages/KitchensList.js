import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllKitchen } from "../api/kitchensAPI";
import { KITCHENS_LOAD } from "../constants";
import defaultAvatar from "../assets/default-avatar.jpg";

const KitchensList = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const kitchens = useSelector((state) => state.kitchensReducer);

	useEffect(() => {
		async function getKitchens() {
			const data = await getAllKitchen();
			if (!data || !data.rows) {
				history("/");
			} else {
				const kitchensData = data.rows;
				dispatch({ type: KITCHENS_LOAD, payload: kitchensData });
			}
		}
		getKitchens();
	}, [dispatch, history]);

	const renderedKitchenCards = kitchens.map((kitchen, idx) => {
		return (
			<div key={idx} className="border border-gray-300 lg:w-80">
				<div>
					<img
						src={kitchen.avatarURL ? kitchen.avatarURL : defaultAvatar}
						className="w-full h-28 bg-contain aspect-square"
						alt="kitchen's avatar"
					/>
				</div>
				<div className="font-body lg:text-sm lg:p-3">
					<h1 className="font-headers font-bold lg:text-lg">{kitchen.name}</h1>
					<h1>{kitchen.address}</h1>
					<h1>{kitchen.phone}</h1>
				</div>
			</div>
		);
	});

	return (
		<div className="bg-gray-100 w-full h-full min-h-screen">
			<div className="lg:py-10 lg:mx-auto lg:max-w-7xl">
				<h1 className="font-headers font-bold lg:text-3xl">Browse local kitchens: </h1>
				<p className="font-body lg:grid lg: lg:mb-10 lg:text-base">{kitchens.length} results</p>
				<div>{renderedKitchenCards}</div>
			</div>
		</div>
	);
};

export default KitchensList;
