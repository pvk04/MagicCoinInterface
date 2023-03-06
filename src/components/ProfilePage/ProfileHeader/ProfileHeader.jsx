import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { AppContext } from "../../../contexts/context";

function ProfileHeader() {
	const [{ web3, contract, address, role, activity }, dispatch] =
		useContext(AppContext);

	const [eth, setEth] = useState("");
	const [cmon, setCmon] = useState("");

	const [seconds, setSeconds] = useState(null);
	const [minutes, setMinutes] = useState(null);
	const [hours, setHours] = useState(null);

	useEffect(() => {
		async function getInfo() {
			let balanceETH = await web3.eth.getBalance(address);
			let balanceCMON = await contract.methods.balanceOf(address).call();
			let timeLive = await contract.methods
				.returnSystemTime()
				.call()
				.then();
			setSeconds(
				Number(
					new Date(Number(timeLive) * 1000)
						.toISOString()
						.slice(17, 19)
				)
			);
			setMinutes(
				Number(
					new Date(Number(timeLive) * 1000)
						.toISOString()
						.slice(14, 16)
				)
			);
			setHours(
				Number(
					new Date(Number(timeLive) * 1000)
						.toISOString()
						.slice(11, 13)
				)
			);

			setEth(web3.utils.fromWei(balanceETH, "ether"));
			setCmon(balanceCMON / 10 ** 12);
		}
		getInfo();
	}, [activity]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (seconds != null) {
				setSeconds((seconds) => seconds + 1);
				if (seconds == 59) {
					setMinutes((minutes) => minutes + 1);
					setSeconds(() => 0);
				}
				if (minutes == 59) {
					setHours((hours) => hours + 1);
					setMinutes(() => 0);
				}
			}
		}, 1000);

		return () => clearInterval(interval);
	});

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
				<Card.Text>
					Время жизни:{" "}
					{(hours < 10 ? "0" + hours : hours) +
						":" +
						(minutes < 10 ? "0" + minutes : minutes) +
						":" +
						(seconds < 10 ? "0" + seconds : seconds)}
				</Card.Text>
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
