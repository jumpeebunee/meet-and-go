export type IDate = {
  seconds: number,
  nanoseconds: number,
}

export type IEvent = {
  id: string,
  title: string,
  cords: number[],
  place: string,
  date: IDate,
  participants: number,
  contribution: number,
  activeUsers: IUserFull[],
}

export type IEventInfo = {
  id: string,
  title: string,
  place: string,
  date: IDate | Date,
  contribution: number,
}

export type IUser = {
  username: string,
  email: string,
  uid: string,
}

export type IUserFull = {
  email: string,
  interests: string[],
  phone: string,
  town: string,
  uid: string,
  username: string,
  reputation: number,
  totalMeets: number,
  createdMeets: number,
  image: string,
  activeMeets: IEvent[],
}
