import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMenuItem } from "../api/MenuItemsAPI";
import { getUser, updateUser, validateToken } from "../api/usersAPI";
import { getChef, updateChef } from "../api/chefsAPI";
import { CART_UPDATE, CART_REMOVE } from "../constants";
import RadialInputCart from "../atoms/RadialInputCart";
import LinkCartDesktop from "../atoms/LinkCartDesktop";
import ModalEditNumber from "../molecules/ModalEditNumber";
import CheckoutPanel from "../organisms/CheckoutPanel";

const Cart = () => {
	const [method, setMethod] = useState("");
	const [delivery, setDelivery] = useState("");
	const [cartItems, setCartItems] = useState([]);
	const [editNumberModal, setEditNumberModal] = useState(false);
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
			setEditNumberModal(false);
		}
	};

	const handleChefUpdate = async (chefObject, token) => {
		const apiResponse = await updateChef(userID, chefObject, token);
		if (apiResponse.code !== 200) {
			setAuthResponse(false);
		} else {
			setAuthResponse(true);
			setEditNumberModal(false);
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
			<div key={cartItem.id} className="flex justify-start items-center gap-10 font-body">
				<div className="flex flex-col gap-1">
					<span>{cartItem.name}</span>
					<span>{`$${cartItem.price}`}</span>
				</div>
				<div className="flex justify-center items-center gap-2">
					<button
						className="flex justify-center items-center bg-gray-200 text-gray-500 w-5 h-5"
						onClick={() => decrementQuantity(cartItem.id)}
					>
						<i className="fa-solid fa-minus" />
					</button>
					<span className="text-base">{cartItem.quantity}</span>
					<button
						className="flex justify-center items-center bg-red-600 text-gray-100 w-5 h-5"
						onClick={() => incrementQuantity(cartItem.id)}
					>
						<i className="fa-solid fa-plus" />
					</button>
				</div>
				<button onClick={() => removeCartItem(cartItem.id)}>
					<i className="fa-solid fa-trash text-gray-500" />
				</button>
			</div>
		);
	});

	return (
		<div className="bg-gray-100 w-full h-full min-h-screen">
			{editNumberModal ? (
				<ModalEditNumber
					setEditNumberModal={setEditNumberModal}
					phone={phone}
					setPhone={setPhone}
					updatePhoneNumber={updatePhoneNumber}
				/>
			) : null}
			<div className="flex justify-between items-start mx-auto">
				<div className="flex flex-col justify-center items-start border border-gray-300 rounded mt-10 w-full lg:mx-auto lg:max-w-3xl">
					<span className="font-headers font-bold pt-10 px-10 lg:text-3xl">Checkout:</span>
					<div className="flex flex-col justify-start items-start gap-4 border-b border-gray-300 p-10 w-full">
						<span className="font-headers font-bold text-xl">Method :</span>
						<div className="flex flex-col gap-2">
							<RadialInputCart
								htmlFor="delivery-option"
								placeholder="Delivery"
								value="deliveryOption"
								checked={method === "deliveryOption"}
								onChange={(e) => setMethod(e.target.value)}
							/>
							<RadialInputCart
								htmlFor="pickup-option"
								placeholder="Pickup"
								value="pickupOption"
								checked={method === "pickupOption"}
								onChange={(e) => setMethod(e.target.value)}
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
								value="standardOption"
								checked={delivery === "standardOption"}
								onChange={() => setDelivery(e.target.value)}
							/>
							<RadialInputCart
								htmlFor="later-option"
								placeholder="Schedule for later"
								value="laterOption"
								checked={delivery === "laterOption"}
								onChange={() => setDelivery(e.target.value)}
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
							onClick={() => setEditNumberModal(true)}
						>
							Change
						</button>
					</div>
					<div>
						{cartItems[0] ? (
							<div className="flex flex-col gap-5 p-10 w-full">
								<span className="font-headers font-bold text-xl">Your items : </span>
								{renderedCartItems}
							</div>
						) : null}
					</div>
				</div>
				<div className="flex border-l border-gray-300 h-screen lg:w-80 xl:w-96">
					<CheckoutPanel />
				</div>
			</div>
		</div>
	);
};

export default Cart;
