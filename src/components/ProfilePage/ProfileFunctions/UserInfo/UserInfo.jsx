import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { AppContext } from "../../../../contexts/context";

function UserInfo() {
	const [{ contract, address, role, activity }, dispatch] =
		useContext(AppContext);
	const [accounts, setAccounts] = useState([]);
	const [selected, setSelected] = useState(accounts[0]);
	const [{ publicBalance, privateBalance }, setInfo] = useState({
		publicBalance: 0,
		privateBalance: 0,
	});

	useEffect(() => {
		async function getData() {
			const data = await contract.methods.returnAllUsers().call();
			setSelected(data[0]);
			setAccounts(data);
			showInfo(data[0]);
		}
		getData();
	}, [address, activity]);

	async function showInfo(adr) {
		const balance = await contract.methods.balanceOf(adr).call();
		let publicBalance = await contract.methods
			.returnPublicBalance(adr)
			.call();
		const privateBalance = (balance - publicBalance) / 10 ** 12;
		publicBalance = publicBalance / 10 ** 12;
		setInfo({ publicBalance, privateBalance });
	}

	return (
		<Form>
			<Form.Label>
				<strong>Посмотреть информацию об активах пользователя</strong>
			</Form.Label>
			<Form.Select
				value={selected}
				onChange={(e) => {
					setSelected(e.target.value);
					showInfo(e.target.value);
				}}
			>
				{accounts.map((elem, index) => (
					<option value={elem} key={index}>
						{elem}
					</option>
				))}
			</Form.Select>
			<Card>
				<Card.Header>{selected}</Card.Header>
				<Card.Body>
					{role == 0 || role == 2 ? (
						<Card.Text>
							Public баланс: {publicBalance} CMON
						</Card.Text>
					) : (
						console.log(role)
					)}
					{role == 0 || role == 1 ? (
						<Card.Text>
							Private баланс: {privateBalance} CMON
						</Card.Text>
					) : (
						""
					)}
				</Card.Body>
			</Card>
		</Form>
	);
}

export default UserInfo;
