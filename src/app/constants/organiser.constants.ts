import {OrganiserType} from "../types";
import { getEmptyAddress} from "./address.constants";

const emptyOrganiser: OrganiserType = {
    companyName: "",
    registerNumber: "",
    contactPersons: [],
    address: getEmptyAddress()
};

export function getEmptyOrganiser(): OrganiserType {
    return JSON.parse(JSON.stringify(emptyOrganiser));
}
