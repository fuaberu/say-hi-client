import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getMessages, userConversations } from '../apiCalls';
import { Headline } from '../components/form/log-in/LogIn';
import Messenger from '../components/Messenger';
import SearchUsersBar from '../components/SearchUsersBar';
import UpdateProfile from '../components/UpdateProfile';
import UserLink from '../components/UserLink';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
	const [conversations, setConversations] = useState([]);
	const [currentChat, setCurrentChat] = useState();
	const [currentMessages, setCurrentMessages] = useState([]);
	const [reciverUserId, setReciverUserId] = useState();
	const [showConversations, setShowConversations] = useState(true);
	const [showUpdateProfile, setShowUpdateProfile] = useState(false);
	const { user, dispatch, isFetching } = useContext(AuthContext);

	useEffect(() => {
		const getConversations = async () => {
			await userConversations(user._id, setConversations);
		};
		getConversations();
	}, [user]);

	const openConversation = (userId) => {
		if (!conversations || !userId) return;
		const conversationId = conversations.filter((el) =>
			el.members.some((value) => value === userId)
		);

		//if there are no previous conversation return
		if (conversationId.length < 1) return;
		setCurrentChat(conversationId[0]._id);
		let reciver = '';

		if (conversationId[0].members[0] === user._id) {
			reciver = conversationId[0].members[1];
		} else {
			reciver = conversationId[0].members[0];
		}
		setReciverUserId(reciver);
	};

	useEffect(() => {
		getMessages(currentChat, setCurrentMessages);
	}, [currentChat]);

	//logout
	const logout = () => {
		localStorage.removeItem('user');
		dispatch({ type: 'LOGOUT' });
	};

	return (
		<Container>
			<Left>
				<InnerLeft>
					<RoundBtn onClick={() => logout()}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 172 172">
							<g
								fill="none"
								strokeMiterlimit="10"
								fontFamily="none"
								fontSize="none"
								fontWeight="none"
								textAnchor="none"
							>
								<path d="M0 172V0h172v172z" />
								<path
									fill="#000"
									d="M85.892 6.772c-23.378 0-44.43 10.215-58.896 26.372a6.88 6.88 0 1 0 10.246 9.177c11.974-13.372 29.27-21.789 48.65-21.789 36.18 0 65.36 29.182 65.36 65.36 0 36.18-29.18 65.36-65.36 65.36-19.377 0-36.672-8.415-48.65-21.788a6.88 6.88 0 1 0-10.246 9.177c14.469 16.156 35.522 26.372 58.897 26.372 43.615 0 79.12-35.505 79.12-79.12 0-43.616-35.505-79.12-79.12-79.12zM37.813 54.866a6.88 6.88 0 0 0-4.73 2.083L9.615 80.417a6.88 6.88 0 0 0 .026 10.978l23.442 23.442a6.88 6.88 0 1 0 9.729-9.729L30.476 92.772h62.512a6.88 6.88 0 1 0 0-13.76H30.476l12.336-12.335a6.88 6.88 0 0 0-4.999-11.812z"
								/>
							</g>
						</svg>
					</RoundBtn>
					<ImageBtn onClick={() => setShowUpdateProfile(!showUpdateProfile)}>
						<img
							src={
								user.profilePicture
									? user.profilePicture
									: 'https://isaojose.com.br/wp-content/uploads/2020/12/blank-profile-picture-mystery-man-avatar-973460.jpg'
							}
							alt="user profile"
						/>
					</ImageBtn>
					{showUpdateProfile && (
						<UpdateProfile
							user={user}
							dispatch={dispatch}
							onClick={setShowUpdateProfile}
							isFetching={isFetching}
						/>
					)}
				</InnerLeft>
				<LeftContent style={showConversations ? {} : { left: 'calc(-80vw + 100px)' }}>
					<div>
						<Headline>
							Say<span>Hi</span>
						</Headline>
						<div>
							<SearchUsersBar
								currentUserId={user._id}
								setConversations={setConversations}
								openConversation={openConversation}
								setCurrentChat={setCurrentChat}
							/>
						</div>
					</div>
					{conversations.map((el, index) => {
						return (
							<UserLink
								data={el}
								key={index}
								currentUser={user}
								onClick={openConversation}
							/>
						);
					})}
				</LeftContent>
			</Left>
			{isFetching ? <Spinner /> : null}

			<LeftOpenBtn
				style={showConversations ? {} : { left: '50px' }}
				onClick={() => setShowConversations(!showConversations)}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 172 172">
					<g
						fill="none"
						stroke-miterlimit="10"
						font-family="none"
						font-size="none"
						font-weight="none"
						text-anchor="none"
						transform={showConversations ? 'rotate(180, 83,86)' : ''}
					>
						<path d="M0 172V0h172v172z" />
						<g fill="#14cc60">
							<path d="m157.66667 86-57.33333 50.16667V35.83334z" />
							<path d="M14.33333 68.08333H107.5v35.83333H14.33333z" />
						</g>
					</g>
				</svg>
			</LeftOpenBtn>
			<Right>
				{currentChat ? (
					<Messenger
						messages={currentMessages}
						currentUserId={user._id}
						setMessage={setCurrentMessages}
						conversationId={currentChat}
						reciverUserId={reciverUserId}
					/>
				) : (
					<h2>Open a conversation</h2>
				)}
			</Right>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
`;
const Spinner = styled.div`
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translatey(-50%);
	width: 75px;
	height: 75px;
	border-radius: 50%;
	border: 4px solid #14cc60;
	border-top-color: transparent;
	animation: spin 1s infinite linear;

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(359deg);
		}
	}
`;

const Left = styled.section`
	display: flex;
	width: 50vw;
	min-height: 100vh;
	@media screen and (max-width: 750px) {
		width: 50px;
	}
`;
const LeftOpenBtn = styled.div`
	height: 50px;
	width: 22px;
	border-radius: 0 75px 75px 0;
	background-color: #23acd6;
	position: absolute;
	left: calc(80vw);
	top: 50%;
	transform: translateY(-50%);
	cursor: pointer;
	display: flex;
	align-items: center;
	transition: ease-in 0.7s;
	@media screen and (min-width: 751px) {
		display: none;
	}
`;
const InnerLeft = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #238fd6;
	width: 50px;
	min-width: 50px;
	min-height: 100vh;
	z-index: 3;
`;
const RoundBtn = styled.button`
	margin-top: 0.5rem;
	background: none;
	border: none;
	outline: none;
	width: 100%;
	cursor: pointer;
`;
const ImageBtn = styled.button`
	border-radius: 50%;
	cursor: pointer;
	padding: 0;
	width: 40px;
	height: 40px;
	border: none;
	outline: none;
	background: none;
	margin-top: 0.5rem;
	img {
		width: 35px;
		height: 35px;
		border-radius: 50%;
		object-fit: cover;
	}
`;
const LeftContent = styled.div`
	width: 100%;
	padding: 0.5rem;
	background-color: #23acd6;
	min-width: 300px;
	height: 100vh;
	transition: ease-in 0.7s;
	@media screen and (max-width: 750px) {
		position: absolute;
		min-width: calc(80vw - 50px);
		width: calc(80vw - 50px);
		left: 50px;
		top: 0;
		bottom: 0;
	}
`;
const Right = styled.section`
	width: 100%;
	min-height: 100vh;
	text-align: center;
`;

export default Home;
