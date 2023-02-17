import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const unactiveEvents = async(eventID: string, activeUsers: string[]) => {
  for (let user of activeUsers) {
    removeEventFromUser(user, eventID);
  }
  await deleteDoc(doc(db, "events", eventID));
}

const removeEventFromUser = async(user: string, id: string) => {
  const userEvent = doc(db, "users", user);
  await updateDoc(userEvent, {
    activeMeets: arrayRemove(id),
  })
}