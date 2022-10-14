import { SystemPermissionModel } from "./system-permission.model";
import { SystemUserModel } from "./system-user.model";

export interface SystemUserSystemPermissionsModel extends SystemUserModel {
  systemPermissions: SystemPermissionModel[];
}
