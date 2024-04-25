import { useState } from 'react';
import { useLoginMutation, useRegisterMutation, useGhLoginMutation } from './authSlice';

/**
 * AuthForm allows a user to either login or register for an account
 */
function AuthForm() {
    const [login] = useLoginMutation();
    const [register] = useRegisterMutation();
    const [ghLogin] = useGhLoginMutation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLogin, setIsLogin] = useState(false);
    const authType = isLogin ? 'Login' : 'Register';
    const oppositeAuthCopy = isLogin
        ? "Don't have an account?"
        : "Already have an account?";
    const oppositeAuthType = isLogin ? "Register" : "Login";

    /**
     * Send credentials to server for authentication
     */
async function attemptAuth(e) {
    e.preventDefault();
    setError(null);

    const authMethod = isLogin ? login : register;
    const credentials = isLogin ? { email, password } : { name, email, password };

    try {
        setLoading(true);
        await authMethod(credentials).unwrap();
    } catch (err) {
        setLoading(false);
        setError(err.data);
    }
};


    return (
        <main>
            <h1>{authType}</h1>
            <form onSubmit={attemptAuth} name={authType}>
                {!isLogin && ( // Conditionally render username input for registration
                    <label>
                        Username
                        <input
                            type='text'
                            name='name'
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </label>
                )}
                <label>
                    Email
                    <input
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </label>
                <label>
                    Password
                    <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </label>
                <button type='submit'>{authType}</button>
                {isLogin && <button onClick={(e) => {
                    e.preventDefault();
                    ghLogin();
                }}>Login via Github</button>}
            </form>
            <p>
                {oppositeAuthCopy}{' '}
                <a
                    onClick={() => {
                        setIsLogin(!isLogin);
                    }}
                >
                    {oppositeAuthType}
                </a>
            </p>
            {loading && <p>Logging in...</p>}
            {error && <p>{error}</p>}
        </main>
    );
}

export default AuthForm;
