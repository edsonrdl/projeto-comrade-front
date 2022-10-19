import { Component, OnInit } from '@angular/core';
import { PageResultModel } from 'src/app/core/utils/responses/page-result.model';
import { SystemUserModel } from 'src/app/core/models/system-user.model';
import { ModalService } from '../../components/modal/modal.service';
import { SystemRoleModel } from 'src/app/core/models/system-role.model';
import { GetAllSystemRoleUsecase } from 'src/app/core/usecases/system-role/get-all-system-role.usecase';
import { SystemUserSystemRolesModel } from 'src/app/core/models/system-user-system-roles.model';
import { GetallwithRolesUsecase } from 'src/app/core/usecases/system-user/get-all-with-roles.usecase';
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
  dataSourceAux: any[] = [];
  dataSourceSystemRole!:SystemRoleModel[];
  currentSystemUser!: SystemUserSystemRolesModel;  
  popupVisible = false;
  selectedSystemRole!: SystemRoleModel[];
  
  popup: any = {};

  constructor(
    private getAllSystemRoleUsecase: GetAllSystemRoleUsecase,
    private modalService: ModalService,
    private getAllWithRolesUsecase: GetallwithRolesUsecase,
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
      .subscribe((grid: PageResultModel<SystemUserModel>) => {
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
    console.log(e.component);
    this.popup = e.component;
  }
  setCurrentSystemRole(e:any) {
    this.selectedSystemRole = e.data;
    this.popupVisible = true;
  }
  showClose() {
  
    this.modalService.close('modal-fechar');
  }
 
  manageRoles(e: any): void {
    const model =e.data  as SystemUserManageRolesModel;
    this.manageRolesUsecase.execute(model).subscribe();
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
    if(addRole !== -1){
      let userRoles = this.currentSystemUser?.systemRoles; 
      userRoles?.push(role);
    }
  }

  removeRoleFromCurrentSystemUser(role:SystemRoleModel): void{
    let removeRole = this.findIndexOfRoleInCurrentSystemRoles(role);
    if(removeRole === -1){
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