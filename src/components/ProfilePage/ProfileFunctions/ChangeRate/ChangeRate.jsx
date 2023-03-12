import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { AppContext } from "../../../../contexts/context";

function ChangeRate() {
	const [{ contract, address }, dispatch] = useContext(AppContext);
	const [amount, setAmount] = useState(1);
	const [validated, setValidated] = useState(false);

	async function changeRate(e) {
		e.preventDefault();
		e.stopPropagation();
		const form = e.currentTarget;
		if (form.checkValidity() && amount >= 0.000000000001) {
			await contract.methods
				.changePublicRate(amount * 10 ** 6)
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
						alert("Курс успешно изменен!");
						setAmount(0);
					}
				});
		}
		setValidated(true);
	}

	return (
		<Form
			noValidate
			validated={validated}
			onSubmit={(e) => {
				changeRate(e);
			}}
		>
			<Form.Group>
				<Form.Label>
					<strong>Изменить курс</strong>
				</Form.Label>
				<InputGroup hasValidation className="mb-3">
					<Form.Control
						placeholder="Введите цену Public токена"
						type="number"
						required
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						step={0.000000000001}
						min={0.000000000001}
					/>
					<Button variant="primary" id="button-addon2" type="submit">
						Изменить
					</Button>
					<Form.Control.Feedback type="invalid">
						Введите корректный курс покупки Public токена
					</Form.Control.Feedback>
				</InputGroup>
			</Form.Group>
		</Form>
	);
}

export default ChangeRate;
