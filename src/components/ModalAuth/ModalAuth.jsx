import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ModalAuth() {
	const [addressValue, setAddressValue] = useState("");
	const [password, setPassword] = useState("");

	return (
		<>
			<Modal show={true} centered>
				<Modal.Header>
					<Modal.Title>Вход</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Адрес кошелька</Form.Label>
							<Form.Control
								value={addressValue}
								onChange={(e) => {
									setAddressValue(e.target.value);
								}}
								autoFocus
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Пароль</Form.Label>
							<Form.Control
								type="password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						onClick={() => {
							console.log({ addressValue, password });
						}}
						variant="primary"
					>
						Войти
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ModalAuth;
