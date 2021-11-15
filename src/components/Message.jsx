import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'timeago.js';
import { getUser } from '../apiCalls';
import { AuthContext } from '../context/AuthContext';

import noUserPhoto from '../images/no-user.jpg';

const Message = ({ right, text, time, username, userId }) => {
	const [messageUser, setMessageUser] = useState();
	const { user } = useContext(AuthContext);

	useEffect(() => {
		const uploadImage = async () => {
			if (right) {
				setMessageUser(user);
			} else {
				await getUser(userId, setMessageUser);
			}
		};
		uploadImage();
	}, [user, right, userId]);

	return (
		<Container style={right ? { alignItems: 'flex-end' } : {}}>
			<div style={right ? { justifyContent: 'flex-end' } : {}}>
				<img
					src={
						messageUser
							? messageUser.profilePicture
								? messageUser.profilePicture
								: noUserPhoto
							: noUserPhoto
					}
					alt={`${username} profile`}
				/>
				<TextContainer
					style={
						right
							? { backgroundColor: '#23acd6', color: '#f1f1f1' }
							: { backgroundColor: '#bfbfbf' }
					}
				>
					<p>{text}</p>
				</TextContainer>
			</div>
			<span style={right ? {} : { textAlign: 'left' }}>{format(time)}</span>
		</Container>
	);
};

const Container = styled.div`
	padding: 1rem;
	display: flex;
	flex-direction: column;
	div {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		img {
			border-radius: 50%;
			width: 35px;
			height: 35px;
			object-fit: cover;
		}
		p {
			margin: 0;
			word-wrap: break-word;
			white-space: pre-wrap;
			word-break: break-word;
		}
	}
	width: 100%;
`;
const TextContainer = styled.div`
	padding: 0.7rem;
	border-radius: 15px;
	max-width: 35vw;
`;

export default Message;
