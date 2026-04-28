import Link from "next/link";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Machine Learning Hub</h1>

      <p>
        Welcome to the Machine Learning Hub.
        This platform allows users to explore machine learning tools,
        resources, and applications.
      </p>

      <Link href="/login">
        <button style={{
          padding: "10px 20px",
          fontSize: "16px",
          marginTop: "20px"
        }}>
          Get Started
        </button>
      </Link>
    </div>
  );
}
