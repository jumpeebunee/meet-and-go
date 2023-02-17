import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const clearEventData = async(userID: string, reputation: number, eventID: string, leader: string, activeUsers: string[]) => {
  const userEvents = doc(db, "users", userID);
  const eventUser = doc(db, "events", eventID);

  if (leader === userID) {
    for (let user of activeUsers) {
      if (user === leader) {
        removeEventFromUser(user, eventID, leader, reputation);
      } else {
        removeEventFromUser(user, eventID, leader);
      }
    }
    await deleteDoc(doc(db, "events", eventID));
  } else {
    await updateDoc(userEvents, {
      activeMeets: arrayRemove(eventID),
    });
    await updateDoc(eventUser, {
      activeUsers: arrayRemove(userID),
    });
  }
}

const removeEventFromUser = async(user: string, id: string, leader: string, reputation?: number) => {
  const userEvent = doc(db, "users", user);
  if (reputation) {
    await updateDoc(userEvent, {
      activeMeets: arrayRemove(id),
      reputation: reputation - 150,
    });
  } else {
    await updateDoc(userEvent, {
      activeMeets: arrayRemove(id),
    });
  }
}