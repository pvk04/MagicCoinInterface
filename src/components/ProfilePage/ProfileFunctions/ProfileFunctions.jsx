import React from "react";
import { Routes, Route } from "react-router-dom";
import Card from "react-bootstrap/Card";
import NavBar from "./NavBar/NavBar";
import WhiteList from "./WhiteList/WhiteList";

function ProfileFunctions() {
	return (
		<Card>
			<Card.Header>
				<NavBar />
			</Card.Header>
			<Card.Body>
				<Routes>
					<Route path={"/white"} element={<WhiteList />} />
				</Routes>
			</Card.Body>
		</Card>
	);
}

export default ProfileFunctions;
