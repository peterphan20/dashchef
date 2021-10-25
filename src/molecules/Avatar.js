import React from "react";

const Avatar = ({ src, label }) => {
	return (
		<div className="flex justify-center items-center bg-gray-200 rounded-full shadow-inner-button p-1 w-20 h-20 z-20 lg:w-24 lg:h-24">
			<img src={src} aria-label={label} className="w-full h-full rounded-full" />
		</div>
	);
};

export default Avatar;
