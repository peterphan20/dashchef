import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMenuItem } from "../api/MenuItemsAPI";
import { CART_UPDATE, CART_REMOVE } from "../constants";
import RadialInputCart from "../atoms/RadialInputCart";
import LinkCartDesktop from "../atoms/LinkCartDesktop";
import defaultAvatar from "../assets/default-avatar.jpg";
import ModalEditNumber from "../molecules/ModalEditNumber";

const Cart = () => {
	const [method, setMethod] = useState("");
	const [delivery, setDelivery] = useState("");
	const [cartItems, setCartItems] = useState([]);
	const [editNumberModal, setEditNumberModal] = useState(false);
	const user = useSelector((state) => state.userReducer);
	const cart = useSelector((state) => state.cartReducer);
	const dispatch = useDispatch();

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

	const incrementQuantity = (itemID) => {
		console.log(cartItems);
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
		console.log(cartItems);
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

	const renderedCartItems = cartItems.map((cartItem) => {
		return (
			<div key={cartItem.id} className="flex justify-start items-center gap-10 font-body">
				<div className="flex items-center w-16 h-16">
					<img src={defaultAvatar} alt="default" className="rounded" />
				</div>
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
			{editNumberModal ? <ModalEditNumber setEditNumberModal={setEditNumberModal} /> : null}
			<div className="flex justify-between items-start mx-auto">
				<div className="flex flex-col justify-center items-start w-full lg:p-10 lg:mx-auto lg:max-w-3xl">
					<span className="font-headers font-bold lg:text-3xl mb-5">Checkout:</span>
					<div className="flex flex-col justify-start items-start gap-4 border-b border-gray-400 mb-8 pb-5 w-full">
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
					<div className="flex flex-col justify-start items-start gap-4 border-b border-gray-400 mb-8 pb-5 w-full">
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
					<div className="flex flex-col justify-start items-start gap-1 border-b border-gray-400 mb-8 pb-5 w-full">
						<div className="flex justify-center items-center gap-5">
							<span className="font-headers font-bold text-xl">Payment :</span>
							<span>Stripe payment</span>
						</div>
					</div>
					<div className="flex flex-col justify-start items-start gap-1 border-b border-gray-400 mb-8 pb-5 w-full">
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
					<div className="flex flex-col justify-start items-start gap-4 mb-8 pb-5 w-full">
						{cartItems[0] ? (
							<div className="flex flex-col gap-5">
								<span className="font-headers font-bold text-xl">Your items : </span>
								{renderedCartItems}
							</div>
						) : (
							<div>
								<span className="font-headers font-bold text-xl">
									Your Dashchef cart is empty :
								</span>
								<LinkCartDesktop
									className="bg-red-600 text-gray-100 mt-5 w-52"
									link="/kitchens/all"
									placeholder="Browse kitchens"
									clickHandler={() => setIsCartOpen(false)}
								/>
							</div>
						)}
					</div>
				</div>
				<div className="flex flex-col justify-start items-start bg-gray-200 border-l-1 border-gray-300 h-screen lg:w-96 xl:w-1/4">
					Checkout panel coming soon
				</div>
			</div>
		</div>
	);
};

export default Cart;
