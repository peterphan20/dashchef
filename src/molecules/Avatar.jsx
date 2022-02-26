import React from "react";

const Avatar = ({ src, label }) => {
	return (
		<div className="flex justify-center items-center bg-gray-200 rounded-full shadow-inner-button p-1 w-24 h-24 z-20 transform -translate-y-1/2 lg:w-32 lg:h-32">
			<img src={src} aria-label={label} className="w-full h-full rounded-full" />
		</div>
	);
};

export default Avatar;
