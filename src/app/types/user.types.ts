import {ClientType} from "./client.types";
import {OrganiserType} from "./organiser.types";
import {UserPermissions} from "../constants/permissions.constants";

export type UserType = {
  email?: string;
  password?: string;
  password2?: string;

  authenticated?: boolean;
  permissions?: UserPermissions[];

  client?: ClientType;
  organiser?: OrganiserType;

}
