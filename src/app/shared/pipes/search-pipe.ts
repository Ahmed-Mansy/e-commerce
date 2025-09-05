import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../features/home/models/product.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arr: any[], word: string): any[] {
    return arr.filter((item) => item.title.toLowerCase().includes(word.toLowerCase()));
  }

}
