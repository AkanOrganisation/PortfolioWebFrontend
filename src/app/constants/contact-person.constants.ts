import {ContactPersonType} from "../types";

const emptyPersonType: ContactPersonType = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: ""
}



export function getEmptyContactPerson(): ContactPersonType {
    return JSON.parse(JSON.stringify(emptyPersonType));
}
