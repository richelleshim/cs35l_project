import { useNavigate } from 'react-router-dom';

// This must be a hook or part of a React component
export default function useLogout() {
  const navigate = useNavigate();

  // This function can be called in an event handler like onClick
  const logout = () => {
    localStorage.removeItem('user-info');
    navigate('/');
  };

  return logout;
}
