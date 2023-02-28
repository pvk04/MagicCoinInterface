import React, { useContext, useEffect } from "react";
import Web3 from "web3";
import abi from "./abi.js";
import { AppContext } from "./contexts/context";
import { useNavigate, Route, Routes } from "react-router-dom";
import ModalAuth from "./components/ModalAuth/ModalAuth.jsx";

function App() {
	const [state, dispatch] = useContext(AppContext);
	const navigate = useNavigate();

	// useEffect(() => {
	// 	async function connect() {
	// 		let web3 = new Web3(Web3.givenProvider || "https://localhost:8545");
	// 		let contract = new web3.eth.Contract(
	// 			abi,
	// 			"0xd4B310EdadA437d458B6109E1b8798B19200925b"
	// 		);

	// 		dispatch({ type: "SET_WEB3", payload: web3 });
	// 		dispatch({ type: "SET_CONTRACT", payload: contract });
	// 	}
	// 	connect();
	// }, []);

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<ModalAuth />} />
			</Routes>
		</div>
	);
}

export default App;
