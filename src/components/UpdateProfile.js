import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { updateProfilePic } from '../apiCalls';
import { uploadImage } from '../firebaseConfig';

const UpdateProfile = ({ user, dispatch, onClick, isFetching }) => {
	const [imageFile, setImageFile] = useState();
	const [image, setImage] = useState();

	useEffect(() => {
		console.log(isFetching);
	}, [isFetching]);

	const uploadMedia = async (e) => {
		const target = e.target;
		const file = target.files[0];
		setImageFile(file);

		//transform in url
		const url = URL.createObjectURL(file);
		setImage(url);
		//remove the old image URL from the memory
		URL.revokeObjectURL(file);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!imageFile) return;
		//set fetching to true
		dispatch({ type: 'PROFILE_PIC_UPDATE_START' });

		//close the pop-up
		onClick();

		//upload to firebase
		const url = await uploadImage(imageFile);

		//update profilepicture in mongoDB
		await updateProfilePic(user._id, url, dispatch);

		console.log(isFetching);
	};

	return (
		<Container>
			<OuterDiv onClick={() => onClick()}></OuterDiv>
			<Triangle />
			<form onSubmit={(e) => handleSubmit(e)}>
				<label htmlFor="file">
					<input
						id="file"
						type="file"
						accept="image/*"
						onChange={(e) => uploadMedia(e)}
						required
					/>
					{imageFile ? <span>{imageFile.name}</span> : <span>Chose a Image</span>}
				</label>
				{image ? <img src={image} alt="profile preview" /> : null}
				<button>Submit</button>
			</form>
		</Container>
	);
};

const OuterDiv = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: -35px;
	width: calc(100vw - 50px);
	height: 100vh;
`;

const Triangle = styled.div`
	width: 0;
	height: 0;
	margin-top: 35px;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
	border-right: 10px solid #f1f1f1;
	z-index: 0;
`;
const Container = styled.div`
	position: absolute;
	display: flex;
	left: 50px;
	top: 35px;
	form {
		z-index: 1;
		height: 250px;
		width: 60vw;
		max-width: 350px;
		padding: 1rem;
		border-radius: 7px;
		background-color: #f1f1f1;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		label {
			cursor: pointer;
			background-color: rgb(191, 191, 191);
			text-align: center;
			padding: 0.5rem 2rem;
			border-radius: 5px;
			input {
				visibility: hidden;
				width: 0;
				height: 0;
			}
		}
		img {
			width: 75px;
			height: 75px;
			border-radius: 50%;
			object-fit: cover;
		}
		button {
			padding: 0.5rem 2rem;
			border-radius: 5px;
			background-color: #238fd6;
			outline: none;
			border: none;
			color: #14cc60;
			font-weight: 700;
			cursor: pointer;
		}
	}
`;

export default UpdateProfile;
