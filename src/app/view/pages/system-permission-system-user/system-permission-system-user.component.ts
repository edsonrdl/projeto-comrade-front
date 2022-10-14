import { Component, OnInit } from '@angular/core';
import { PageResultModel } from 'src/app/core/utils/responses/page-result.model';
import { SystemUserModel } from 'src/app/core/models/system-user.model';
import { GetAllSystemUserUsecase } from 'src/app/core/usecases/system-user/get-all-system-user.usecase';
import dxPopup from 'devextreme/ui/popup';
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
  valueCheck= false
  
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
    console.log(e.component);
    this.popup = e.component;
  }

  showInfo(e:any) {
    console.log(e.data);
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

  addPermissionInCurrentUser(){(e:any) {
    console.log(e.data);
    this.currentSystemUser = {...e.data};
    this.popupVisible = true;
  }

  }
  removePermissionFromCurrentUser(){

  }
}