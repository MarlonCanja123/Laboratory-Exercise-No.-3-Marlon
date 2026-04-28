import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Dashboard() {

  const [email, setEmail] = useState("");

  useEffect(() => {
    const user =
      supabase.auth.getUser();

    user.then((res) => {
      if (res.data.user) {
        setEmail(
          res.data.user.email
        );
      }
    });
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    alert("Logged out");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>

      <h2>Welcome!</h2>

      <p>User Email:</p>

      <h3>{email}</h3>

      <button onClick={logout}>
        Logout
      </button>

    </div>
  );
}
