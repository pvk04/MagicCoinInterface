import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { AppContext } from "../../../contexts/context";

function ProfileHeader() {
	const [{ web3, contract, address, role, activity }, dispatch] =
		useContext(AppContext);
	const [eth, setEth] = useState("");
	const [cmon, setCmon] = useState("");
	// const [seconds, setSec] = useState();
	// const [time, setTime] = useState("");

	useEffect(() => {
		async function getInfo() {
			let balanceETH = await web3.eth.getBalance(address);
			let balanceCMON = await contract.methods.balanceOf(address).call();
			// let timeLive = Number(
			// 	await contract.methods.returnSystemTime().call()
			// );
			// setSec(timeLive);

			// const interval = setInterval(() => {
			// 	setSec(seconds + 1);
			// 	setTime(new Date(seconds * 1000).toISOString().slice(11, 19));
			// }, 1000);

			setEth(web3.utils.fromWei(balanceETH, "ether"));
			setCmon(balanceCMON / 10 ** 12);
		}
		getInfo();
	}, [activity]);

	function logout() {
		dispatch({ type: "SET_LOGOUT" });
	}

	async function speedUp() {
		await contract.methods
			.speedUp()
			.send({ from: address, gasLimit: "6721975" });
		dispatch({ type: "SET_ACTIVITY" });
	}

	return (
		<Card bg="primary" border="light" text="white">
			<Card.Header>Профиль</Card.Header>
			<Card.Body>
				<Card.Text>Адрес: {address}</Card.Text>
				<Card.Text>
					Роль:{" "}
					{role === "0"
						? "Владелец"
						: role === "1"
						? "Приватный провайдер"
						: role === "2"
						? "Публичный провайдер"
						: "Пользователь"}
				</Card.Text>
				<Card.Text>Баланс ETH: {eth}</Card.Text>
				<Card.Text>Баланс CMON: {cmon}</Card.Text>
				<Card.Text>Время жизни: {}</Card.Text>
				<Card.Text>Длительность Private фазы: {}</Card.Text>
				<Card.Text>Время с момента начала Public фазы: {}</Card.Text>
			</Card.Body>
			<Card.Footer>
				<Button variant="danger" onClick={logout}>
					Выход
				</Button>
				<Button variant="warning" onClick={speedUp}>
					Ускорить
				</Button>
			</Card.Footer>
		</Card>
	);
}

export default ProfileHeader;
