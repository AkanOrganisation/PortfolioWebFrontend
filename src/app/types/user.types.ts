import {ClientType} from "./client.types";
import {OrganiserType} from "./organiser.types";

export type UserType = {
  email?: string;
  password?: string;
  password2?: string;
  authenticated?: boolean;
  client?: ClientType;
  organiser?: OrganiserType;

}
