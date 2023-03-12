import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import { AppContext } from "../../../../contexts/context";

function WhiteList() {
	const [{ contract, address, role, activity }, dispatch] =
		useContext(AppContext);
	const [validated, setValidated] = useState(false);
	const [name, setName] = useState("");
	const [requests, setRequests] = useState([]);

	useEffect(() => {
		async function getRequests() {
			if (role == 1) {
				const response = await contract.methods.returnRequests().call();
				setRequests(response);
			}
		}
		getRequests();
	}, [address, activity]);

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
						setName("");
					}
				});
			console.log(response);
		}
		setValidated(true);
	}

	async function acceptRequest(index, response) {
		const responseContract = await contract.methods
			.acceptRequest(index, response)
			.send({ from: address, gasLimit: "6721975" });
	}

	const requestsComponent = requests.map(({ name, adr, status }, index) => {
		if (adr != "0x0000000000000000000000000000000000000000") {
			return (
				<Card key={index}>
					<Card.Header>Имя: {name}</Card.Header>
					<Card.Body>Адрес: {adr}</Card.Body>
					<Card.Footer>
						{status ? (
							"Заявка одобрена"
						) : (
							<>
								<Button
									variant="success"
									value="true"
									onClick={() => {
										acceptRequest(index, true);
									}}
								>
									Принять
								</Button>
								<Button
									variant="danger"
									value="false"
									onClick={() => {
										acceptRequest(index, false);
									}}
								>
									Отклонить
								</Button>
							</>
						)}
					</Card.Footer>
				</Card>
			);
		}
	});

	return (
		<>
			<Form
				noValidate
				validated={validated}
				onSubmit={(e) => sendRequest(e)}
			>
				<Form.Group>
					<Form.Label>
						<strong>
							Подать запрос на добавление в белый лист{" "}
						</strong>
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
							variant="primary"
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
			{role == "1" ? (
				<>
					<strong>Заявки: </strong>
					{requestsComponent}
				</>
			) : (
				""
			)}
		</>
	);
}

export default WhiteList;
