import { SystemPermissionModel } from "src/app/core/models/system-permission.model";
import { SystemUserWebEntity } from "./system-user-web-entity";

export interface SystemUserWithPermissionsWebEntity extends SystemUserWebEntity
{
  systemPermissions: SystemPermissionModel[];
}

