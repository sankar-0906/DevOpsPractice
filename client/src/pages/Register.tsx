
export default function Register() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    await fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    alert("Registered! Now login.");
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" /><br />
        <input name="password" placeholder="Password" type="password" /><br />
        <button>Register</button>
      </form>
      <a href="/login">Already have an account?</a>
    </div>
  );
}
