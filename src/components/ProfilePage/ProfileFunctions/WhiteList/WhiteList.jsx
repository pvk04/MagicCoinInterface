import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { AppContext } from "../../../../contexts/context";

function WhiteList() {
	const [{ contract, address }, dispatch] = useContext(AppContext);
	const [validated, setValidated] = useState(false);
	const [name, setName] = useState("");

	async function sendRequest(e) {
		e.preventDefault();
		e.stopPropagation();
		const form = e.currentTarget;
		if (form.checkValidity()) {
			let response = await contract.methods
				.createRequest(name)
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
						alert("Заявка успешно подана!");
					}
				});
			console.log(response);
		}
		setValidated(true);
	}

	return (
		<Form noValidate validated={validated} onSubmit={(e) => sendRequest(e)}>
			<Form.Group>
				<Form.Label>
					<strong>Подать запрос на добавление в белый лист </strong>
				</Form.Label>
				<InputGroup hasValidation className="mb-3">
					<Form.Control
						placeholder="Введите имя"
						type="text"
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Button
						variant="outline-secondary"
						id="button-addon2"
						type="submit"
					>
						Подать заявку
					</Button>
					<Form.Control.Feedback type="invalid">
						Пожалуйста, введите имя
					</Form.Control.Feedback>
				</InputGroup>
			</Form.Group>
		</Form>
	);
}

export default WhiteList;
