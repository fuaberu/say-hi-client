import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'normalize.css';
import LogIn from './components/form/log-in/LogIn';
import ForgotPassword from './pages/ForgotPassword';
import NoMatch from './pages/NoMatch';
import FormLayout from './components/layouts/FormLayout';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { AuthContext } from './context/AuthContext';
import './app.css';

function App() {
	const { user } = useContext(AuthContext);

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<FormLayout />}>
					<Route path="/" element={user ? <Home /> : <LogIn />} />
					<Route path="/sign-up" element={<SignUp />} />
				</Route>
				<Route exact path="/retrivepassword" element={<ForgotPassword />} />
				<Route exact path="*" element={<NoMatch />} />
			</Routes>
		</div>
	);
}

export default App;
