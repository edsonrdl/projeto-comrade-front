import { Component, OnInit } from '@angular/core';
import { PageResultModel } from 'src/app/core/utils/responses/page-result.model';
import { SystemRoleModel } from 'src/app/core/models/system-role.model';
import { GetAllSystemRoleUsecase } from 'src/app/core/usecases/system-role/get-all-system-role.usecase';
import { ModalService } from '../../components/modal/modal.service';
import { SystemPermissionModel } from 'src/app/core/models/system-permission.model';
import { GetAllSystemPermissionUsecase } from 'src/app/core/usecases/system-permission/get-all-system-permission.usecase';

@Component({
  selector: 'app-system-role',
  templateUrl: 'system-role-system-permission.component.html',
  styleUrls: ['system-role-system-permission.component.scss'],
  providers: [],
})
export class SystemRoleSystemPermissionComponent implements OnInit {
  dataSource!: SystemRoleModel[];
  dataSourceAux: any[] = [];
  dataSourceSystemPermission!:SystemPermissionModel[];
  currentSystemRole!: SystemRoleModel;  
  popupVisible = false;
  selectedSystemPermission!: SystemPermissionModel[];
  
  popupModal: any = {};

  constructor(
    private getAllSystemRoleUsecase: GetAllSystemRoleUsecase,
    private getAllSystemPermissionUsecase: GetAllSystemPermissionUsecase,
    private modalService: ModalService,
  ) {
    
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllSystemPermission();
  }

  getAll(): void {
    this.getAllSystemRoleUsecase
      .execute({ pageSize: 20, pageNumber: 1 })
      .subscribe((grid: PageResultModel<SystemRoleModel>) => {
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
    this.popupModal = e.component;
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