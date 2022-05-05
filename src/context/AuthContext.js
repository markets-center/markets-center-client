import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { userById } from '../redux/actions/a.users'
import { delOneUser } from '../redux/actions/a.users'


const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const oneUser = useSelector(store => store.oneUser)


  function signup(email, password, seller) {
    localStorage.setItem('isAdmin', false)
    localStorage.setItem('isSeller', seller)
    return auth.createUserWithEmailAndPassword(email, password);
  }

  async function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
      .then(userCredencials => {
        const token = userCredencials.user.auth.currentUser.accessToken
        return axios.get(`/api/private/users/byid/${userCredencials.user.uid}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      }).then(userDB => {
        localStorage.setItem('isAdmin', userDB.data.data.isAdmin)
        localStorage.setItem('isSeller', userDB.data.data.isSeller)
        return userDB
      })
  }

  function logout() {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isSeller')
    dispatch(delOneUser())
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
      currentUser?.uid && dispatch(userById(currentUser.uid, currentUser))
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser?.uid, dispatch, currentUser]);
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
