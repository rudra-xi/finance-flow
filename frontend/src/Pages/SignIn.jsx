import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import Title from "../Components/Title";
import { AppContext } from "../Context/AppContext";
import Loader from "../Components/Loader";
import axios from "axios"; // Import axios for API calls

function SignIn() {
	const {
		navigate,
		signedUp,
		setSignedUp,
		currentState,
		setCurrentState,
		endpointURL,
	} = useContext(AppContext);

	useEffect(() => {
		if (signedUp) {
			setTimeout(() => {
				navigate("/budget");
			}, 2500);
		}
	}, [signedUp, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData.entries());

		try {
			let response;
			if (currentState === "Sign In") {
				// signin API call
				response = await axios.post(`${endpointURL}/auth/signin`, {
					email: data.email,
					password: data.password,
				});
			} else {
				// Register API call
				response = await axios.post(
					`${endpointURL}/auth/register`,
					{
						name: data.name,
						email: data.email,
						password: data.password,
					}
				);
			}
			toast.success(response.data.message);

			// Save token to localStorage
			localStorage.setItem("token", response.data.token);
			setSignedUp(true);
			setTimeout(() => {
				navigate("/budget");
			}, 1000);
		} catch (err) {
			toast.error(err.response?.data?.message);
		}
	};

	return (
		<section>
			{signedUp === false ? (
				<>
					<Title title={currentState} />
					<div className="flex items-center justify-center">
						<form
							onSubmit={handleSubmit}
							className="flex flex-col w-96"
						>
							{currentState === "Sign Up" ? (
								<div className="flex flex-col pb-5">
									<label
										htmlFor="name"
										className="font-bold -mb-1"
									>
										Name
									</label>
									<input
										type="text"
										id="name"
										name="name"
										required
										className="border-2 border-accent w-90 sm:w-96 h-9 pl-3 outline-none"
									/>
								</div>
							) : (
								""
							)}
							<div className="flex flex-col pb-5">
								<label
									htmlFor="email"
									className="font-bold -mb-1"
								>
									Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									required
									className="border-2 border-accent w-90 sm:w-96 h-9 pl-3 outline-none"
								/>
							</div>
							<div className="flex flex-col">
								<label
									htmlFor="password"
									className="font-bold -mb-1"
								>
									Password
								</label>
								<input
									type="password"
									id="password"
									name="password"
									required
									className="border-2 border-accent w-90 sm:w-96 h-9 pl-3 outline-none"
								/>
							</div>
							<div className="pt-1 text-right text-sm">
								{currentState === "Sign In" ? (
									<p
										className="cursor-pointer hover:underline"
										onClick={() =>
											setCurrentState(
												"Sign Up"
											)
										}
									>
										Sign Up Here
									</p>
								) : (
									<p
										className="cursor-pointer hover:underline"
										onClick={() =>
											setCurrentState(
												"Sign In"
											)
										}
									>
										Sign In Here
									</p>
								)}
							</div>

							<div className="flex justify-center">
								<button
									type="submit"
									className="mt-6 font-bold border-2 border-accent py-2 w-40 hover:scale-95 transition-all duration-300 cursor-pointer"
								>
									{currentState === "Sign In"
										? "Sign In"
										: "Sign Up"}
								</button>
							</div>
						</form>
					</div>
				</>
			) : (
				<Loader />
			)}
		</section>
	);
}

export default SignIn;
