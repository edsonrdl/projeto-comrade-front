import { SystemUserModel } from "src/app/core/models/system-user.model";

export interface SystemUserWebEntity {
  id?: string;
  name: string;
  email: string;
  registration: string;
  registerDate: Date;
}
