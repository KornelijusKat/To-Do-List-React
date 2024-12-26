import firebase from "../firebase";

export const addProject = (data) => {
  firebase.firestore().collection('projects').add(data);
};

export const getAllProjects = (onProjectsChanged) => {
  firebase
    .firestore()
    .collection('projects')
    .onSnapshot((snapshot) => {
      const newProject = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      onProjectsChanged(newProject);
    });
};

export const deleteProject = (id) => {
  firebase.firestore()
  .collection('projects')
  .doc(id)
  .delete();
};

export const showById = (item, id) =>{ // select data for update
    firebase.firestore()
    .collection('projects')
    .doc(id)
    .get()
    .then((docRef)=>{item(docRef.data())})
}

export const updateProject = (id, data) => { // save 
    firebase.firestore()
    .collection('projects')
    .doc(id)
    .set(data)
}