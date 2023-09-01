import { useState, useContext } from 'react';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.util';

import { UserContext } from '../../contexts/user.context';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({
            ...formFields,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('password not match');
            return;
        }

        try {
            const response = await createAuthUserWithEmailAndPassword(email, password);
            const { user } = response;

            setCurrentUser(user);

            await createUserDocumentFromAuth(user, {displayName});

            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.error('err: ' + error);
            }
        }
    };

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='Display Name'
                    type="text" 
                    name="displayName" 
                    value={displayName} 
                    onChange={handleChange} 
                    required
                />

                <FormInput 
                    label='Email'
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={handleChange} 
                    required
                />

                <FormInput 
                    label='Password'
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={handleChange} 
                    required
                />

                <FormInput 
                    label='Confirm Password'
                    type="password" 
                    name="confirmPassword" 
                    value={confirmPassword} 
                    onChange={handleChange} 
                    required
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;