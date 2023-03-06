import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { AppContext } from "../../../../contexts/context";
import { Link } from "react-router-dom";

const functions = [
	{ name: "Перевести", href: "transfer", permission: "0123" },
	{ name: "Белый лист", href: "white", permission: "0123" },
	{ name: "Заявки", href: "requests", permission: "1" },
	{ name: "Дать разрешение", href: "allowance", permission: "0123" },
	{ name: "Купить private", href: "private", permission: "0123" },
	{ name: "Купить public", href: "public", permission: "0123" },
	{ name: "Активы пользователей", href: "info", permission: "012" },
];

function NavBar() {
	const [{ role }] = useContext(AppContext);
	return (
		<Navbar collapseOnSelect>
			<Container>
				<Nav>
					{functions.map((elem, index) => {
						if (elem.permission.includes(role)) {
							return (
								<Nav.Link key={index} as={Link} to={elem.href}>
									{elem.name}
								</Nav.Link>
							);
						}
					})}
				</Nav>
			</Container>
		</Navbar>
	);
}

export default NavBar;
