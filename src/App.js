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
				"0xd07aB6ddF839f25827c06de25A05731B4B7788D7"
			);

			dispatch({ type: "SET_WEB3", payload: web3 });
			dispatch({ type: "SET_CONTRACT", payload: contract });

			let accounts = await web3.eth.getAccounts();
			for (let account of accounts) {
				await web3.eth.personal.unlockAccount(account, "", 0);
			}
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
