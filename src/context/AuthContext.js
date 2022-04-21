import React, { useContext, useState, useEffect } from "react";
import { auth, admin } from "../firebase";
// import firebase from "firebase/compat/app";

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
    return auth.signInWithEmailAndPassword(email, password);
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

  async function delUser(email) {
    const user = await admin.auth().getUserByEmail(email)
     await admin.auth().deleteUser(user.uid)
  }

  async function blockPass(email){
    const newPass = '85tjoec5&%$&3ckfvpd964VDFBY67&/%(/';
    let user = await admin.auth().getUserByEmail(email);
    user.password=newPass
    await admin.auth().updateUser(user.uid, user)
    return await admin.auth().generatePasswordResetLink()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log(user);
      currentUser?.uid && dispatch(userById(currentUser.uid))
      setLoading(false);
    });
    
    return unsubscribe;
  }, [currentUser?.uid, dispatch]);
  const value = {
    currentUser,
    login,
    delUser,
    blockPass,
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
