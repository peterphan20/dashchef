import React from "react";

const Footer = () => {
	return (
		<div className="flex flex-col justify-center items-center bg-gray-200 text-gray-900 px-4 w-full h-full min-w-screen lg:pt-8 lg:pb-5">
			<div className="text-center py-5 border-b border-gray-300">
				<h1 className="text-4xl font-body font-bold pb-3 lg:text-5xl">Dashchef</h1>
				<p className="font-body">
					<a
						href="https://github.com/peterphan20/dashchef.git"
						target="_blank"
						rel="noreferrer"
						aria-label="Click here to open the Dashchef Page's github in a new tab."
					>
						<i className="fab fa-github-square text-gray-900 text-2xl lg:text-3xl"></i>
					</a>
				</p>
			</div>
			<h1 className="text-center text-gray-500 font-body py-5">
				©️ 2021 Dashchef. All rights reserved.
			</h1>
		</div>
	);
};

export default Footer;
