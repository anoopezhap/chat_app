import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db, storage } from "../../lib/firebase";
import upload from "../../lib/upload";

function Login() {
  const [imageSelected, setImageSelected] = useState({ file: null, url: "" });

  const [loading, setLoading] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);

  function handleImageSelected(e) {
    if (e.target.files[0]) {
      setImageSelected({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  }

  async function handleSignIn(e) {
    e.preventDefault();

    setSignInLoading(true);
    const formData = new FormData(e.target);

    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setSignInLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    // VALIDATE INPUTS
    if (!username || !email || !password)
      return toast.warn("Please enter inputs!");
    if (!imageSelected.file) return toast.warn("Please upload an avatar!");

    // VALIDATE UNIQUE USERNAME
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return toast.warn("Select another username");
    }

    try {
      setLoading(true);

      const res = await createUserWithEmailAndPassword(auth, email, password);

      const imgUrl = await upload(imageSelected.file);

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("Account created! You can login now");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome Back,</h2>
        <form onSubmit={handleSignIn}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={signInLoading}>
            {signInLoading ? "Loading" : "Sign In"}
          </button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an account,</h2>
        <form onSubmit={handleRegister}>
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
          <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
