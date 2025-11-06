import React from "react";
import { Title } from "../Components";
import { about_img, aboutText, mission_img, missionText } from "../Assets/";

function About() {
	return (
		<section className="lg:px-35 md:px-10 text-justify md:text-justify lg:text-left">
			<div>
				{/* About Us Section */}
				<Title title={"About Us"} />
				<div className="flex flex-col lg:flex-row md:flex-col items-center justify-center gap-10">
					<img
						src={about_img}
						alt=""
						className="w-[490px] md:w-[600px] grayscale-100"
					/>
					<p className="text-sm font-medium">{aboutText}</p>
				</div>
			</div>

			<div className="pt-15">
				{/* Mission Section */}
				<Title title={"Mission"} />
				<div className="flex flex-col lg:flex-row-reverse items-center justify-center gap-10">
					<img
						src={mission_img}
						alt=""
						className="w-[490px] md:w-[600px] grayscale-100"
					/>
					<p className="text-sm font-medium">{missionText}</p>
				</div>
			</div>
		</section>
	);
}

export default About;
