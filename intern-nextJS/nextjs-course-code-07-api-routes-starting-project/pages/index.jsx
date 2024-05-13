import { useState } from "react";

function HomePage() {
  const [data, setData] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const response = await fetch("/api/test", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);
  };

  const loadDummyData = async () => {
    const response = await fetch("/api/test");
    const data = await response.json();
    setData(data.user);
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" />
        </p>
        <p>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" />
        </p>
        <button type="submit">Submit</button>
      </form>

      <button onClick={loadDummyData}>Load Dummy Data</button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default HomePage;
