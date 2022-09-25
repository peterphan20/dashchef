import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getMenuItem } from "../api/MenuItemsAPI";
import AspectRatioImg from "../molecules/AspectRatioImg";

const OrderConfirmation = () => {
	const [cartItems, setCartItems] = useState([]);
	const user = useSelector((state) => state.userReducer);
	const cart = useSelector((state) => state.cartReducer);

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
			<div key={cartItem.id}>
				<div className="flex justify-start item-center">
					<div>
						<AspectRatioImg
							className=" rounded"
							outerClassName="w-36 h-36"
							src={cartItem.photoPrimaryURL}
							alt={cartItem.name}
						/>
					</div>
					<span className="">{cartItem.name}</span>
				</div>
			</div>
		);
	});

	return (
		<div className="bg-gray-100 w-full min-h-screen">
			<div className="flex flex-col justify-center pt-20 max-w-3xl mx-auto">
				<h1 className="font-headers font-bold text-4xl mb-2">ORDER RECEIVED</h1>
				<span className="mb-1">
					<strong>{user.firstName}</strong>, thank you for your order! We will contact you when your
					order is ready.
				</span>
				<span className="pb-10 mb-10 border-b border-gray-300">
					Your order will be delivered to: <strong>{user.address}</strong>
				</span>
				<span className="font-headers font-bold text-xl mb-10">Order Summary :</span>
				<div className="">{renderedCartItems}</div>
			</div>
		</div>
	);
};

export default OrderConfirmation;
