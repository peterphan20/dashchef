import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllKitchen } from "../api/kitchensAPI";
import { KITCHENS_LOAD } from "../constants";

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
	});

	const renderedKitchenCards = kitchens.map((kitchen, idx) => {
		return (
			<div key={idx} className="">
				<h1>{kitchen.name}</h1>
				<h1>{kitchen.email}</h1>
				<h1>{kitchen.address}</h1>
				<h1>{kitchen.phone}</h1>
			</div>
		);
	});

	return (
		<div className="bg-gray-100 w-full h-full min-h-screen">
			<div className="lg:mx-auto lg:max-w-7xl">{renderedKitchenCards}</div>
		</div>
	);
};

export default KitchensList;
