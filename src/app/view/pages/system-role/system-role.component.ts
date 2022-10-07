import { Component, OnInit } from '@angular/core';
import { GetAllSystemRoleUsecase } from '../../../core/usecases/system-role/get-all-system-role.usecase';
import {SystemRoleModel,} from '../../../core/models/system-role.model';
import { PageResultModel } from '../../../core/utils/responses/page-result.model';
import { PostSystemRoleUsecase } from 'src/app/core/usecases/system-role/post-system-role.usecase';
import { DeleteSystemRoleUsercase } from 'src/app/core/usecases/system-role/delete-system-role.usercase';
import { GetSystemRoleByIdUsecase } from 'src/app/core/usecases/system-role/get-system-role-by-id.usecase';
import { PutSystemRoleUsecase } from 'src/app/core/usecases/system-role/put-system-role.usecase';
import { SingleResultModel } from 'src/app/core/utils/responses/single-result.model';
import { ModalService } from './../../components/modal/modal.service';


@Component({
  selector: 'app-system-role',
  templateUrl: 'system-role.component.html',
  styleUrls: ['system-role.component.scss'],
  providers: [],
})
export class SystemRoleComponent implements OnInit {
  dataSource!: SystemRoleModel[];

  constructor(
    private deleteSystemRoleUsercase: DeleteSystemRoleUsercase,
    private getAllSystemRoleUsecase: GetAllSystemRoleUsecase,
    private getSystemRoleByIdUsecase: GetSystemRoleByIdUsecase,
    private postSystemRoleUsecase: PostSystemRoleUsecase,
    private putSystemRoleUsecase: PutSystemRoleUsecase,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }
  getAll(): void {
    this.getAllSystemRoleUsecase
      .execute({ pageSize: 20, pageNumber: 1 })
      .subscribe((grid: PageResultModel<SystemRoleModel>) => {
        this.dataSource = grid.data ?? [];
      });
  }
  getById(): void {
    this.getSystemRoleByIdUsecase
      .execute('id')
      .subscribe((model: SingleResultModel<SystemRoleModel>) => {
        console.log(model);
      });
  }
  create(e: any): void {
    console.log(e);
    const model = e.data as SystemRoleModel;
    this.postSystemRoleUsecase.execute(model).subscribe();
    console.log(model);
  }
  
  edit(e: any): void {
    console.log(e);
    const model = { ...e.oldData, ...e.newData } as SystemRoleModel;
    this.putSystemRoleUsecase.execute(model).subscribe();
  }
  delete(e: any): void {
    const model = e.data as SystemRoleModel;
    if (model.id) {
      this.deleteSystemRoleUsercase.execute(model.id).subscribe();
    }
  }
  showInfo() {
    console.log('teste');
    this.modalService.open('modal-pesquisa');
  }

  closeDialog(rowIndex: any) {
    return this.modalService.close('modal-pesquisa');
  }
}
