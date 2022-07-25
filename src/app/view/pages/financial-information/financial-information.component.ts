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
import { EnumTypeFinancial } from 'src/app/core/models/EnumTypeFinancial';

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
    const financialInformationList: FinancialInformationModel[] = [];

    fileReader.onloadend = (e) => {
      const informations = [fileReader.result];
      const informationString = informations.toString();
      var informationStrings = informationString?.split('\n');
      let i = 0;
      for (i = 0; i < informationStrings.length; i++) {
        let financialInformation = this.toFinancialInformation(informationStrings[i]);
        financialInformationList?.push(financialInformation);
      }
      let listFinancialInformationModel: ListFinancialInformationModel = {
        financialInformations: financialInformationList,
      };
      this.postListFinancialInformationUsecase
        .execute(listFinancialInformationModel)
        .subscribe(() => this.dataSource.push(...financialInformationList));
    };
    fileReader.readAsText(file);
  }

  toFinancialInformation(item: string): FinancialInformationModel {
    const stringDateTime = item.slice(1, 9);
    console.log(stringDateTime);
    var ano = stringDateTime.slice(0, 4);
    ano = ano.concat('/');
    let mes = stringDateTime.slice(4, 6);
    mes = mes.concat('/');
    let dia = stringDateTime.slice(6, 8);
    const data = ano + mes + dia;
    // console.log(data);
    const stringhora = item.slice(42, 48);
    // console.log(stringhora);
    let hora = stringhora.slice(0, 2);
    hora = hora.concat(':');
    //console.log(hora);
    let minut = stringhora.slice(2, 4);
    minut = minut.concat(':');
    //console.log(minut);
    let segun = stringhora.slice(4, 6);
    //console.log(segun);
    const hour = hora + minut + segun;
    // console.log(hour);
    const dateTimeString = data + ' ' + hour;
    //console.log(dateTimeString);
    const dateTime = new Date(dateTimeString);
    console.log(dateTime);

    let valueInte = item.slice(9, 19);
    const value = parseFloat(valueInte) / 100;
    const valueFloat = value.toFixed(2);
    // console.log(valueFloat);
    let typeString = item.slice(0, 1);
    const typeNum = parseInt(typeString);

    // let stringOne = AnEnum[1];
    const typeEnumKey: string = EnumTypeFinancial[typeNum];
    const typeEnum: EnumTypeFinancial =
      EnumTypeFinancial[typeEnumKey as keyof typeof EnumTypeFinancial];

    const financialInformation: FinancialInformationModel = {
      type: typeEnum | EnumTypeFinancial.None,
      dateTime: dateTime,
      value: Number(valueFloat),
      cpf: item.slice(19, 30),
      card: item.slice(30, 42),
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
    let listFinancialInformationModel: ListFinancialInformationModel = {
      financialInformations: [],
    };
    this.postListFinancialInformationUsecase.execute(listFinancialInformationModel).subscribe();
  }
  edit(e: any): void {
    console.log(e);
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
