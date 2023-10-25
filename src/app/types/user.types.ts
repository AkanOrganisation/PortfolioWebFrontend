import {ClientType} from "./client.types";

export type UserType = {
  email?: string;
  password?: string;
  password2?: string;
  authenticated?: boolean;
  client?: ClientType;

}
