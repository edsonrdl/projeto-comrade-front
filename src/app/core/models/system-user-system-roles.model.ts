import { SystemRoleModel } from "./system-role.model";
import { SystemUserModel } from "./system-user.model";

export interface SystemUserSystemRolesModel extends SystemUserModel {
  systemRoles: SystemRoleModel[];
}
