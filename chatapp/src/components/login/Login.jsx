import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";

function Login() {
  const [imageSelected, setImageSelected] = useState({ file: null, url: "" });

  function handleImageSelected(e) {
    if (e.target.files[0]) {
      setImageSelected({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  }

  function handleSignIn(e) {
    e.preventDefault();
    toast.warn("warning");
  }

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome Back,</h2>
        <form onSubmit={handleSignIn}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button>Sign In</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an account,</h2>
        <form>
          <label htmlFor="file">
            <img src={imageSelected.url || "./avatar.png"} />
            Upload an Image{" "}
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImageSelected}
          />

          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
