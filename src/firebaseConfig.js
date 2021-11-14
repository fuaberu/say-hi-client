import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const app = initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

const storage = getStorage(app);

export const uploadImage = async (file) => {
	const imageRef = ref(storage, `images/${file.name}`);
	await uploadBytes(imageRef, file);
	const imageUrl = await getDownloadURL(imageRef);
	return imageUrl;
};
