import React, { useContext, useEffect } from "react";
import Web3 from "web3";
import abi from "./abi.js";
import { AppContext } from "./contexts/context";
import { useNavigate, Route, Routes } from "react-router-dom";
import ModalAuth from "./components/ModalAuth/ModalAuth.jsx";
import ProfilePage from "./components/ProfilePage/ProfilePage.jsx";

function App() {
	const [{ login, activity }, dispatch] = useContext(AppContext);
	const navigate = useNavigate();

	useEffect(() => {
		async function connect() {
			let web3 = new Web3(
				new Web3.providers.HttpProvider("http://localhost:8545")
			);
			let contract = new web3.eth.Contract(
				abi,
				"0x98268faD242090f95854D4E39B586FD6381342E7"
			);

			dispatch({ type: "SET_WEB3", payload: web3 });
			dispatch({ type: "SET_CONTRACT", payload: contract });
		}
		connect();
	}, []);

	useEffect(() => {
		function logout() {
			if (!login) {
				navigate("/");
			}
		}
		logout();
	}, [login, activity]);

	return (
		<div className="App" style={{ width: "85%", margin: "auto" }}>
			<Routes>
				<Route path="/" element={<ModalAuth />} />
				<Route path="/profile/*" element={<ProfilePage />} />
			</Routes>
		</div>
	);
}

export default App;
