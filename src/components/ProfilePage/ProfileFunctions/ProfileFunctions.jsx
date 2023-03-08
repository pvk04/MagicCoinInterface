import React from "react";
import { Routes, Route } from "react-router-dom";
import Card from "react-bootstrap/Card";
import NavBar from "./NavBar/NavBar";
import WhiteList from "./WhiteList/WhiteList";
import Allowance from "./Allowance/Allowance";
import Transfer from "./Transfer/Transfer";
import Buy from "./Buy/Buy";
import UserInfo from "./UserInfo/UserInfo";

function ProfileFunctions() {
	return (
		<Card>
			<Card.Header style={{ padding: "0" }}>
				<NavBar />
			</Card.Header>
			<Card.Body>
				<Routes>
					<Route path={"/white"} element={<WhiteList />} />
					<Route path={"/allowance"} element={<Allowance />} />
					<Route path={"/transfer"} element={<Transfer />} />
					<Route path={"/buy"} element={<Buy />} />
					<Route path={"info"} element={<UserInfo />} />
				</Routes>
			</Card.Body>
		</Card>
	);
}

export default ProfileFunctions;
