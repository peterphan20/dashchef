import React from "react";

const ModalCart = ({ isCartOpen, setIsCartOpen }) => {
	return (
		<div
			className={`fixed top-0 left-0 flex flex-col justify-start items-start bg-gray-100 px-4 py-5 transition-all duration-500 ease-out w-full h-screen z-20 transform ${
				isCartOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
			}`}
		>
			<button onClick={() => setIsCartOpen(false)}>
				<i className="fas fa-times text-2xl text-gray-400"></i>
			</button>
		</div>
	);
};

export default ModalCart;
