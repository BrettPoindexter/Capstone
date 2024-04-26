import { useLogoutMutation } from './authSlice';

function LogoutButton() {
    const [logout] = useLogoutMutation();
    return <button onClick={logout}>Logout</button>
}

export default LogoutButton;