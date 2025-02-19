import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sign_up.css'
import { signInWithEmailAndPassword } from 'firebase/auth/web-extension';
import { auth } from './firebase';
import { toast } from 'react-toastify';
import Google from './google';
const log_in = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href="/ai"
            toast.success("Login Successfully", {
                position: "top-center",
            });
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-center",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <div className="info">
                <h4>Login-In</h4>
                <div className="ele">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Enter the Email Id"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="ele">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter the Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">Enter</button>

                <p>For the <Link to="/sign_up"><span>Sign_up</span></Link></p>
                <Google/>
            </div>
        </form>
    );
}

export default log_in

