export type IDate = {
  seconds: number,
  nanoseconds: number,
}

export type IEvent = {
  id: string,
  leader: string,
  iconColor: number,
  title: string,
  cords: number[],
  place: string,
  date: IDate,
  participants: number,
  contribution: number,
  activeUsers: string[],
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
  currentCreated: number
  createdMeets: number,
  image: string,
  activeMeets: string[],
}
