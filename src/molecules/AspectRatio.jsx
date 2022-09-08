import React from "react";

const AspectRatioImg = ({ src, aspectRatio = 16 / 9, outerClassName = "", className = "" }) => {
	return (
		<div
			className={`${outerClassName} relative`}
			style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}
		>
			<div className="absolute inset-0">
				<img src={src} className={`${className} w-full h-full object-cover`} />
			</div>
		</div>
	);
};

export default AspectRatioImg;
