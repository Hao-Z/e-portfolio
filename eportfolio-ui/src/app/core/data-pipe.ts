import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from './services/data.service';

/**
 * Convert Object to array of keys.
 */
@Pipe({
  name: 'cvData'
})
export class DataPipe implements PipeTransform {

    constructor (private dataService: DataService) {
    }

    transform(value: string, dataclass: string): string {
        return this.dataService.getLabel(value, dataclass);
    }
    
}