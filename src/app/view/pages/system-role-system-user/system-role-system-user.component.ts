import { Component, OnInit } from '@angular/core';
import { PageResultModel } from 'src/app/core/utils/responses/page-result.model';
import { SystemUserModel } from 'src/app/core/models/system-user.model';
import { ModalService } from '../../components/modal/modal.service';
import { SystemRoleModel } from 'src/app/core/models/system-role.model';
import { GetAllSystemRoleUsecase } from 'src/app/core/usecases/system-role/get-all-system-role.usecase';
import { GetAllWithRolesUsecase } from 'src/app/core/usecases/system-user/get-all-with-roles.usecase';
import { SystemUserSystemRolesModel } from 'src/app/core/models/system-user-system-roles.model';
import { ManageRolesUsecase } from 'src/app/core/usecases/system-user/manage-roles.usecase';
import { SystemUserManageRolesModel } from 'src/app/core/models/system-user-manage-roles.model';

@Component({
  selector: 'app-system-user',
  templateUrl: 'system-role-system-user.component.html',
  styleUrls: ['system-role-system-user.component.scss'],
  providers: [],
})
export class SystemRoleSystemUserComponent implements OnInit {
  dataSource!: SystemUserModel[];
  dataSourceSystemRole!:SystemRoleModel[];
  currentSystemUser: SystemUserSystemRolesModel | undefined;  
  popupVisible = false;
  
  popup: any = {};

  constructor(
    private getAllSystemRoleUsecase: GetAllSystemRoleUsecase,
    private modalService: ModalService,
    private getAllWithRolesUsecase: GetAllWithRolesUsecase,
    private manageRolesUsecase: ManageRolesUsecase,
    
  ) { 
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllSystemRole();
  }

  getAll(): void {
    this.getAllWithRolesUsecase
      .execute({ pageSize: 20, pageNumber: 1 })
      .subscribe((grid: PageResultModel<SystemUserSystemRolesModel>) => {
        this.dataSource = grid.data ?? [];
      });
  }
  getAllSystemRole(): void {
    this.getAllSystemRoleUsecase
      .execute({ pageSize: 20, pageNumber: 1 })
      .subscribe((grid: PageResultModel<SystemRoleModel>) => {
        this.dataSourceSystemRole = grid.data ?? [];
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
  manageRoles(): void {
    let manageSystemUser = this.getManagerSystemUser();
    this.manageRolesUsecase.execute(manageSystemUser).subscribe();
  }
  getManagerSystemUser() : SystemUserManageRolesModel {
    let currentUserId = this.currentSystemUser?.id;
    currentUserId = currentUserId ? currentUserId : "";

    let roleIds = this.currentSystemUser?.systemRoles.map(role => {
      return role.id ? role.id : ""
    });

    roleIds = roleIds ? roleIds : [];

    let result: SystemUserManageRolesModel = {
      id: currentUserId,
      systemRoleIds: roleIds
    }
    return result;
  }
  getValueRoleCheckBox(role:SystemRoleModel): boolean {
    let index = this.findIndexOfRoleInCurrentSystemRoles(role);
    let existsInArray = index !== -1; 
    return existsInArray;
  }

  roleCheckBoxChange(role:SystemRoleModel, checkBoxValue:boolean) {
    if(checkBoxValue) { 
      this.addRoleInCurrentSystemUser(role);
    } 
    else {
      this.removeRoleFromCurrentSystemUser(role);
    }
  }
  addRoleInCurrentSystemUser(role:SystemRoleModel): void{
    let addRole = this.findIndexOfRoleInCurrentSystemRoles(role);
    if(addRole === -1){
      let userRoles = this.currentSystemUser?.systemRoles; 
      userRoles?.push(role);
    }
  }

  removeRoleFromCurrentSystemUser(role:SystemRoleModel): void{
    let removeRole = this.findIndexOfRoleInCurrentSystemRoles(role);
    if(removeRole!==undefined && removeRole !== -1){
      let userRoles = this.currentSystemUser?.systemRoles; 
      userRoles?.splice(removeRole,1);
    }
  }

  findIndexOfRoleInCurrentSystemRoles(role:SystemRoleModel): number | undefined{
    let userRoles = this.currentSystemUser?.systemRoles; 
    let index = userRoles?.findIndex(val => val.id == role.id);
    return index;
  }
}