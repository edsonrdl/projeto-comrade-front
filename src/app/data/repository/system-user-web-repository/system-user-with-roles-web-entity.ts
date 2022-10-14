import { SystemRoleModel } from "src/app/core/models/system-role.model";
import { SystemUserWebEntity } from "./system-user-web-entity";

export interface SystemUserWithRolessWebEntity extends SystemUserWebEntity
{
  systemRoles: SystemRoleModel[];
}

