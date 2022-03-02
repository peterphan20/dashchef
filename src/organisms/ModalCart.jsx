import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenuItem } from "../api/MenuItemsAPI";
import ButtonProfileDesktop from "../atoms/ButtonProfileDesktop";
import LinkProfileDesktop from "../atoms/LinkProfileDesktop";
import { CART_REMOVE } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUtensils } from "@fortawesome/free-solid-svg-icons";

const ModalCart = ({ isCartOpen, setIsCartOpen }) => {
	const cart = useSelector((state) => state.cartReducer);
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	async function getCartItem() {
	// 		const data = await getMenuItem(cart.itemID);
	// 		console.log("cart data", data);
	// 	}
	// 	getCartItem();
	// });

	const renderedCartItems = cart.map((cartItem) => {
		return (
			<div key={cartItem.itemID} className="flex justify-between items-center">
				<div className="flex flex-col justify-center items-start">
					<h1>Item name</h1>
					<button onClick={() => dispatch({ payload: cartItem.itemID, type: CART_REMOVE })}>
						Remove
					</button>
				</div>
				<p></p>
				<p>Price of item</p>
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
				className={`flex flex-col fixed top-0 right-0 shadow-md p-5 lg:w-1/5 xl:1/5 h-full min-h-screen bg-gray-100 transition duration-300 ease-linear ${
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
						<div className="flex justify-between items-center gap-2">
							<ButtonProfileDesktop
								placeholder="Continue Shopping"
								className="bg-gray-100 text-sm border border-gray-900"
							/>
							<ButtonProfileDesktop placeholder="Checkout" className="bg-red-600" />
						</div>
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
