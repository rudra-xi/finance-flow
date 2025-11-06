import React from "react";
import { footerText, instagram, github, logo } from "../Assets";

function Footer() {
	return (
		<footer className="pt-10 relative">
			{/* Top border */}
			<span className="w-full h-[2px] bg-accent absolute" />
			<div className="flex justify-evenly">
				<div className="flex flex-col pt-5">
					{/* Logo and title */}
					<div className="flex items-start gap-4 font-extrabold text-3xl pb-2">
						<img src={logo} alt="logo" className="w-8" />
						<p className="lg:block hidden">FinanceFlow</p>
					</div>
					{/* Footer text */}
					<p className="text-xs w-[400px] hidden lg:block">
						{footerText}
					</p>
				</div>
				<div className="flex flex-col pt-5">
					{/* Contact information */}
					<p className="font-extrabold text-2xl pb-2">
						Get In Touch
					</p>
					<p className="text-xs">+91 00-FLOW-0000</p>
					<p className="text-xs">finance.flow@support.com</p>
				</div>
				<div className="flex flex-col pt-5">
					{/* Social media links */}
					<p className="font-extrabold text-2xl pb-2">Social</p>
					<div className="flex justify-between">
						<a href="https://github.com/rudra-xi">
							<img
								src={github}
								alt="github icon"
								className="w-6 cursor-pointer hover:scale-110 transition-all duration-300"
							/>
						</a>
						<a href="https://www.instagram.com/rudra.xii">
							<img
								src={instagram}
								alt="instagram icon"
								className="w-6 cursor-pointer hover:scale-110 transition-all duration-300"
							/>
						</a>
					</div>
				</div>
			</div>
			{/* Footer bottom text */}
			<div className="flex text-xs justify-center py-5 text-center">
				<p>&copy; 2025 rudra-xi. All rights reserved.</p>
			</div>
		</footer>
	);
}

export default Footer;
