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
  currentSystemUser!: SystemUserSystemPermissionsModel;  
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
  showInfo(e:any) {
    this.currentSystemUser = {...e.data};
    this.popupVisible = true;
  }
  showClose() {
    this.modalService.close('modal-fechar');
  }
 
  managePermissions(e: any): void {
    const model =e.data  as SystemUserManagePermissionsModel;
    this.managePermissionsUsecase.execute(model).subscribe();
  }

  addPermissionInCurrentUser() {

  }
  removePermissionFromCurrentUser(){

  }
  teste: boolean = true;
  getValuePermissionCheckBox(permission:SystemPermissionModel): boolean {
    //checar se permission existe no array do currentSystemUser.SystemPermissions

      this.currentSystemUser.systemPermissions.push(permission);
    
    return this.teste;
  }
//  Const permissionTest=(permission)=>{
//   if(currentSystemUser.systemPermissions.includes(permission)){
//     permissionInclui=currentSystemUser.systemPermissions.indexOf (permission)
//     return [permissionInclui]
//   }
//  }
 
  permissionCheckBoxChange(permission:SystemPermissionModel, checkBoxValue:boolean) {
    //adicionar ou remover permissao de array de acordo com o e.value
    // console.log("permissionCheckBoxChange");    
    console.log(permission);    
    // console.log(checkBoxValue);    
  }
}