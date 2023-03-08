import React from "react";
import { Routes, Route } from "react-router-dom";
import Card from "react-bootstrap/Card";
import NavBar from "./NavBar/NavBar";
import WhiteList from "./WhiteList/WhiteList";
import Allowance from "./Allowance/Allowance";
import Transfer from "./Transfer/Transfer";
import Buy from "./Buy/Buy";

function ProfileFunctions() {
	return (
		<Card>
			<Card.Header>
				<NavBar />
			</Card.Header>
			<Card.Body>
				<Routes>
					<Route path={"/white"} element={<WhiteList />} />
					<Route path={"/allowance"} element={<Allowance />} />
					<Route path={"/transfer"} element={<Transfer />} />
					<Route path={"/buy"} element={<Buy />} />
				</Routes>
			</Card.Body>
		</Card>
	);
}

export default ProfileFunctions;
