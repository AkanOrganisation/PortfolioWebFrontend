import {UserType} from "../types";


const emptyUser : UserType = {
  email: "",
  password: "",
  password2: "",
}

export function getEmptyUser(): UserType {
  return JSON.parse(JSON.stringify(emptyUser));
}
