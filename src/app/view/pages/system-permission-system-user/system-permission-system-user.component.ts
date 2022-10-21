import { Component, OnInit } from '@angular/core';
import { PageResultModel } from 'src/app/core/utils/responses/page-result.model';
import { SystemUserModel } from 'src/app/core/models/system-user.model';
import { ModalService } from '../../components/modal/modal.service';
import { SystemPermissionModel } from 'src/app/core/models/system-permission.model';
import { GetAllSystemPermissionUsecase } from 'src/app/core/usecases/system-permission/get-all-system-permission.usecase';
import { GetAllWithPermissionsUsecase } from 'src/app/core/usecases/system-user/get-all-with-permissions.usecase';
import { SystemUserSystemPermissionsModel } from 'src/app/core/models/system-user-system-permissions.model';
import { ManagePermissionsUsecase } from 'src/app/core/usecases/system-user/manage-permissions.usecase';
import { SystemUserManagePermissionsModel } from 'src/app/core/models/system-user-manage-permissions.model';

@Component({
  selector: 'app-system-user',
  templateUrl: 'system-permission-system-user.component.html',
  styleUrls: ['system-permission-system-user.component.scss'],
  providers: [],
})
export class SystemPermissionSystemUserComponent implements OnInit {
  dataSource!: SystemUserModel[];
  dataSourceSystemPermission!:SystemPermissionModel[];
  currentSystemUser: SystemUserSystemPermissionsModel | undefined;  
  popupVisible = false;
  
  popup: any = {};

  constructor(
    private getAllSystemPermissionUsecase: GetAllSystemPermissionUsecase,
    private modalService: ModalService,
    private getAllWithPermissionsUsecase: GetAllWithPermissionsUsecase,
    private managePermissionsUsecase: ManagePermissionsUsecase,
    
  ) { 
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllSystemPermission();
  }

  getAll(): void {
    this.getAllWithPermissionsUsecase
      .execute({ pageSize: 20, pageNumber: 1 })
      .subscribe((grid: PageResultModel<SystemUserSystemPermissionsModel>) => {
        this.dataSource = grid.data ?? [];
      });
  }
  getAllSystemPermission(): void {
    this.getAllSystemPermissionUsecase
      .execute({ pageSize: 20, pageNumber: 1 })
      .subscribe((grid: PageResultModel<SystemPermissionModel>) => {
        this.dataSourceSystemPermission = grid.data ?? [];
      });
  }

  popUpInitialize(e: any){
    this.popup = e.component;
  }
  setCurrentSystemUser(e:any) {
    this.currentSystemUser = {...e.data};
    this.popupVisible = true;
  }
  showClose() {
    this.currentSystemUser = undefined;
    this.modalService.close('modal-fechar');
  }
  managePermissions(): void {
    let manageSystemUser = this.getManagerSystemUser();
    this.managePermissionsUsecase.execute(manageSystemUser).subscribe();
  }
  getManagerSystemUser() : SystemUserManagePermissionsModel {
    let currentUserId = this.currentSystemUser?.id;
    currentUserId = currentUserId ? currentUserId : "";

    let permissionIds = this.currentSystemUser?.systemPermissions.map(permission => {
      return permission.id ? permission.id : ""
    });

    permissionIds = permissionIds ? permissionIds : [];

    let result: SystemUserManagePermissionsModel = {
      id: currentUserId,
      systemPermissionIds: permissionIds
    }
    return result;
  }
  getValuePermissionCheckBox(permission:SystemPermissionModel): boolean {
    let index = this.findIndexOfPermissionInCurrentSystemPermissions(permission);
    let existsInArray = index !== -1; 
    return existsInArray;
  }

  permissionCheckBoxChange(permission:SystemPermissionModel, checkBoxValue:boolean) {
    if(checkBoxValue) { 
      this.addPermissionInCurrentSystemUser(permission);
    } 
    else {
      this.removePermissionFromCurrentSystemUser(permission);
    }
  }
  addPermissionInCurrentSystemUser(permission:SystemPermissionModel): void{
    let addPermission = this.findIndexOfPermissionInCurrentSystemPermissions(permission);
    if(addPermission === -1){
      let userPermissions = this.currentSystemUser?.systemPermissions; 
      userPermissions?.push(permission);
    }
  }

  removePermissionFromCurrentSystemUser(permission:SystemPermissionModel): void{
    let removePermission = this.findIndexOfPermissionInCurrentSystemPermissions(permission);
    if(removePermission!==undefined && removePermission !== -1){
      let userPermissions = this.currentSystemUser?.systemPermissions; 
      userPermissions?.splice(removePermission,1);
    }
  }

  findIndexOfPermissionInCurrentSystemPermissions(permission:SystemPermissionModel): number | undefined{
    let userPermissions = this.currentSystemUser?.systemPermissions; 
    let index = userPermissions?.findIndex(val => val.id == permission.id);
    return index;
  }
}