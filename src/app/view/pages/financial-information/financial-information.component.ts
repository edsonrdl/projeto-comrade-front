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

  ngOnInit(): void {}

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
        console.log(financialInformation);
        this.dataSource.push(financialInformation);
      }
      let listFinancialInformationModel: ListFinancialInformationModel = {
        financialInformations: this.dataSource,
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
        console.log(grid.data);
      });
  }
  create(): void {
    let financialInformation: FinancialInformationModel = {
      type: '3',
      date: '201901',
      value: '00000',
      card: '4753',
      hour: '153453',
      shop: 'JOÃO MACEDO',
      store: 'BAR DO JOÃO',
      cpf: '3456345636',
    };

    this.postFinancialInformationUsecase
      .execute(financialInformation)
      .subscribe((model: FinancialInformationModel) => {
        console.log(model);
      });
  }
  createMany(): void {
    let financialInformation: FinancialInformationModel = {
      type: '8',
      date: '201901',
      value: '00000',
      card: '4753',
      hour: '153453',
      shop: 'JOÃO MACEDO',
      store: 'BAR DO JOÃO',
      cpf: '3456345636',
    };
    let listFinancialInformationModel: ListFinancialInformationModel = {
      financialInformations: [financialInformation],
    };
    console.log(listFinancialInformationModel);
    this.postListFinancialInformationUsecase.execute(listFinancialInformationModel).subscribe();
  }
  edit(): void {
    let financialInformation: FinancialInformationModel = {
      id: 'b3b65b61-ab6e-4cac-b744-d26162525feb',
      type: '9',
      date: '201901',
      value: '00000',
      card: '4753',
      hour: '153453',
      shop: 'JOÃO MACEDO',
      store: 'BAR DO JOÃO',
      cpf: '3456345636',
    };
    this.putFinancialInformationUsecase.execute(financialInformation).subscribe(() => {
      console.log(financialInformation);
    });
  }
  getById(): void {
    this.getFinancialInformationByIdUsecase
      .execute('c16f9c38-481c-43da-a432-89aa582549dd')
      .subscribe((model: SingleResultModel<FinancialInformationModel>) => {
        console.log(model);
      });
  }
  delete(): void {
    this.deleteFinancialInformationUsercase
      .execute('0fdce636-19fe-4063-889b-3c8e86dbc21a')
      .subscribe(() => {
        console.log('0fdce636-19fe-4063-889b-3c8e86dbc21a');
      });
  }
}
