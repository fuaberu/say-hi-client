import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Input from '../Input';
import InputPassword from '../InputPassword';
import { Link } from 'react-router-dom';
import { loginCall } from '../../../apiCalls';
import { AuthContext } from '../../../context/AuthContext';

const LogIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { isFetching, error, dispatch } = useContext(AuthContext);

	function handleSubmit(e) {
		e.preventDefault();
		loginCall({ email: email, password: password }, dispatch);
	}

	return (
		<Container>
			<Headline>
				Say<span>Hi</span>
			</Headline>
			{error && (
				<div
					style={{
						color: 'red',
						margin: '0 auto 0.5rem auto',
					}}
				>
					Wrong User or Password doesn't check
				</div>
			)}
			<form onSubmit={(e) => handleSubmit(e)}>
				<Input
					type="email"
					value={email}
					label="Email"
					onChange={(e) => setEmail(e.target.value)}
					autocomplete="email"
				/>
				<InputPassword
					value={password}
					label="Password"
					autocomplete="current-password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<ButtonBlue type="submit">{isFetching ? 'Loading' : 'Log in'}</ButtonBlue>
			</form>
			<LinkD to="/forgotpassord">Forgot password</LinkD>
			<ButtonGreen to="/sign-up">Create an Account</ButtonGreen>
		</Container>
	);
};

export const Container = styled.div`
	background-color: #fff;
	display: flex;
	flex-direction: column;
	width: 100vw;
	max-width: 350px;
	margin: 0;
	position: absolute;
	top: 50%;
	left: 50%;
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	padding: 1rem;
	border-radius: 5px;
`;

export const ButtonBlue = styled.button`
	cursor: pointer;
	background-color: #23acd6;
	color: #fff;
	margin-bottom: 1rem;
	border-radius: 7px;
	border: none;
	padding: 0.5rem;
	width: 100%;
`;

export const ButtonGreen = styled(Link)`
	cursor: pointer;
	background-color: #14cc60;
	color: #fff;
	margin: 1rem auto;
	border-radius: 7px;
	border: none;
	padding: 0.5rem 2rem;
`;

const LinkD = styled(Link)`
	margin: auto;
	color: #23acd6;
`;

export const Headline = styled.h1`
	text-align: center;
	margin-left: auto;
	margin-right: auto;
	border-bottom: 2px solid #23acd6;
	span:first-child {
		color: #14cc60;
	}
`;

export default LogIn;
