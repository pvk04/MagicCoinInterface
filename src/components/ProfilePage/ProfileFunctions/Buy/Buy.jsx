import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { AppContext } from "../../../../contexts/context";

function Buy() {
	const [{ contract, address }, dispatch] = useContext(AppContext);
	const [validated, setValidated] = useState(false);
	const [amount, setAmount] = useState(1);

	async function buy(e) {
		e.preventDefault();
		e.stopPropagation();
		const form = e.currentTarget;
		if (form.checkValidity() && amount >= 0.000000000001) {
			const rate = await contract.methods.returnCurrentRate().call();
			const response = await contract.methods
				.buyTokens((amount * 10 ** 12).toString())
				.send(
					{
						value: (amount * rate * 10 ** 12).toString(), // курс, переведенный в эфиры
						from: address,
						gasLimit: "6721975",
					},
					(err) => {
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
							alert("Токены успешно куплены!");
							setAmount(0);
						}
					}
				);
		}
		setValidated(true);
	}

	return (
		<Form
			noValidate
			validated={validated}
			onSubmit={(e) => {
				buy(e);
			}}
		>
			<Form.Group>
				<Form.Label>
					<strong>Купить токены</strong>
				</Form.Label>
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
					<Button
						variant="primary"
						id="button-addon2"
						type="submit"
					>
						Купить
					</Button>
					<Form.Control.Feedback type="invalid">
						Введите количество токенов, которые хотите купить
					</Form.Control.Feedback>
				</InputGroup>
			</Form.Group>
		</Form>
	);
}

export default Buy;
