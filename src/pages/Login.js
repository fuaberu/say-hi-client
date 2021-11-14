import React from 'react';
import styled from 'styled-components';
import FormLayout from '../components/layouts/FormLayout';
import LogIn from '../components/form/log-in/LogIn';

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	margin: 0;
`;

const IndexPage = () => {
	return (
		<FormLayout>
			<Container>
				<LogIn />
			</Container>
		</FormLayout>
	);
};

export default IndexPage;
