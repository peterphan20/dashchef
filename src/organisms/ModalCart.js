import React from "react";

const ModalCart = ({ isCartOpen, setIsCartOpen }) => {
	return (
		<div
			className={`fixed top-0 left-0 w-full h-full z-30 transform ${
				isCartOpen ? "bg-backdrop" : "translate-x-full"
			}`}
			onClick={() => setIsCartOpen(false)}
		>
			<div
				className={`fixed top-0 right-0 shadow-md w-96 h-full min-h-screen bg-blue-600 transition duration-300 ease-linear ${
					isCartOpen ? "" : "transform translate-x-full"
				}`}
				onClick={(e) => e.stopPropagation()}
			>
				hello world
			</div>
		</div>
	);
};

export default ModalCart;
