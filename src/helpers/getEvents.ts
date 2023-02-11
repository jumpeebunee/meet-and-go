import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { IEvent } from "../types/types";

export function getEvents(setData: Function) {
  onSnapshot(collection(db, "events"), doc => {
    const data: IEvent[] = []
    doc.forEach((d) => {
      data.push(d.data() as IEvent);
    })
    setData(data);
  })
}