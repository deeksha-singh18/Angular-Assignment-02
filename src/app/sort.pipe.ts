import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure:false
})


export class SortPipe implements PipeTransform {

  transform(value: any,stock:string):any {
    return value.sort((a,b) => {
      return a.stock-b.stock;
    });
  
  }


}

