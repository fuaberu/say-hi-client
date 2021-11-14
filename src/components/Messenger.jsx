import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { sendMessage } from '../apiCalls';
import Message from './Message';
import { io } from 'socket.io-client';

const Messenger = ({
	messages,
	currentUserId,
	setMessage,
	conversationId,
	reciverUserId,
	setOnline,
}) => {
	const [displayMessages, setDisplayMessages] = useState();
	const [newMessage, setNewMessage] = useState('');
	const [ioReciveMessage, setIoReciveMessage] = useState(null);
	const ioUpdate = useRef();

	//update with socket.io
	useEffect(() => {
		ioUpdate.current = io(
			'ws://say-hi-api.herokuapp.herokuapp.com/socket.io/?EIO=4&transport=websocket'
		);
		ioUpdate.current.on('getMessage', (data) => {
			setIoReciveMessage({
				sender: data.senderId,
				text: data.text,
				createdAt: Date.now(),
			});
		});
	}, []);

	useEffect(() => {
		ioReciveMessage &&
			reciverUserId === ioReciveMessage.sender &&
			setDisplayMessages((prev) => [...prev, ioReciveMessage]);
	}, [ioReciveMessage, reciverUserId]);

	useEffect(() => {
		ioUpdate.current.emit('addUser', currentUserId);
		// ioUpdate.current.on('getUsers', (users) => console.log(users));
	}, [currentUserId]);

	//scroll page down
	const scroll = useRef();

	useEffect(() => {
		scroll.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
	}, [displayMessages]);

	//set messages to display
	useEffect(() => {
		setDisplayMessages(messages);
	}, [messages]);

	//submit new message
	const handleSubmit = (e) => {
		e.preventDefault();
		const messageObj = {
			conversationId: conversationId,
			sender: currentUserId,
			text: newMessage,
		};
		sendMessage(messageObj, setMessage);
		setNewMessage('');
		//send message to socket.io
		ioUpdate.current.emit('sendMessage', {
			senderId: currentUserId,
			reciverId: reciverUserId,
			text: newMessage,
		});
	};
	return (
		<Container>
			<MessengeArea>
				{displayMessages?.map((el, index) => {
					return (
						<div ref={scroll} key={index}>
							<Message
								right={el.sender === currentUserId ? true : false}
								userId={el.sender}
								text={el.text}
								time={el.createdAt}
								key={index}
							/>
						</div>
					);
				})}
			</MessengeArea>
			<form onSubmit={(e) => handleSubmit(e)}>
				<Textarea
					name="message"
					placeholder="Message"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
				></Textarea>
				<button type="submit">Send</button>
			</form>
		</Container>
	);
};

const Container = styled.div`
	height: 100vh;
	form {
		display: flex;
		height: 15vh;
		width: 100%;
	}
`;
const Textarea = styled.textarea`
	width: 100%;
	resize: none;
	overflow: auto;
	padding: 0.5rem;
`;

const MessengeArea = styled.div`
	height: 85vh;
	overflow-y: auto;
	::-webkit-scrollbar {
		width: 8px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px grey;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #14cc60;
		border-radius: 10px;
	}
`;

export default Messenger;
