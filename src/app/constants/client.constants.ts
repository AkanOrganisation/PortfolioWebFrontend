import {ClientType} from "../types";
import {EMPTY_ADDRESS} from "./address.constants";

export const EMPTY_CLIENT: ClientType = {
    phoneNumber: "",
    firstName: "",
    lastName: "",
    displayName: "",
    address: EMPTY_ADDRESS
};
