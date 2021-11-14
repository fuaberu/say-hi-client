import React, { useState } from 'react';
import Input from './Input';
import styled from 'styled-components';

const InputPassword = (props) => {
	const [show, setShow] = useState(false);

	return (
		<Container>
			<Input
				type={show === true ? 'text' : 'password'}
				value={props.value}
				onChange={props.onChange}
				label={props.label}
				passwordDifferent={props.passwordDifferent}
				autocomplete={props.autocomplete}
			/>
			<button type="button" onClick={() => setShow(!show)}>
				{show ? 'Hide' : 'Show'}
			</button>
		</Container>
	);
};
const Container = styled.div`
	position: relative;
	width: 100%;
	button {
		position: absolute;
		right: 1px;
		top: 2px;
		bottom: 2px;
		background-color: #fff;
		border-radius: 7px;
		border: none;
		cursor: pointer;
	}
`;

export default InputPassword;
