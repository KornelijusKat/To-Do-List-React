import firebase from "../firebase";
import { app } from "../firebase";
import "firebase/compat/auth";

const auth = app.auth();
const db = app.firestore();

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    return true
  } catch (err) {
    throw err;
  }
};
const signInWithEmailPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    return true;
  } catch (err) {
    throw err;
  }
};
const getUserData = (user, setUser) => {
  try {
    firebase
      .firestore()
      .collection("users")
      .where("uid", "==", user?.uid)
      .get()
      .then((userData) => setUser(userData.docs[0].data()));
  } catch (err) {
    console.log(err);
  }
};
const logout = () => {
  auth.signOut();
};
export default firebase;
export {
  auth,
  db,
  registerWithEmailAndPassword,
  getUserData,
  logout,
  signInWithEmailPassword,
};
