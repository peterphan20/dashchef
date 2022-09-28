import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMenuItem } from "../api/MenuItemsAPI";
import { CART_UPDATE, CART_REMOVE } from "../constants";
import LinkCartDesktop from "../atoms/LinkCartDesktop";

const KitchenItemsPanel = () => {
	const [cartItems, setCartItems] = useState([]);
	const cart = useSelector((state) => state.cartReducer);
	const kitchen = useSelector((state) => state.selectedKitchenReducer);
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

	const renderedCartItems = cartItems.map((cartItem) => {
		return (
			<div
				key={cartItem.id}
				className="flex items-center gap-10 p-5 border-b-2 border-gray-200 w-full"
			>
				<div className="flex flex-col justify-center items-center">
					<button
						className="flex justify-center items-center bg-red-600 text-gray-100 p-2 w-5 h-5"
						onClick={() => incrementQuantity(cartItem.id)}
					>
						<i className="fa-solid fa-plus" />
					</button>
					<span className="text-base">{cartItem.quantity}</span>
					<button
						className="flex justify-center items-center bg-gray-200 text-gray-500 p-2 w-5 h-5"
						onClick={() => decrementQuantity(cartItem.id)}
					>
						<i className="fa-solid fa-minus" />
					</button>
				</div>
				<div className="flex flex-col justify-start items-start font-body w-full">
					<span className="text-lg font-header font-bold w-full">{cartItem.name}</span>
					<span className="text-xs break-normal pb-1">{cartItem.description}</span>
					<span className="text-sm font-bold">{`$${cartItem.price}`}</span>
				</div>
				<div>
					<button onClick={() => removeCartItem(cartItem.id)}>
						<i className="fa-solid fa-trash text-gray-500 hover:text-gray-400" />
					</button>
				</div>
			</div>
		);
	});

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

	return (
		<div className="relative border-l border-gray-300 h-full lg:w-80 xl:w-96">
			{cart[0] ? (
				<div className="sticky top-24">
					<div className="flex flex-col border-b border-gray-300 p-5">
						<span className="font-body text-sm">Your cart from:</span>
						<span className="font-headers font-bold text-lg pb-5">{kitchen.name}</span>
						<LinkCartDesktop link="/cart" placeholder="Checkout" />
					</div>
					<div className="w-full">{renderedCartItems}</div>
				</div>
			) : (
				<div className="sticky top-20 flex flex-col justify-start items-center font-body p-10">
					<i className="fa-solid fa-burger text-3xl text-gray-300 mb-1" />
					<p className="text-lg font-bold mb-1">Your cart is empty</p>
					<p className="text-sm mb-5">Add an item to get started</p>
				</div>
			)}
		</div>
	);
};

export default KitchenItemsPanel;
