import React from "react";
import { useSelector } from "react-redux";

const ModalCart = ({ isCartOpen, setIsCartOpen }) => {
	const cart = useSelector((state) => state.cartReducer);

	// const renderedCartItems = cart.map((cartItem) => {
	// 	return <div key={cartItem.itemID}></div>;
	// });

	return (
		<div
			className={`fixed top-0 left-0 w-full h-full z-30 transform ${
				isCartOpen ? "bg-backdrop" : "translate-x-full"
			}`}
			onClick={() => setIsCartOpen(false)}
		>
			<div
				className={`flex flex-col fixed top-0 right-0 shadow-md p-5 w-96 h-full min-h-screen bg-gray-100 transition duration-300 ease-linear ${
					isCartOpen ? "" : "transform translate-x-full"
				}`}
				onClick={(e) => e.stopPropagation()}
			>
				<button
					className="flex self-end text-lg text-gray-500 mb-5"
					onClick={() => setIsCartOpen(false)}
				>
					<i className="fas fa-times"></i>
				</button>
				{cart[0] ? (
					<h1 className="text-2xl font-headers font-bold">Your order</h1>
				) : (
					<div className="flex flex-col justify-center items-center font-body">
						<p className="text-lg font-bold">Your cart is empty</p>
						<p className="text-sm">Add items to get started</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default ModalCart;
