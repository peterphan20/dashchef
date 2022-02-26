import React from "react";

const Image = ({ src, alt, aspectRatio = 16 / 9, className = "" }) => {
	return (
		<div className="relative" style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}>
			<div className="absolute inset-0">
				<img src={src} className={`${className} w-full h-full object-cover`} alt={alt} />
			</div>
		</div>
	);
};

export default Image;
