import { useState } from 'react';
import Button from "../../ui/Button";
import { useDispatch } from 'react-redux';
import { updateName } from './userSlice';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  // State to manage the username input value
  const [username, setUsername] = useState('');

  // Redux dispatch hook for dispatching actions
  const dispatch = useDispatch();

  // React Router's useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Handler function for form submission
  function handleSubmit(e) {
    e.preventDefault();
    
    // If username is empty, prevent submission
    if (!username) return;

    // Dispatch the action to update the username in the Redux store
    dispatch(updateName(username));
    
    // Navigate to the menu page after updating the username
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Welcome message and instructions */}
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      {/* Input field for username */}
      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-8 w-72"
      />

      {/* Show the button only if the username is not empty */}
      {username !== '' && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
