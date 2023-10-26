import {ClientType} from "../types";
import {getEmptyAddress} from "./address.constants";

const emptyClient: ClientType = {
    phoneNumber: "",
    firstName: "",
    lastName: "",
    displayName: "",
    address: getEmptyAddress()
};


export function getEmptyClient(): ClientType {
    return JSON.parse(JSON.stringify(emptyClient));
}
