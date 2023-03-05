import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts/context";

function ModalAuth() {
	const [{ web3, contract }, dispatch] = useContext(AppContext);
	const navigate = useNavigate();

	const [addressValue, setAddressValue] = useState("");
	const [password, setPassword] = useState("");

	async function login() {
		let adr = addressValue.trim();
		if (web3.utils.isAddress(adr)) {
			let codePass = await web3.utils.sha3(password.trim());
			let response = await contract.methods
				.auth(adr, codePass)
				.call({ from: adr, gasLimit: "6721975" });
			if (response) {
				navigate("/profile");
				dispatch({ type: "SET_ADDRESS", payload: adr });
				dispatch({
					type: "SET_ROLE",
					payload: await contract.methods.returnUserRole(adr).call(),
				});
				dispatch({ type: "SET_LOGIN" });
			} else {
				alert("Неправильные данные для входа.");
			}
		} else {
			alert("Некорректный адрес или пароль");
		}
	}

	async function register() {
		let adr = addressValue.trim();
		if (web3.utils.isAddress(adr) && password.trim().length >= 3) {
			let codePass = await web3.utils.sha3(password.trim());
			await contract.methods
				.registration(adr, codePass)
				.send({ from: adr, gasLimit: "6721975" }, (err) => {
					if (!err) {
						alert("Вы успешно зарегистрировались!");
					} else {
						let errMsg = err
							.toString()
							.replace(
								"Error: Returned error: VM Exception while processing transaction: revert",
								""
							);
						alert(errMsg);
					}
				});
		} else {
			alert("Введите существующий адрес и пароль длиной от 3 символов.");
		}
	}

	return (
		<>
			<Modal show={true} centered>
				<Modal.Header>
					<Modal.Title>Авторизация</Modal.Title>
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
					<Button onClick={login} variant="primary">
						Войти
					</Button>
					<Button onClick={register} variant="primary">
						Зарегистрироваться
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ModalAuth;
