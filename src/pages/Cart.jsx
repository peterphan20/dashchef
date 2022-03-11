import React from "react";
import RadialInputCart from "../atoms/RadialInputCart";
import defaultAvatar from "../assets/default-avatar.jpg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrashCan, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
	return (
		<div className="bg-gray-100 w-full h-full min-h-screen">
			<div className="flex justify-between items-start mx-auto">
				<div className="flex flex-col justify-center items-start w-full lg:p-10 lg:mx-auto lg:max-w-4xl">
					<span className="font-headers font-bold lg:text-3xl mb-5">Checkout:</span>
					<div className="flex flex-col justify-start items-start gap-4 border-b border-gray-400 mb-8 pb-5 w-full">
						<span className="font-headers font-bold text-xl">Method :</span>
						<div className="flex flex-col gap-2">
							<RadialInputCart htmlFor="delivery-option" placeholder="Delivery" />
							<RadialInputCart htmlFor="pickup-option" placeholder="Pickup" />
						</div>
					</div>
					<div className="flex flex-col justify-start items-start gap-4 border-b border-gray-400 mb-8 pb-5 w-full">
						<div className="flex justify-center items-center gap-5">
							<span className="font-headers font-bold text-xl">Delivery :</span>
							<span className="font-headers font-bold text-base">45-60 min</span>
						</div>
						<div className="flex flex-col gap-2">
							<RadialInputCart htmlFor="standard-option" placeholder="Standard" />
							<RadialInputCart htmlFor="later-option" placeholder="Schedule for later" />
						</div>
					</div>
					<div className="flex flex-col justify-start items-start gap-1 border-b border-gray-400 mb-8 pb-5 w-full">
						<div className="flex justify-center items-center gap-5">
							<span className="font-headers font-bold text-xl">Payment :</span>
							<span>Will not be implementing stripes payment system</span>
						</div>
					</div>
					<div className="flex flex-col justify-start items-start gap-1 border-b border-gray-400 mb-8 pb-5 w-full">
						<div className="flex justify-center items-center gap-5">
							<span className="font-headers font-bold text-xl">Phone number :</span>
							<span className="font-headers font-bold text-base">12345678</span>
						</div>
						<button>Change</button>
					</div>
					<div className="flex flex-col justify-start items-start gap-4 border-b border-gray-400 mb-8 pb-5 w-full">
						<span className="font-headers font-bold text-xl">Payment :</span>
					</div>
					<div className="flex flex-col justify-start items-start gap-4 border-b border-gray-400 mb-8 pb-5 w-full">
						<span className="font-headers font-bold text-xl">Your items : </span>
						<div className="flex justify-start items-center gap-10">
							<div className="flex items-center w-16 h-16">
								<img src={defaultAvatar} alt="default" className="rounded" />
							</div>
							<div className="flex flex-col gap-2">
								<span>Chicken Alfredo</span>
								<span>$10.99</span>
							</div>
							<div className="flex justify-center items-center gap-2">
								<button
									className="flex justify-center items-center bg-gray-200 text-gray-500 w-5 h-5"
									// onClick={() => decrementQuantity(cartItem.id)}
								>
									{/* <FontAwesomeIcon icon={faMinus} /> */}
								</button>
								<span className="text-base">1</span>
								<button
									className="flex justify-center items-center bg-red-600 text-gray-100 w-5 h-5"
									// onClick={() => incrementQuantity(cartItem.id)}
								>
									{/* <FontAwesomeIcon icon={faPlus} /> */}
								</button>
							</div>
							{/* <FontAwesomeIcon className="text-gray-500 text-xl" icon={faTrashCan} /> */}
						</div>
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
