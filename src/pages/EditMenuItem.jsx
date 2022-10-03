import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteMenuItem, getMenuItem, updateMenuItem } from "../api/MenuItemsAPI";
import FormInputField from "../molecules/FormInputField";
import { SELECTED_MENU_ITEM_LOAD } from "../constants";
import ButtonFormSmall from "../atoms/ButtonFormSmall";
import ModalDelete from "../molecules/ModalDelete";
import AspectRatioImg from "../molecules/AspectRatioImg";

const EditMenuItem = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [image, setImage] = useState("");
	const [isDeleteItemOpen, setIsDeleteItemOpen] = useState(false);
	const [authResponse, setAuthResponse] = useState(true);
	const user = useSelector((state) => state.userReducer);
	const menuItem = useSelector((state) => state.selectedMenuItemReducer);
	const { menuItemID } = useParams();
	const dispatch = useDispatch();
	const navigateTo = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
		async function getMenuItemData() {
			const token = localStorage.getItem("authToken");
			if (!token) {
				navigateTo("/");
			} else {
				const apiResponse = await getMenuItem(menuItemID);
				const itemData = apiResponse.rows[0];
				setName(itemData.name);
				setDescription(itemData.description);
				setPrice(itemData.price);
				dispatch({ type: SELECTED_MENU_ITEM_LOAD, payload: itemData });
			}
		}
		getMenuItemData();
	}, [menuItemID]);

	const handleEditMenuItem = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) return;

		const menuItemObject = {
			name,
			description,
			price,
		};
		const apiResponse = await updateMenuItem(menuItemID, menuItemObject, token);
		if (apiResponse.code !== 200) {
			setAuthResponse(false);
		} else {
			navigateTo(`/kitchen/${user.kitchenID}`);
		}
	};

	const handleDeleteItem = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) return;
		const apiResponse = await deleteMenuItem(menuItemID, token);
		if (apiResponse.code !== 200) {
			setAuthResponse(false);
		} else {
			navigateTo(`/kitchen/${user.kitchenID}`);
		}
	};

	return (
		<div className="bg-gray-100 py-10 w-full h-full min-h-screen">
			{isDeleteItemOpen ? (
				<ModalDelete
					modalHandler={setIsDeleteItemOpen}
					placeholder="menu item"
					clickHandler={handleDeleteItem}
				/>
			) : null}
			{!authResponse ? <span>Something went wrong, please try again</span> : null}
			<div className="grid grid-cols-6 w-full h-full lg:bg-gray-200 lg:border lg:border-gray-300 lg:py-10 lg:px-16 lg:max-w-2xl lg:w-1/4 xl:w-1/3 lg:mx-auto">
				<h1 className="col-span-6 text-2xl font-headers text-center py-6 lg:text-3xl">
					Edit this menu item?
				</h1>
				<Link to={`/edit/menu-item-image/${menuItem.id}`}>
					<AspectRatioImg
						outerClassName="w-32 h-32 mb-5"
						className="rounded-full"
						src={menuItem.photoPrimaryURL}
						alt={name}
					/>
				</Link>
				<FormInputField
					htmlFor="name"
					text="name"
					type="text"
					placeholder="Item Name"
					gridSpan="col-span-6"
					value={name}
					changeHandler={(e) => setName(e.target.value)}
				/>
				<FormInputField
					htmlFor="price"
					text="price"
					type="number"
					placeholder="Price"
					gridSpan="col-span-1"
					className="max-w-max"
					value={price}
					changeHandler={(e) => setPrice(e.target.value)}
				/>
				<div className="col-span-6">
					<label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
						Description
					</label>
					<textarea
						id="description"
						className="relative block appearance-none text-gray-900 bg-gray-50 rounded border border-gray-300 resize-none px-3 py-2 mb-5 w-full max-w-9xl h-28 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<ButtonFormSmall
					placeholder="Update item"
					className="col-span-2 bg-green-400 text-sm mt-2 py-2 mt-8"
					clickHandler={handleEditMenuItem}
				/>
				<button className="col-span-4 place-self-end" onClick={() => setIsDeleteItemOpen(true)}>
					<i className="fa-solid fa-trash text-gray-500 hover:bg-gray-400" />
				</button>
			</div>
		</div>
	);
};

export default EditMenuItem;
