import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NoMatch = () => {
	const location = useLocation();
	return (
		<Container404>
			<h1>404</h1>
			<h3>The Page {location.pathname} Was Not Found</h3>
			<p>
				Please go back to the <Link to="/">main page</Link>.
			</p>
		</Container404>
	);
};

const Container404 = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
	font-family: 'Roboto Mono', monospace;
	text-align: center;
	min-height: 100vh;
	h1 {
		font-size: 8rem;
		font-weight: 700;
	}
	h3,
	p {
		margin-top: 1rem;
	}
	a {
		font-size: 1.2rem;
	}
`;

export default NoMatch;
