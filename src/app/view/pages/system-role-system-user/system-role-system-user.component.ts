import { Component, OnInit } from '@angular/core';
import { PageResultModel } from 'src/app/core/utils/responses/page-result.model';
import { SystemUserModel } from 'src/app/core/models/system-user.model';
import { GetAllSystemUserUsecase } from 'src/app/core/usecases/system-user/get-all-system-user.usecase';
import dxPopup from 'devextreme/ui/popup';
import { ModalService } from '../../components/modal/modal.service';
import { SystemRoleModel } from 'src/app/core/models/system-role.model';
import { GetAllSystemRoleUsecase } from 'src/app/core/usecases/system-role/get-all-system-role.usecase';

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
  currentSystemUser!: SystemUserModel;  
  popupVisible = false;
  selectedSystemRole!: SystemRoleModel[];
  
  popup: any = {};

  constructor(
    private getAllSystemUserUsecase: GetAllSystemUserUsecase,
    private getAllSystemRoleUsecase: GetAllSystemRoleUsecase,
    private modalService: ModalService,
  ) {
    
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllSystemRole();
  }

  getAll(): void {
    this.getAllSystemUserUsecase
      .execute({ pageSize: 20, pageNumber: 1 })
      .subscribe((grid: PageResultModel<SystemUserModel>) => {
        this.dataSource = grid.data ?? [];
      });
  }
  getAllSystemRole(): void {
    this.getAllSystemRoleUsecase
      .execute({ pageSize: 20, pageNumber: 1 })
      .subscribe((grid: PageResultModel<SystemRoleModel>) => {
        console.log(grid.data);
        this.dataSourceSystemRole = grid.data ?? [];
      });
  }

  popUpInitialize(e: any){
    console.log(e.component);
    this.popup = e.component;
  }

  // showPopUp(){
  //   // this.curentSystemUser = (event.row?.data as SystemUserModel);
  //   console.log(this.popup);
  //   this.popup.show();
  //   this.popupVisible = true;
  // }

  mockUserList(): void {
    this.dataSourceAux = this.dataSource.map((u) => {
      if (u.id == 'ec872b9a-484f-437f-2ec2-08da9b39d088') {
        return {
          ...u,
          SystemRoles: [
            {
              id: '00480a40-e701-4ce5-a32f-08daa6f68310',
              name: 'TEST1ROLE',
            },
          ],
        };
      } else {
        return {
          ...u,
          SystemRoles: [
            {
              id: 'ff4128a4-7af3-48de-a330-08daa6f68310',
              name: 'TEST2ROLE',
            },
          ],
        };
      }
    });
  }

  showInfo(e:any) {
    console.log(e.data);
    this.selectedSystemRole = e.data;
    this.popupVisible = true;
  }
  showClose() {
  
    this.modalService.close('modal-fechar');
  } 
}