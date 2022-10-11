import { Component, OnInit } from '@angular/core';
import { PageResultModel } from 'src/app/core/utils/responses/page-result.model';
import { SystemUserModel } from 'src/app/core/models/system-user.model';
import { GetAllSystemUserUsecase } from 'src/app/core/usecases/system-user/get-all-system-user.usecase';
import dxPopup from 'devextreme/ui/popup';
import { ModalService } from '../../components/modal/modal.service';
import { SystemPermissionModel } from 'src/app/core/models/system-permission.model';
import { GetAllSystemPermissionUsecase } from 'src/app/core/usecases/system-permission/get-all-system-permission.usecase';

@Component({
  selector: 'app-system-user',
  templateUrl: 'system-permission-system-user.component.html',
  styleUrls: ['system-permission-system-user.component.scss'],
  providers: [],
})
export class SystemPermissionSystemUserComponent implements OnInit {
  dataSource!: SystemUserModel[];
  dataSourceAux: any[] = [];
  dataSourceSystemPermission!:SystemPermissionModel[];
  currentSystemUser!: SystemUserModel;  
  popupVisible = false;
  selectedSystemPermission!: SystemPermissionModel[];
  
  popup: any = {};

  constructor(
    private getAllSystemUserUsecase: GetAllSystemUserUsecase,
    private getAllSystemPermissionUsecase: GetAllSystemPermissionUsecase,
    private modalService: ModalService,
  ) {
    
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllSystemPermission();
  }

  getAll(): void {
    this.getAllSystemUserUsecase
      .execute({ pageSize: 20, pageNumber: 1 })
      .subscribe((grid: PageResultModel<SystemUserModel>) => {
        this.dataSource = grid.data ?? [];
      });
  }
  getAllSystemPermission(): void {
    this.getAllSystemPermissionUsecase
      .execute({ pageSize: 20, pageNumber: 1 })
      .subscribe((grid: PageResultModel<SystemPermissionModel>) => {
        console.log(grid.data);
        this.dataSourceSystemPermission = grid.data ?? [];
      });
  }

  popUpInitialize(e: any){
    console.log(e.component);
    this.popup = e.component;
  }

  mockUserList(): void {
    this.dataSourceAux = this.dataSource.map((u) => {
      if (u.id == 'ec872b9a-484f-437f-2ec2-08da9b39d088') {
        return {
          ...u,
          SystemPermissions: [
            {
              id: '81696b17-7854-4967-4a9d-08da9687d7e8',
              name: 'JUSEUS',
            },
          ],
        };
      } else {
        return {
          ...u,
          SystemPermissions: [
            {
              id: 'c22bcadf-ccd3-44af-c8b2-08da968ca774',
              name: 'ABELL',
            },
          ],
        };
      }
    });
  }

  showInfo(e:any) {
    console.log(e.data);
    this.selectedSystemPermission = e.data;
    this.popupVisible = true;
  }
  showClose() {
  
    this.modalService.close('modal-fechar');
  } 

  exemplo1(e:any){
    console.log(e.value);
  }

  exemplo2(systemPermission: SystemPermissionModel){
    console.log(systemPermission);
  }

}