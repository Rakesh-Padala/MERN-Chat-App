import React, { useState } from "react";
import axios from "axios"

function Signup() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
        {isSignUp ? <SignUpForm /> : <LoginForm />}
        <div className="text-center">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don’t have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, " ", password);

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });
      console.log("Login Successfull : ", response.data);
    } catch (error) {
        console.error("Login error:", error.response.data);
        setErrorMessage(error.response.data.message || "Server Error");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
}

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', {
        username,
        email,
        password,
      });
  
      if (response && response.data) {
        console.log('Signup successful:', response.data);
        // Handle success, such as redirecting the user or showing success message
      } else {
        console.error('No response data available.');
        setErrorMessage('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Server Error');
      } else {
        setErrorMessage('Server Error');
      }
    }
  };
  
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
          required
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
      >
        Sign Up
      </button>
    </form>
  );
}

export default Signup;
