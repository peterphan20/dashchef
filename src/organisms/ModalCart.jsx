import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenuItem } from "../api/MenuItemsAPI";
import ButtonProfileDesktop from "../atoms/ButtonProfileDesktop";
import LinkProfileDesktop from "../atoms/LinkProfileDesktop";
import { CART_REMOVE, CART_UPDATE } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTimes, faUtensils } from "@fortawesome/free-solid-svg-icons";

const ModalCart = ({ isCartOpen, setIsCartOpen }) => {
	const [cartItems, setCartItems] = useState([]);
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
		const newItemQuantities = [...cartItems];

		for (let i = 0; i < newItemQuantities.length; i++) {
			const currentItem = newItemQuantities[i];
			if (currentItem.id !== itemID) return;
			currentItem.quantity++;
			setCartItems(newItemQuantities);
			const payload = {
				id: itemID,
				quantity: currentItem.quantity,
			};
			dispatch({ type: CART_UPDATE, payload });
		}
	};

	const decrementQuantity = (itemID) => {
		const newItemQuantities = [...cartItems];

		for (let i = 0; i < newItemQuantities.length; i++) {
			const currentItem = newItemQuantities[i];
			if (currentItem.id !== itemID || currentItem.quantity < 1) return;
			currentItem.quantity--;
			setCartItems(newItemQuantities);
			const payload = {
				id: itemID,
				quantity: currentItem.quantity,
			};
			dispatch({ type: CART_UPDATE, payload });
		}
	};

	const removeCartItem = (itemID) => {
		// for (let i = 0; i < cart.length; i++) {
		// 	const currentItem = cart[i];
		// 	if (currentItem.id === itemID) {
		// 		delete cart[i];
		// 		dispatch({ type: CART_REMOVE, payload: itemID });
		// 	} else {
		// 		return;
		// 	}
		// }
		return cartItems.filter((item) => item.id !== itemID);
	};

	const renderedCartItems = cartItems.map((cartItem) => {
		return (
			<div key={cartItem.id} className="flex justify-between items-center mb-5">
				<div className="flex flex-col justify-center items-start">
					<h1>{cartItem.name}</h1>
					<button onClick={() => removeCartItem(cartItem.id)}>Remove</button>
				</div>
				<div className="flex justify-center items-center gap-2">
					<button
						className="flex justify-center items-center bg-gray-200 text-gray-500 w-7 h-7"
						onClick={() => decrementQuantity(cartItem.itemID)}
					>
						<FontAwesomeIcon icon={faMinus} />
					</button>
					<div>{cartItem.quantity}</div>
					<button
						className="flex justify-center items-center bg-red-600 text-gray-100 w-7 h-7"
						onClick={() => incrementQuantity(cartItem.id)}
					>
						<FontAwesomeIcon icon={faPlus} />
					</button>
				</div>
				<p>{`$${cartItem.price}`}</p>
			</div>
		);
	});

	return (
		<div
			className={`fixed top-0 left-0 w-full h-full z-30 transform ${
				isCartOpen ? "bg-backdrop" : "translate-x-full"
			}`}
			onClick={() => setIsCartOpen(false)}
		>
			<div
				className={`flex flex-col fixed top-0 right-0 shadow-md py-7 px-12 lg:w-1/4 xl:1/5 h-full min-h-screen bg-gray-100 transition duration-300 ease-linear ${
					isCartOpen ? "" : "transform translate-x-full"
				}`}
				onClick={(e) => e.stopPropagation()}
			>
				{cart[0] ? (
					<div className="flex justify-between items-center mb-5">
						<h1 className="text-2xl font-headers font-bold">Your order</h1>
						<button className="text-lg text-gray-500" onClick={() => setIsCartOpen(false)}>
							<FontAwesomeIcon icon={faTimes} />
						</button>
					</div>
				) : (
					<button
						className="flex self-end text-lg text-gray-500 mb-5"
						onClick={() => setIsCartOpen(false)}
					>
						<FontAwesomeIcon icon={faTimes} />
					</button>
				)}
				{cart[0] ? (
					<div>
						{renderedCartItems}
						<ButtonProfileDesktop
							placeholder="Checkout"
							className="text-gray-100 bg-red-600 py-3 w-full"
						/>
					</div>
				) : (
					<div className="flex flex-col justify-center items-center font-body">
						<FontAwesomeIcon icon={faUtensils} className="text-3xl text-gray-400 mb-1" />
						<p className="text-lg font-bold mb-1">Your cart is empty</p>
						<p className="text-sm mb-5">Add items to get started</p>
						<LinkProfileDesktop
							className="bg-red-600 text-gray-100 text-sm"
							link="/kitchens/all"
							placeholder="Browse kitchens"
							clickHandler={() => setIsCartOpen(false)}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default ModalCart;
