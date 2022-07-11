import { Component, OnInit } from '@angular/core';
import { GetAllFinancialInformationUsecase } from '../../../core/usecases/financial-information/get-all-financialInformation.usecase';
import {
  FinancialInformationModel,
  ListFinancialInformationModel,
} from '../../../core/models/financial-information.model';
import { PageResultModel } from '../../../core/utils/responses/page-result.model';
import { PostFinancialInformationUsecase } from 'src/app/core/usecases/financial-information/post-financialInformation.usecase';
import { DeleteFinancialInformationUsercase } from 'src/app/core/usecases/financial-information/delete-financialInformation.usercase';
import { GetFinancialInformationByIdUsecase } from 'src/app/core/usecases/financial-information/get-financialInformation-by-id.usecase';
import { PutFinancialInformationUsecase } from 'src/app/core/usecases/financial-information/put-financialInformation.usecase';
import { SingleResultModel } from 'src/app/core/utils/responses/single-result.model';
import { PostListFinancialInformationUsecase } from 'src/app/core/usecases/financial-information/post-list-financialInformation.usecase';
import CustomStore from 'devextreme/data/custom_store';
import { PageFilterModel } from 'src/app/core/utils/filters/page-filter.model';
@Component({
  selector: 'app-financial-information',
  templateUrl: 'financial-information.component.html',
  styleUrls: ['financial-information.component.scss'],
  providers: [],
})
export class FinancialInformationComponent implements OnInit {
  dataSource: FinancialInformationModel[] = [];
  fileName!: String;

  constructor(
    private deleteFinancialInformationUsercase: DeleteFinancialInformationUsercase,
    private getAllFinancialInformationUsecase: GetAllFinancialInformationUsecase,
    private getFinancialInformationByIdUsecase: GetFinancialInformationByIdUsecase,
    private postFinancialInformationUsecase: PostFinancialInformationUsecase,
    private postListFinancialInformationUsecase: PostListFinancialInformationUsecase,
    private putFinancialInformationUsecase: PutFinancialInformationUsecase
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  onFileSelected(event: any) {
    console.log('entrou na onFileSelected');
    const file: File = event.target.files[0];
    this.fileName = file.name;
    let fileReader = new FileReader();

    fileReader.onloadend = (e) => {
      const informations = [fileReader.result];
      const informationString = informations.toString();
      var informationStrings = informationString?.split('\n');
      let i = 0;
      for (i = 0; i < informationStrings.length; i++) {
        let financialInformation = this.toFinancialInformation(informationStrings[i]);
        this.dataSource?.push(financialInformation);
      }
      let listFinancialInformationModel: ListFinancialInformationModel = {
        financialInformations: this.dataSource!,
      };
      this.postListFinancialInformationUsecase.execute(listFinancialInformationModel).subscribe();
    };
    fileReader.readAsText(file);
  }

  toFinancialInformation(item: string): FinancialInformationModel {
    let financialInformation: FinancialInformationModel = {
      type: item.slice(0, 1),
      date: item.slice(1, 9),
      value: item.slice(9, 19),
      cpf: item.slice(19, 30),
      card: item.slice(30, 42),
      hour: item.slice(42, 48),
      shop: item.slice(48, 62),
      store: item.slice(62, 81),
    };
    return financialInformation;
  }
  getAll(): void {
    this.getAllFinancialInformationUsecase
      .execute({ pageSize: 20, pageNumber: 1 })
      .subscribe((grid: PageResultModel<FinancialInformationModel>) => {
        this.dataSource = grid.data ?? [];
      });
  }
  getById(): void {
    this.getFinancialInformationByIdUsecase
      .execute('id')
      .subscribe((model: SingleResultModel<FinancialInformationModel>) => {
        console.log(model);
      });
  }
  create(e: any): void {
    console.log(e);
    const model = e.data as FinancialInformationModel;
    this.postFinancialInformationUsecase.execute(model).subscribe();
    console.log(model);
  }
  createMany(e: any): void {
    console.log(e);
    let financialInformation: FinancialInformationModel = {
      type: '',
      date: '',
      value: '',
      card: '',
      hour: '',
      shop: ' ',
      store: '  ',
      cpf: '',
    };

    let listFinancialInformationModel: ListFinancialInformationModel = {
      financialInformations: [financialInformation],
    };
    this.postListFinancialInformationUsecase.execute(listFinancialInformationModel).subscribe();
  }
  edit(e: any): void {
    const model = { ...e.oldData, ...e.newData } as FinancialInformationModel;
    this.putFinancialInformationUsecase.execute(model).subscribe();
  }
  delete(e: any): void {
    const model = e.data as FinancialInformationModel;
    if (model.id) {
      this.deleteFinancialInformationUsercase.execute(model.id).subscribe();
    }
  }
}
