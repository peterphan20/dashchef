import React from "react";
import { Link } from "react-router-dom";

const MenuAnchorDesktop = () => {
	return (
		<>
			<Link to={link} className="" onClick={clickHandler} />
			{text}
		</>
	);
};

export default MenuAnchorDesktop;
