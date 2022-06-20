import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import './ForgotPassword.scss';
import letter from '../../imgs/white-letter.png';
import { useRef } from 'react';
import { ToastPortal } from '../../components/ToastPortal/ToastPortal';

const ForgotPassword = () => {
	const toastRef = useRef();

	const [email, setEmail] = useState('');
	const [emailValidation, setEmailValidation] = useState('hide-text-danger');
	const navigate = useNavigate();

	const handleSendMeBack = () => {
		navigate('/login');
	};

	const handleChange = e => {
		setEmail(e.target.value);
	};

	const validateEmailClass = () => {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		setEmailValidation(
			re.test(String(email).toLowerCase()) || email.length === 0
				? 'hide-text-danger'
				: 'text-danger'
		);
		return re.test(String(email).toLowerCase());
	};

	const sendPasswordEmail = () => {
		const auth = getAuth();
		sendPasswordResetEmail(auth, email)
			.then(() => {
				toastRef.current.addMessage({
					mode: 'success',
					message: 'Check your email',
				});
			})
			.then(() => {
				setEmail('');
				// navigate('/login');
			})
			.catch(error => {
				console.log(error.code);
				console.log(error.message);
			});
	};

	return (
		<div className='forgotpassword-page '>
			<ToastPortal ref={toastRef} autoClose={false} />
			<form className='forgotpassword-form'>
				<h6 className='forgotpassword-title'>Forgot password</h6>
				<p className='forgotpassword-text'>
					Enter your email address and your password will be reset and emailed
					to you.
				</p>
				<label className='forgotpassword-label' htmlFor='forgotInput'>
					Email address
				</label>
				<input
					className='forgotpassword-input form-control'
					id='forgotInput'
					type='email'
					placeholder='Enter email'
					value={email}
					onChange={handleChange}
					onBlur={validateEmailClass}
				></input>
				<div className='btn-block'>
					<img
						className='forgotpassword-image-letter'
						src={letter}
						alt='letter'
					/>
					<span className={`${emailValidation}`}>Incorrect email address</span>
					<button
						className='btn btn-primary d-sm-inline-block forgotpassword-btn'
						onClick={e => {
							e.preventDefault();
							if (validateEmailClass()) {
								setEmail('');
								// navigate('/login');
							}
							sendPasswordEmail();
						}}
					>
						Send me new password
					</button>
				</div>
			</form>
			<p className='sendmeback'>
				Forget it,{' '}
				<span className='back-linck text-primary' onClick={handleSendMeBack}>
					send me back
				</span>{' '}
				to the login screen.
			</p>
		</div>
	);
};

export default ForgotPassword;
