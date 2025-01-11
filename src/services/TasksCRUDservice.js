import firebase from "../firebase";

export const addTask = (projectId, data) => {
  console.log(projectId)
  console.log(data)
  firebase.firestore()
    .collection('projects')
    .doc(projectId)
    .collection('tasks')
    .add(data);
};

export const getAllTasks = (projectId, onTasksChanged) => {
  firebase.firestore()
    .collection('projects')
    .doc(projectId)
    .collection('tasks')
    .onSnapshot((snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      onTasksChanged(tasks);
    });
};

export const deleteTask = (projectId, taskId) => {
  firebase.firestore()
    .collection('projects')
    .doc(projectId)
    .collection('tasks')
    .doc(taskId)
    .delete();
};

export const showTaskById = (projectId, taskId, setTask) => {
  firebase.firestore()
    .collection('projects')
    .doc(projectId)
    .collection('tasks')
    .doc(taskId)
    .get()
    .then((doc) => setTask({ id: doc.id, ...doc.data() }));
};

export const updateTask = (projectId, taskId, data) => {
  firebase.firestore()
    .collection('projects')
    .doc(projectId)
    .collection('tasks')
    .doc(taskId)
    .set(data, { merge: true });
};

export const countTasks = async (projectId) => {
  try {
    const snapshot = await firebase.firestore()
      .collection('projects')
      .doc(projectId)
      .collection('tasks')
      .get();
      
    return snapshot.size;
  } catch (error) {
    console.error("Error counting tasks:", error);
    return 0;
  }
};