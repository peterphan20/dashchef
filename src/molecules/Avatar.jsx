import React from "react";
import { Link } from "react-router-dom";

const Avatar = ({ src, link, disabled, alt, className = "" }) => {
	return (
		<Link to={link} disabled={disabled} className={`flex overflow-hidden w-fit ${className}`}>
			<img src={src} alt={alt} className="object-cover h-32 w-32 rounded-full" />
		</Link>
	);
};
export default Avatar;
