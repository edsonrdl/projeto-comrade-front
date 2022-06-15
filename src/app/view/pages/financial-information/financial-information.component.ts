import { Component, OnInit } from '@angular/core';
import { GetAllFinancialInformationUsecase } from '../../../core/usecases/financial-information/get-all-airplane.usecase';
import { FinancialInformationModel } from '../../../core/models/financial-information.model';
import { PageResultModel } from '../../../core/utils/responses/page-result.model';

@Component({
  selector: 'app-financial-information',
  templateUrl: 'financial-information.component.html',
  styleUrls: ['financial-information.component.scss'],
  providers: [],
})
export class FinancialInformationComponent implements OnInit {
  dataSource!: FinancialInformationModel[];
  fileName!: String;
  stringArray!: String[];
  constructor(private getAllFinancialInformation: GetAllFinancialInformationUsecase) {}

  ngOnInit(): void {
    this.getAllFinancialInformation
      .execute({ pageSize: 20, pageNumber: 1 })
      .subscribe((grid: PageResultModel<FinancialInformationModel>) => {
        this.dataSource = grid.data!;
      });
  }

  onFileSelected(event: any) {
    console.log('entrou na onFileSelected');
    const file: File = event.target.files[0];
    this.fileName = file.name;
    let fileReader = new FileReader();

    fileReader.onloadend = (e) => {
      console.log(fileReader.result);
      const arr = [fileReader.result];
      // arr.toString();
      console.log(arr);
      const teste = arr.toString();
      //var myString = arr;
      var splits = teste?.split('\n');

      console.log(splits);
      console.log(splits.length);

      // this.stringArray = arr.;
      console.log(this.stringArray);
    };
    fileReader.readAsText(file);
  }
}
