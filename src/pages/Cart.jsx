import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMenuItem } from "../api/MenuItemsAPI";
import { getUser, updateUser, validateToken } from "../api/usersAPI";
import { getChef, updateChef } from "../api/chefsAPI";
import { CART_UPDATE, CART_REMOVE } from "../constants";
import RadialInputCart from "../molecules/RadialInputCart";
import ModalEditNumber from "../molecules/ModalEditNumber";
import CheckoutPanel from "../organisms/CheckoutPanel";
import AspectRatioImg from "../molecules/AspectRatioImg";

const Cart = () => {
	const [method, setMethod] = useState("");
	const [delivery, setDelivery] = useState("");
	const [cartItems, setCartItems] = useState([]);
	const [isEditNumberOpen, setIsEditNumberOpen] = useState(false);
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [aptNumber, setAptNumber] = useState("");
	const [city, setCity] = useState("");
	const [geoState, setGeoState] = useState(null);
	const [zipcode, setZipCode] = useState("");
	const user = useSelector((state) => state.userReducer);
	const cart = useSelector((state) => state.cartReducer);
	const dispatch = useDispatch();
	const navigateTo = useNavigate();

	useEffect(() => {
		async function getCartItem() {
			const cartItemArray = [...cart];
			for (let i = 0; i < cartItemArray.length; i++) {
				const currentItem = cartItemArray[i];
				const data = await getMenuItem(currentItem.id);
				if (!data) return;
				cartItemArray[i] = { ...data.rows[0], quantity: currentItem.quantity };
			}
			setCartItems(cartItemArray);
		}
		getCartItem();
	}, [cart]);

	useEffect(() => {
		window.scrollTo(0, 0);
		async function getUserData() {
			const token = localStorage.getItem("authToken");
			const isChef = localStorage.getItem("isChef");
			if (!token) {
				navigateTo("/");
			} else {
				const apiResponse = await validateToken(token);
				if (!apiResponse.id) return;
				if (isChef === "0") {
					const userApiResponse = await getUser(apiResponse.id);
					const userData = userApiResponse.rows[0];
					setEmail(userData.email);
					setPhone(userData.phone);
					const splitAddress = userData.address.split(", ");
					if (splitAddress[0]) setAddress(splitAddress[0]);
					if (splitAddress[1]) setCity(splitAddress[1]);
					if (splitAddress[2]) setGeoState(splitAddress[2]);
					if (splitAddress[3]) setZipCode(splitAddress[3]);
					if (!splitAddress[4]) {
						setAptNumber("");
					} else {
						setAptNumber(splitAddress[4]);
					}
				} else {
					const chefApiResponse = await getChef(apiResponse.id);
					const chefData = chefApiResponse.rows[0];
					setEmail(chefData.email);
					setPhone(chefData.phone);
					const splitAddress = chefData.address.split(", ");
					if (splitAddress[0]) setAddress(splitAddress[0]);
					if (splitAddress[1]) setCity(splitAddress[1]);
					if (splitAddress[2]) setGeoState(splitAddress[2]);
					if (splitAddress[3]) setZipCode(splitAddress[3]);
					if (!splitAddress[4]) {
						setAptNumber("");
					} else {
						setAptNumber(splitAddress[4]);
					}
				}
			}
		}
		getUserData();
	}, [navigateTo]);

	const incrementQuantity = (itemID) => {
		const newItemQuantities = [...cartItems];
		for (let i = 0; i < newItemQuantities.length; i++) {
			const currentItem = newItemQuantities[i];
			if (currentItem.id === itemID) {
				currentItem.quantity++;
				setCartItems(newItemQuantities);
				const payload = {
					id: itemID,
					quantity: currentItem.quantity,
				};
				dispatch({ type: CART_UPDATE, payload });
			}
		}
	};

	const decrementQuantity = (itemID) => {
		const newItemQuantities = [...cartItems];
		for (let i = 0; i < newItemQuantities.length; i++) {
			const currentItem = newItemQuantities[i];
			if (currentItem.id === itemID && currentItem.quantity > 1) {
				currentItem.quantity--;
				setCartItems(newItemQuantities);
				const payload = {
					id: itemID,
					quantity: currentItem.quantity,
				};
				dispatch({ type: CART_UPDATE, payload });
			}
		}
	};

	const removeCartItem = (itemID) => {
		for (let i = 0; i < cart.length; i++) {
			const currentItem = cart[i];
			if (currentItem.id === itemID) {
				delete cart[i];
				dispatch({ type: CART_REMOVE, payload: itemID });
			}
		}
	};

	const handleUserUpdate = async (userObject, token) => {
		const apiResponse = await updateUser(userID, userObject, token);
		if (apiResponse.code !== 200) {
			setAuthResponse(false);
		} else {
			setAuthResponse(true);
			setIsEditNumberOpen(false);
		}
	};

	const handleChefUpdate = async (chefObject, token) => {
		const apiResponse = await updateChef(userID, chefObject, token);
		if (apiResponse.code !== 200) {
			setAuthResponse(false);
		} else {
			setAuthResponse(true);
			setIsEditNumberOpen(false);
		}
	};

	const updatePhoneNumber = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) return;

		const addressStr = `${address}, ${city}, ${geoState}, ${zipcode}, ${
			aptNumber ? aptNumber : ""
		}`;

		const userObject = {
			firstName: user.firstName,
			lastName: user.lastName,
			email,
			address: addressStr.toUpperCase(),
			phone,
		};

		if (!user.isChef) {
			handleUserUpdate(userObject, token);
		} else {
			handleChefUpdate(userObject, token);
		}
	};

	const renderedCartItems = cartItems.map((cartItem) => {
		return (
			<div key={cartItem.id} className="grid grid-cols-6 gap-3 font-body my-5">
				<AspectRatioImg
					src={cartItem.photoPrimaryURL}
					alt={cartItem.name}
					outerClassName="col-span-1 h-28"
					className="rounded"
				/>
				<div className="col-span-2 flex flex-col justify-center gap-1">
					<span>{cartItem.name}</span>
					<span>{`$${cartItem.price}`}</span>
				</div>
				<div className="col-span-1 flex items-center gap-4">
					<button
						className="flex justify-center items-center bg-gray-200 text-gray-500 p-2 w-5 h-5"
						onClick={() => decrementQuantity(cartItem.id)}
					>
						<i className="fa-solid fa-minus" />
					</button>
					<span className="text-base">{cartItem.quantity}</span>
					<button
						className="flex justify-center items-center bg-red-600 text-gray-100 p-2 w-5 h-5"
						onClick={() => incrementQuantity(cartItem.id)}
					>
						<i className="fa-solid fa-plus" />
					</button>
					<button onClick={() => removeCartItem(cartItem.id)}>
						<i className="fa-solid fa-trash text-gray-500 ml-5 hover:text-gray-400" />
					</button>
				</div>
			</div>
		);
	});

	return (
		<div className="bg-gray-100 w-full h-full min-h-screen">
			{isEditNumberOpen ? (
				<ModalEditNumber
					setIsEditNumberOpen={setIsEditNumberOpen}
					phone={phone}
					setPhone={setPhone}
					updatePhoneNumber={updatePhoneNumber}
				/>
			) : null}
			<div className="flex justify-between items-start mx-auto">
				<div className="flex flex-col justify-center items-start border border-gray-300 rounded my-10 w-full lg:mx-auto lg:max-w-3xl">
					<span className="font-headers font-bold pt-10 px-10 lg:text-3xl">Checkout:</span>
					<div className="flex flex-col justify-start items-start gap-4 border-b border-gray-300 p-10 w-full">
						<span className="font-headers font-bold text-xl">Method :</span>
						<div className="flex flex-col gap-2">
							<RadialInputCart
								htmlFor="delivery-option"
								placeholder="Delivery"
								radialName="deliveryOption"
								value="deliveryOption"
								checked={method === "deliveryOption"}
								changeHandler={(e) => setMethod(e.target.value)}
							/>
							<RadialInputCart
								htmlFor="pickup-option"
								placeholder="Pickup"
								radialName="deliveryOption"
								value="pickupOption"
								checked={method === "pickupOption"}
								changeHandler={(e) => setMethod(e.target.value)}
							/>
						</div>
					</div>
					<div className="flex flex-col justify-start items-start gap-4 border-b border-gray-300 p-10 w-full ">
						<div className="flex justify-center items-center gap-5">
							<span className="font-headers font-bold text-xl">Delivery :</span>
							<span className="font-headers font-bold text-base">45-60 min</span>
						</div>
						<div className="flex flex-col gap-2">
							<RadialInputCart
								htmlFor="standard-option"
								placeholder="Standard"
								radialName="scheduleOption"
								value="standardOption"
								checked={delivery === "standardOption"}
								changeHandler={(e) => setDelivery(e.target.value)}
							/>
							<RadialInputCart
								htmlFor="later-option"
								placeholder="Schedule for later"
								radialName="scheduleOption"
								value="laterOption"
								checked={delivery === "laterOption"}
								changeHandler={(e) => setDelivery(e.target.value)}
							/>
						</div>
					</div>
					<div className="flex flex-col justify-start items-start gap-1 border-b border-gray-300 p-10 w-full">
						<div className="flex justify-center items-center gap-5">
							<span className="font-headers font-bold text-xl">Payment :</span>
							<span>Stripe payment</span>
						</div>
					</div>
					<div className="flex flex-col justify-start items-start gap-1 border-b border-gray-300 p-10 w-full">
						<div className="flex justify-center items-center gap-5">
							<span className="font-headers font-bold text-xl">Phone number :</span>
							<span className="font-headers font-bold text-base">{user.phone}</span>
						</div>
						<button
							className="text-red-600 text-sm font-body font-bold"
							onClick={() => setIsEditNumberOpen(true)}
						>
							Change
						</button>
					</div>
					<div className="w-full">
						{cartItems[0] ? (
							<div className="p-10 w-full">
								<span className="col-span-6 font-headers font-bold text-xl">Your items : </span>
								{renderedCartItems}
							</div>
						) : null}
					</div>
				</div>
				<div className="flex border-l border-gray-300 h-screen lg:w-80 xl:w-96">
					<CheckoutPanel cartItems={cartItems} />
				</div>
			</div>
		</div>
	);
};

export default Cart;
