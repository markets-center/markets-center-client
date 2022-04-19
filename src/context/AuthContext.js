import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {userById} from '../redux/actions/a.users'

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const oneUser = useSelector(store => store.oneUser)


  function signup(email, password) {
      console.log(email,password)
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log(user);
      setLoading(false);
    });
    currentUser?.uid && dispatch(userById(currentUser.uid))
    
    return unsubscribe;
  }, [currentUser?.uid, dispatch]);
  const value = {
    currentUser,
    login,
    oneUser,
    resetPassword,
    // updateEmail,
    // updatePassword,
    logout,
    signup,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
