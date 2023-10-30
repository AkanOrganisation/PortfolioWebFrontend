import {OrganiserType} from "../types";
import { getEmptyAddress} from "./address.constants";

const emptyOrganiser: OrganiserType = {
    companyName: undefined,
    registerNumber: undefined,
    contactPersons: [],
    address: getEmptyAddress()
};

export function getEmptyOrganiser(): OrganiserType {
    return JSON.parse(JSON.stringify(emptyOrganiser));
}
