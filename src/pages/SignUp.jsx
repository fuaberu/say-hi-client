import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getUserByUsername, register } from '../apiCalls';
import Input from '../components/form/Input';
import InputPassword from '../components/form/InputPassword';
import {
	ButtonBlue,
	ButtonGreen,
	Container,
	Headline,
} from '../components/form/log-in/LogIn';
import { AuthContext } from '../context/AuthContext';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordAgain, setPasswordAgain] = useState('');
	const [passwordDifferent, setPasswordDifferent] = useState(false);
	const [uniqueUsername, setUniqueUsername] = useState(false);

	const { isFetching, user, dispatch } = useContext(AuthContext);

	let navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate('/');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	useEffect(() => {
		const checkUniqUsername = async () => {
			await getUserByUsername(username, setUniqueUsername);
		};
		checkUniqUsername();
	}, [username]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		//if the username already exists don't create a new one
		if (uniqueUsername) return;

		//else create user
		if (password !== passwordAgain) {
			setPasswordDifferent(true);
		} else {
			register({ email, username, password }, dispatch);
		}
	};

	return (
		<Container>
			<Headline>
				Say<span>Hi</span>
			</Headline>
			<form onSubmit={(e) => handleSubmit(e)}>
				<Input
					type="email"
					value={email}
					label="Email"
					onChange={(e) => setEmail(e.target.value)}
					autocomplete="email"
				/>
				<Input
					type="text"
					value={username}
					label="Username"
					onChange={(e) => setUsername(e.target.value)}
					err={uniqueUsername ? 'Username alreary exists' : null}
					autocomplete="username"
				/>
				<InputPassword
					value={password}
					label="Password"
					onChange={(e) => setPassword(e.target.value)}
					passwordDifferent={passwordDifferent}
					autocomplete="new-password"
				/>
				<InputPassword
					value={passwordAgain}
					label="Password Again"
					onChange={(e) => setPasswordAgain(e.target.value)}
					passwordDifferent={passwordDifferent}
					autocomplete="new-password"
				/>
				<ButtonBlue type="submit">{isFetching ? 'Loading' : 'Sign Up'}</ButtonBlue>
			</form>
			<ButtonGreen to="/">Sign In</ButtonGreen>
		</Container>
	);
};

export default SignUp;
