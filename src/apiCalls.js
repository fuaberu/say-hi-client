export const loginCall = async (userCredentials, dispatch) => {
	dispatch({ type: 'LOGIN_START' });
	try {
		await fetch('https://say-hi-api.herokuapp.com/api/auth/login', {
			method: 'POST',
			mode: 'cors',
			headers:"Access-Control-Allow-Origin: *",
			body: JSON.stringify({
				email: userCredentials.email,
				password: userCredentials.password,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data === 'not check' || data === 'user not found') {
					dispatch({ type: 'LOGIN_FAILURE' });
				} else {
					dispatch({ type: 'LOGIN_SUCCESS', payload: data });
				}
			});
		} catch (err) {
			dispatch({ type: 'LOGIN_FAILURE', payload: err });
	}
};

export const register = async (userCredentials, dispatch) => {
	dispatch({ type: 'LOGIN_START' });
	try {
		await fetch('https://say-hi-api.herokuapp.com/api/auth/register', {
			method: 'POST',
			mode: 'cors',
			headers:"Access-Control-Allow-Origin: *",
			body: JSON.stringify({
				email: userCredentials.email,
				username: userCredentials.username,
				password: userCredentials.password,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				dispatch({ type: 'LOGIN_SUCCESS', payload: data });
			});
	} catch (err) {
		dispatch({ type: 'LOGIN_FAILURE', payload: err });
	}
};

//get a user conversations
export const userConversations = async (userId, setConversations) => {
	try {
		await fetch(`https://say-hi-api.herokuapp.com/api/conversations/${userId}`, {
			method: 'GET',
			mode: 'cors',
			headers:"Access-Control-Allow-Origin: *",
		})
			.then((response) => response.json())
			.then((data) => {
				setConversations([...data]);
			});
	} catch (err) {
		console.log(err);
	}
};

//get a user by id
export const getUser = async (userId, setUser) => {
	try {
		await fetch(`https://say-hi-api.herokuapp.com/api/users?userId=${userId}`, {
			method: 'GET',
			mode: 'cors',
			headers:"Access-Control-Allow-Origin: *",
		})
			.then((response) => response.json())
			.then((data) => {
				setUser(data);
			});
	} catch (err) {
		console.log(err);
	}
};

//get a user by username
export const getUserByUsername = async (username, setUser) => {
	try {
		await fetch(`https://say-hi-api.herokuapp.com/api/users?username=${username}`, {
			method: 'GET',
			mode: 'cors',
			headers:"Access-Control-Allow-Origin: *",
		})
			.then((response) => response.json())
			.then((data) => {
				setUser(data);
			});
	} catch (err) {
		console.log(err);
	}
};

//update user profile photo
export const updateProfilePic = async (userId, imageUrl, dispatch) => {
	try {
		await fetch('https://say-hi-api.herokuapp.com/api/users/picture', {
			method: 'POST',
			mode: 'cors',
			headers:"Access-Control-Allow-Origin: *",
			body: JSON.stringify({
				userId,
				imageUrl,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				dispatch({ type: 'PROFILE_PIC_UPDATED', payload: data });
			});
	} catch (err) {
		console.log(err);
	}
};

//get all users
export const getAllUsers = async (username, currentuser, setList) => {
	try {
		await fetch(
			`https://say-hi-api.herokuapp.com/api/users/all?username=${username}&currentuser=${currentuser}`,
			{
				method: 'GET',
				mode: 'cors',
				headers:"Access-Control-Allow-Origin: *",
			}
		)
			.then((response) => response.json())
			.then((data) => {
				setList(data);
			});
	} catch (err) {
		console.log(err);
	}
};

//get messages
export const getMessages = async (conversationId, setMessages) => {
	try {
		await fetch(`https://say-hi-api.herokuapp.com/api/messages/${conversationId}`, {
			method: 'GET',
			mode: 'cors',
			headers:"Access-Control-Allow-Origin: *",
		})
			.then((response) => response.json())
			.then((data) => {
				setMessages([...data]);
			});
	} catch (err) {
		console.log(err);
	}
};

//get latest message
export const getLatestMessage = async (conversationId, setMessage) => {
	try {
		await fetch(`https://say-hi-api.herokuapp.com/api/messages/last/${conversationId}`, {
			method: 'GET',
			mode: 'cors',
			headers:"Access-Control-Allow-Origin: *",
		})
			.then((response) => response.json())
			.then((data) => {
				setMessage(data[0]);
			});
	} catch (err) {
		console.log(err);
	}
};

//send Messages
export const sendMessage = async (message, setMessages) => {
	try {
		await fetch(`https://say-hi-api.herokuapp.com/api/messages`, {
			method: 'POST',
			mode: 'cors',
			headers:"Access-Control-Allow-Origin: *",
			body: JSON.stringify({
				conversationId: message.conversationId,
				sender: message.sender,
				text: message.text,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setMessages((prev) => [...prev, data]);
			});
	} catch (err) {
		console.log(err);
	}
};

//start conversation
export const startConversation = async (
	conversation,
	setConversations,
	setCurrentChat
) => {
	try {
		await fetch(`https://say-hi-api.herokuapp.com/api/conversations`, {
			method: 'POST',
			mode: 'cors',
			headers:"Access-Control-Allow-Origin: *",
			body: JSON.stringify({
				senderId: conversation.senderId,
				reciverId: conversation.reciverId,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data === 'conversation exists') return;
				setConversations((prev) => [...prev, data]);
				setCurrentChat(data._id);
			});
	} catch (err) {
		console.log(err);
	}
};
