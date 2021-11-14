import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getLatestMessage, getUser } from '../apiCalls';
import { format } from 'timeago.js';

const UserLink = ({ data, onClick, currentUser }) => {
	const [user, setUser] = useState();
	const [lastMessage, setLastMessage] = useState();

	useEffect(() => {
		const getUserData = async () => {
			let otherUserId = '';
			if (data.members[0] === currentUser._id) {
				otherUserId = data.members[1];
			} else {
				otherUserId = data.members[0];
			}
			await getUser(otherUserId, setUser);
		};

		const getLastMessage = async () => {
			await getLatestMessage(data._id, setLastMessage);
		};

		getUserData();
		getLastMessage();
	}, [data, currentUser]);

	const hourFontSize = () => {
		if (!lastMessage) return;
		let array = format(lastMessage.createdAt).split('');
		let result = 8 / array.length;
		if (result > 14) {
			return '14';
		} else {
			return result.toString();
		}
	};

	return (
		<Container onClick={() => onClick(user._id)}>
			{user && (
				<div>
					<img
						src={
							user.profilePicture
								? user.profilePicture
								: 'https://isaojose.com.br/wp-content/uploads/2020/12/blank-profile-picture-mystery-man-avatar-973460.jpg'
						}
						alt={`${user.username} profile`}
					/>
				</div>
			)}
			{user && <h4>{user.username}</h4>}
			{lastMessage ? (
				<span style={{ fontSize: `${hourFontSize()}rem` }}>
					{format(lastMessage.createdAt)}
				</span>
			) : null}
			{lastMessage ? <p>{lastMessage.text}</p> : null}
		</Container>
	);
};

const Container = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 40px 1fr 74px;
	grid-template-rows: 18px 18px;
	grid-template-areas:
		'img name hour'
		'img message message';
	margin-top: 1rem;
	cursor: pointer;
	img {
		height: 32px;
		width: 32px;
		border-radius: 50%;
		object-fit: cover;
	}
	div {
		justify-self: start;
		position: relative;
		grid-area: img;
	}
	h4 {
		grid-area: name;
		font-size: 1rem;
	}
	span {
		grid-area: hour;
		justify-self: end;
	}
	p {
		grid-area: message;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
`;

export default UserLink;
