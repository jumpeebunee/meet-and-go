import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const clearEventData = async(userID: string, eventID: string, leader: string, activeUsers: string[]) => {
  const userEvents = doc(db, "users", userID);
  const eventUser = doc(db, "events", eventID);

  await updateDoc(userEvents, {
    activeMeets: arrayRemove(eventID),
  });
  await updateDoc(eventUser, {
    activeUsers: arrayRemove(userID),
  });
  if (leader === userID) {
    for (let user in activeUsers) {
      removeEventFromUser(user, eventID)
    }
    await deleteDoc(doc(db, "events", eventID))
  };
}

const removeEventFromUser = async(user: string, id: string) => {
  const userEvent = doc(db, "users", user);
  await updateDoc(userEvent, {
    activeMeets: arrayRemove(id),
  });
}