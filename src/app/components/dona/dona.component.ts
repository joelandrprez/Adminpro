import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label ,Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent  {
  @Input() titulo:string = 'sin titulo';
  @Input('labels') labels:string[]=['label 56', 'label 2', 'label 3'];
  @Input('data')  doughnutChartData: MultiDataSet = [
    [10, 15, 50]
  ];
  public colors : Color[]=[
    {backgroundColor:['#6857E6','#009FEE','#F02059']}
  ]

}
