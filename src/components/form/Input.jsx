import React from 'react';
import styled from 'styled-components';

const Input = (props) => {
	return (
		<Container>
			<input
				type={props.type}
				id={props.label}
				value={props.value}
				onChange={props.onChange}
				placeholder={props.label}
				style={props.passwordDifferent ? { border: '1px solid red' } : {}}
				autoComplete={props.autocomplete}
				required
			/>
			<Label htmlFor={props.label}>{props.err ? props.err : null}</Label>
		</Container>
	);
};

const Container = styled.div`
	position: relative;
	width: 100%;
	margin-bottom: 2rem;
	input {
		cursor: text;
		padding: 9.5px;
		overflow: hidden;
		width: 100%;
		outline: none;
		border: 1px solid rgb(142, 142, 142);
		border-radius: var(--borderRadius);
		border-radius: 7px;
	}
`;

const Label = styled.label`
	position: absolute;
	bottom: -14px;
	left: 0;
	right: 0;
	color: red;
	font-size: 12px;
`;

export default Input;
