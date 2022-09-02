import React from "react";
import driverSignup from "../assets/driver-signup-image.jpg";

const Driver = () => {
	return (
		<div className="bg-gray-100 w-full min-h-screen">
			<div className="bg-red-600 mb-16 w-full">
				<div className="flex justify-center items-start gap-48 py-10 lg:max-w-7xl lg:mx-auto">
					<div className="flex flex-col justify-start gap-10">
						<div className="flex flex-col justify-center items-start font-headers font-bold text-gray-100 text-2xl">
							<span>Be your own boss.</span>
							<span>Work on your own time.</span>
							<span>Set your own goals.</span>
							<span className="font-normal font-body text-base">
								Start driving today and get paid using the Dashchef app
							</span>
						</div>
						<div className="lg:max-w-xl w-full">
							<div className="flex flex-col gap-5 bg-gray-50 rounded shadow-md p-7">
								<h1 className="font-headers font-bold text-xl text-gray-900">
									Sign up to become a driver
								</h1>
								<span className="font-body text-gray-900">
									We are currently experiencing an influx of drivers in your area, please try again later.
								</span>
							</div>
						</div>
					</div>
					<div className="lg:w-2/5">
						<img
							className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
							src={driverSignup}
							alt="food delivery on a bike"
						/>
					</div>
				</div>
			</div>
			<div className="flex flex-col w-full gap-7 text-gray-900 md:max-w-4xl lg:max-w-7xl md:mx-auto">
				<h1 className="font-headers font-bold text-3xl">Get paid to deliver</h1>
				<div className="flex justify-between items-center">
					<div className="flex flex-col justify-center items-center gap-3 w-80">
						<h1 className="font-headers font-bold text-xl">Deliver with your own vehicle</h1>
						<i className="fa-solid fa-car text-red-600 text-xl"></i>
						<span className="font-body break-words">
							Grab your car, bike, or scooter and deliver whenever you want-for an hour, a day, or
							throughout the week.
						</span>
					</div>
					<div className="flex flex-col justify-center items-center gap-3 w-80">
						<h1 className="font-headers font-bold text-xl">Work on your own time</h1>
						<i className="fa-solid fa-clock text-red-600 text-xl"></i>
						<span className="font-body break-words">
							You decide how, where, when, and how long you want to deliver. Just log into the
							Dashchef app and click ready to deliver.
						</span>
					</div>
					<div className="flex flex-col justify-center items-center gap-3 w-80">
						<h1 className="font-headers font-bold text-xl">Plan your own course</h1>
						<i className="fa-solid fa-calendar-days text-red-600 text-xl"></i>
						<span className="font-body break-words">
							You decide whether or not you want to accept or decline the delivery. Drivers have the
							freedom to choose the location for delivery.
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Driver;
