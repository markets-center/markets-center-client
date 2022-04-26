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
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    try {
      const aaa = auth.signInWithEmailAndPassword(email, password);
      console.log('aaa', aaa)
      return aaa
    } catch (error) {
      console.log(error)
    }
  }

  function logout() {
    return auth.signOut();
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      currentUser?.uid && dispatch(userById(currentUser.uid))
      setLoading(false);
    });
    
    return unsubscribe;
  }, [currentUser?.uid, dispatch]);
  const value = {
    currentUser,
    login,
    oneUser,
    resetPassword,
    updateEmail,
    updatePassword,
    logout,
    signup,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
