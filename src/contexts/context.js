import { useReducer, createContext } from "react";

const inirialState = {
	web3: {},
	contract: {},
	address: "",
	role: "",
	login: false,
	activity: 0,
};

function reducer(state, action) {
	switch (action.type) {
		case "SET_WEB3":
			return { ...state, web3: action.payload };
		case "SET_CONTRACT":
			return { ...state, contract: action.payload };
		case "SET_ADDRESS":
			return { ...state, address: action.payload };
		case "SET_ROLE":
			return { ...state, role: action.payload };
		case "SET_LOGIN":
			return { ...state, login: true };
		case "SET_ACTIVITY":
			return { ...state, activity: state.activity + 1 };
		case "SET_LOGOUT":
			return {
				...state,
				address: "",
				role: "",
				login: false,
				activity: 0,
			};
		default:
			return state;
	}
}

export const AppContext = createContext();

export function AppProvider({ children }) {
	const value = useReducer(reducer, inirialState);
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
