import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useRouter } from "next/router";

export default function Login() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    setMessage("Sending confirmation email...");

    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Sign up successful! Please check your email to confirm your account before logging in.");
    }
  };

  const handleLogin = async () => {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Login successful! Redirecting...");
      router.push("/pages/dashboard");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>

      <h2>Login / Sign Up</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSignUp}>
        Sign Up
      </button>

      <button onClick={handleLogin}>
        Login
      </button>

      <p>{message}</p>

    </div>
  );
}