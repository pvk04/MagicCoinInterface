import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { AppContext } from "../../../../contexts/context";

function Transfer() {
	const [{ contract, address, role, activity }, dispatch] = useContext(AppContext);
	const [amount, setAmount] = useState(1);
	const [accounts, setAccounts] = useState([]);
	const [selected, setSelected] = useState(accounts[0]);
	const [validated, setValidated] = useState(false);

	useEffect(() => {
		async function getData() {
			const data = await contract.methods.returnAllUsers().call();
			setSelected(data[0]);
			setAccounts(data);
		}
		getData();
	}, [activity]);

	async function transfer(e, type = 1) {
		e.preventDefault();
		e.stopPropagation();
		const form = e.currentTarget;
		if (form.checkValidity() && amount >= 0.000000000001) {
			if (type === 1) {
				await contract.methods
					.transfer(selected, (amount * 10 ** 12).toString())
					.send({ from: address, gasLimit: "6721975" }, (err) => {
						if (err) {
							alert(
								err
									.toString()
									.replace(
										"Error: Returned error: VM Exception while processing transaction: revert ",
										""
									)
							);
						} else {
							dispatch({ type: "SET_ACTIVITY" });
							alert("Перевод успешно совершен!");
							setAmount(0);
							setSelected(accounts[0]);
						}
					});
			} else if (type === 2) {
				await contract.methods
					.rewardTransfer(selected, amount * 10 ** 12)
					.send({ from: address, gasLimit: "6721975" }, (err) => {
						if (err) {
							alert(
								err
									.toString()
									.replace(
										"Error: Returned error: VM Exception while processing transaction: revert ",
										""
									)
							);
						} else {
							dispatch({ type: "SET_ACTIVITY" });
							alert("Пользователь успешно награжден!");
							setAmount(0);
							setSelected(accounts[0]);
						}
					});
			}
		}
		setValidated(true);
	}

	return (
		<Form
			noValidate
			validated={validated}
			onSubmit={(e) => {
				transfer(e);
			}}
		>
			<Form.Group>
				<Form.Label>
					<strong>Перевести токены</strong>
				</Form.Label>
				<Form.Select
					value={selected}
					onChange={(e) => {
						setSelected(e.target.value);
					}}
				>
					{accounts.map((elem, index) => {
						if (elem != address)
							return (
								<option value={elem} key={index}>
									{elem}
								</option>
							);
					})}
				</Form.Select>
				<InputGroup hasValidation className="mb-3">
					<Form.Control
						placeholder="Введите количество"
						type="number"
						required
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						step={0.000000000001}
						min={0.000000000001}
					/>
					{role == 2 ? <Button
						variant="outline-secondary"
						onClick={(e) => {
							transfer(e, 2);
						}}
					>
						Наградить
					</Button> : ''}
					<Button variant="primary" id="button-addon2" type="submit">
						Перевести
					</Button>
					<Form.Control.Feedback type="invalid">
						Введите количество токенов, которые хотите перевести
					</Form.Control.Feedback>
				</InputGroup>
			</Form.Group>
		</Form>
	);
}

export default Transfer;
