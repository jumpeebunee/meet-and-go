export type IEvent = {
  id: string,
  title: string,
  cords: number[],
  place: string,
  interest: string[],
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
}