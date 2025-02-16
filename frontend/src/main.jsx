import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom"; // Change BrowserRouter to HashRouter
import "./index.css";
import App from "./App.jsx";
import AppContextProvider from "./Context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
	<HashRouter>
		<AppContextProvider>
			<App />
		</AppContextProvider>
	</HashRouter>
);
