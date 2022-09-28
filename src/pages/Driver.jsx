import { useEffect } from "react";
import driverSignupImage from "../assets/driver-signup-image.jpg";

const Driver = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="bg-gray-100 w-full min-h-screen">
			<div className="bg-red-600 mb-10 w-full">
				<div className="flex justify-center items-start gap-48 py-24 lg:max-w-7xl lg:mx-auto">
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
									We are currently experiencing an influx of drivers in your area, please try again
									later.
								</span>
							</div>
						</div>
					</div>
					<div className="lg:w-2/5">
						<img
							className="rounded h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
							src={driverSignupImage}
							alt="food delivery on a bike"
						/>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-5 py-20 mb-10 md:max-w-4xl lg:max-w-7xl md:mx-auto">
				<h1 className="font-headers font-bold text-3xl mb-5">Get paid to deliver</h1>
				<div className="grid grid-cols-3">
					<div className="cols-span-1 w-80">
						<i className="fa-solid fa-key text-red-600 text-xl mb-3"></i>
						<h1 className="font-headers font-bold text-xl mb-3">Deliver with your own vehicle</h1>
						<span className="font-body leading-relaxed break-words">
							Grab your car, bike, or scooter and deliver whenever you want-for an hour, a day, or
							throughout the week See below to find the requirements for each method of getting
							around.
						</span>
					</div>
					<div className="cols-span-2 w-80">
						<i className="fa-solid fa-clock text-red-600 text-xl mb-3"></i>
						<h1 className="font-headers font-bold text-xl mb-3">Work on your own time</h1>
						<span className="font-body leading-relaxed break-words">
							You decide how, where, when, and how long you want to deliver. Just log into the
							Dashchef app and click ready to deliver.
						</span>
					</div>
					<div className="cols-span-3 w-80">
						<i className="fa-solid fa-calendar-days text-red-600 text-xl mb-3"></i>
						<h1 className="font-headers font-bold text-xl mb-3">Plan your own course</h1>
						<span className="font-body leading-relaxed break-words">
							You decide whether or not you want to accept or decline the delivery. Drivers have the
							freedom to choose the location for delivery.
						</span>
					</div>
				</div>
			</div>
			<div className="bg-red-200 text-gray-900">
				<div className="flex flex-col gap-5 py-20 md:max-w-4xl lg:max-w-7xl md:mx-auto">
					<h1 className="font-headers font-bold text-3xl mb-5 w-1/2">
						The requirements needed to become a delivery driver for Dashchef
					</h1>
					<div className="grid grid-cols-3">
						<div className="cols-span-1 w-80">
							<i className="fa-solid fa-car text-red-600 text-xl mb-3"></i>
							<h1 className="font-headers font-bold text-xl mb-3">Deliver by car</h1>
							<ul className="font-body list-disc list-outside leading-relaxed">
								<li>Be at least 19 year old</li>
								<li>Have a 2-door or 4-door car</li>
								<li>Have a valid driver&apos;s license in your name</li>
								<li>Submit your Social Security number for us to run a background screening</li>
							</ul>
						</div>
						<div className="cols-span-2 w-80">
							<i className="fa-solid fa-bicycle text-red-600 text-xl mb-3"></i>
							<h1 className="font-headers font-bold text-xl mb-3">Deliver by bicycle or foot</h1>
							<ul className="font-body list-disc list-outside leading-relaxed">
								<li>Be at least 18 years old</li>
								<li>Have a government-issued ID</li>
								<li>
									When signing up, be sure to choose <b>Delivery by bicycle</b> (and in certain
									cities, <b>Delivery by bicycle or foot</b>) under transportation method
								</li>
							</ul>
						</div>
						<div className="cols-span-3 w-80">
							<i className="fa-solid fa-motorcycle text-red-600 text-xl mb-3"></i>
							<h1 className="font-headers font-bold text-xl mb-3">Deliver by scooter</h1>
							<ul className="font-body list-disc list-outside leading-relaxed">
								<li>Be at least 19 years old</li>
								<li>Have a motorized scooter under 50cc</li>
								<li>Have a valid driver&apos;s license in your name</li>
								<li>Submit your Social Security number for us to run a background screening</li>
								<li>
									When signing up, be sure to choose <b>Delivery by scooter</b> under transportation
									method
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Driver;
