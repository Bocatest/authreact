import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import React, { useState,  } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from 'firebase/firestore';
import "./SignIn.css";
import {useNavigate} from "react-router-dom";



const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const UserType = {
  FAN: 1,
  LUMINARY: 2,
};

  const navigate = useNavigate();

 const signIn = (e) => {
  e.preventDefault();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const userId = userCredential.user.uid;
      const userRef = doc(db, "users", userId);
      getDoc(userRef).then((doc) => {
        if (doc.exists()) {
          const userType = doc.get("userType");
          if (userType === UserType.FAN) {
            navigate("/home");
          } else if (userType === UserType.LUMINARY) {
            navigate("/dash");
          }
        } else {
          console.log("No such document!");
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
  const forgotPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInWithGoogle = (e) => {
    e.preventDefault();
    // TODO: Implement sign in with Google
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={signIn}>
        <h1>Log In To Your Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div className="button-container">
          <button type="submit" className="login-button">Log In</button>
          <button onClick={forgotPassword} className="forgot-password-button">Forgot Password?</button>
          <button onClick={signInWithGoogle} className="google-button">Sign In with Google</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn