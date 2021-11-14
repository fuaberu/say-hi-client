import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router';

const Layout = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: #f1f1f1;
	* {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
`;

const FormLayout = () => {
	return (
		<Layout>
			<Outlet />
		</Layout>
	);
};

export default FormLayout;
