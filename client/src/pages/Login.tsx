export default function Login() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value
      })
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/home";
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" /><br />
        <input name="password" type="password" placeholder="Password" /><br />
        <button>Login</button>
      </form>
      <a href="/">Create new account</a>
    </div>
  );
}
