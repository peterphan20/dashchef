import React from "react";

const Footer = () => {
	return (
		<div className="flex flex-col justify-center items-center bg-gray-200 text-gray-900 px-4 w-full h-full min-w-screen lg:py-10">
			<div className="text-center border-b border-gray-300">
				<h1 className="text-4xl font-body font-bold mb-1 lg:text-5xl">Dashchef</h1>
				<p className="font-body mb-2">
					<a
						href="https://github.com/peterphan20/dashchef.git"
						target="_blank"
						rel="noreferrer"
						aria-label="Click here to open the Dashchef Page's github in a new tab."
					>
						<i className="fa-brands fa-github-square text-3xl" />
					</a>
				</p>
			</div>
			<h1 className="text-center text-gray-500 font-body mt-5">
				©️ 2021 Dashchef. All rights reserved.
			</h1>
		</div>
	);
};

export default Footer;
