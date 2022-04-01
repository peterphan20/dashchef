import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenuItem } from "../api/MenuItemsAPI";
import LinkCartDesktop from "../atoms/LinkCartDesktop";
import { CART_REMOVE, CART_UPDATE } from "../constants";

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

	const renderedCartItems = cartItems.map((cartItem) => {
		return (
			<div
				key={cartItem.id}
				className="flex items-center gap-10 py-5 border-b-2 border-gray-200 w-full"
			>
				<div className="flex flex-col justify-center items-center">
					<button
						className="flex justify-center items-center bg-red-600 text-gray-100 w-5 h-5"
						onClick={() => incrementQuantity(cartItem.id)}
					>
						<i className="fa-solid fa-plus" />
					</button>
					<span className="text-base">{cartItem.quantity}</span>
					<button
						className="flex justify-center items-center bg-gray-200 text-gray-500 w-5 h-5"
						onClick={() => decrementQuantity(cartItem.id)}
					>
						<i className="fa-solid fa-minus" />
					</button>
				</div>
				<div className="flex flex-col justify-start items-start font-body w-full">
					<span className="text-lg font-header font-bold w-full">{cartItem.name}</span>
					<span className="text-xs truncate ...">{cartItem.description}</span>
					<span className="text-xs">{`$${cartItem.price}`}</span>
				</div>
				<div>
					<button onClick={() => removeCartItem(cartItem.id)}>
						<i className="fa-solid fa-trash text-gray-500" />
					</button>
				</div>
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
				className={`flex flex-col fixed top-0 right-0 shadow-md py-7 px-5 w-96 xl:1/5 h-full min-h-screen bg-gray-100 transition duration-300 ease-linear ${
					isCartOpen ? "" : "transform translate-x-full"
				}`}
				onClick={(e) => e.stopPropagation()}
			>
				{cart[0] ? (
					<div className="flex justify-between items-center border-b-2 border-gray-200 pb-5">
						<h1 className="text-2xl font-headers font-bold">Your order</h1>
						<button className="text-lg text-gray-500" onClick={() => setIsCartOpen(false)}>
							<i className="fa-solid fa-xmark" />
						</button>
					</div>
				) : (
					<button
						className="flex self-end text-lg text-gray-500 mb-5"
						onClick={() => setIsCartOpen(false)}
					>
						<i className="fa-solid fa-xmark" />
					</button>
				)}
				{cart[0] ? (
					<div>
						{renderedCartItems}
						<div className="mt-5 w-full">
							<LinkCartDesktop
								className="text-gray-100 bg-red-600 py-3"
								link="/cart"
								placeholder="Proceed to checkout"
								clickHandler={() => setIsCartOpen(false)}
							/>
						</div>
					</div>
				) : (
					<div className="flex flex-col justify-center items-center font-body">
						<i className="fa-solid fa-burger-fries text-3xl text-gray-300 mb-1" />
						<p className="text-lg font-bold mb-1">Your cart is empty</p>
						<p className="text-sm mb-5">Add items to get started</p>
						<div>
							<LinkCartDesktop
								className="bg-red-600 text-gray-100"
								link="/kitchens/all"
								placeholder="Browse kitchens"
								clickHandler={() => setIsCartOpen(false)}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ModalCart;
