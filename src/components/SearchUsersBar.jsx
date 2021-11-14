import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllUsers, startConversation } from '../apiCalls';

const SearchUsersBar = ({
	openConversation,
	setConversations,
	currentUserId,
	setCurrentChat,
}) => {
	const [input, setInput] = useState('');
	const [usersList, setUsersList] = useState([]);

	useEffect(() => {
		if (input !== '') {
			getAllUsers(input, currentUserId, setUsersList);
		} else {
			setUsersList([]);
		}
	}, [input, currentUserId]);

	const handleClick = async (reciverId) => {
		try {
			await startConversation(
				{
					senderId: currentUserId,
					reciverId,
				},
				setConversations,
				setCurrentChat
			);
			openConversation(reciverId);
			setInput('');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<InputBar
				type="text"
				placeholder="Search"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<ListContainer style={usersList.length > 0 ? { border: '1px solid #dbdbdb' } : {}}>
				{usersList.map((el, index) => {
					return (
						<ListItem key={index} onClick={() => handleClick(el._id)}>
							<img
								src={
									el.profilePicture
										? el.profilePicture
										: 'https://isaojose.com.br/wp-content/uploads/2020/12/blank-profile-picture-mystery-man-avatar-973460.jpg'
								}
								alt="user profile"
							/>
							<p>{el.username}</p>
						</ListItem>
					);
				})}
			</ListContainer>
		</Container>
	);
};

const Container = styled.div`
	position: relative;
`;
const ListContainer = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	max-height: 200px;
	background-color: #fafafa;

	border-radius: 3px;
	z-index: 1;
`;
const InputBar = styled.input`
	background-color: #fafafa;
	border: 1px solid #dbdbdb;
	border-radius: 3px;
	height: 28px;
	padding: 3px 12px;
	outline: none;
	width: 100%;
`;
const ListItem = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0 0.5rem;
	margin: 0.5rem 0;
	cursor: pointer;
	img {
		width: 25px;
		height: 25px;
		object-fit: cover;
		border-radius: 50%;
	}
	p {
		margin: 0;
	}
`;

export default SearchUsersBar;
