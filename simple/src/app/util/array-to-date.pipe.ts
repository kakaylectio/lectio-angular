import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'arrayToDate'
})
export class ArrayToDatePipe implements PipeTransform {

  transform(jacksonDate: number[]): Date {
 	  var theDate: Date;
  	 theDate = new Date();
	  if (jacksonDate.length >= 3) {
		  theDate.setUTCFullYear(jacksonDate[0]);
		  theDate.setUTCMonth(jacksonDate[1]-1);
		  theDate.setUTCDate(jacksonDate[2]);
	  }
	  if (jacksonDate.length >= 6) {
		  theDate.setUTCHours (jacksonDate[3]);
		  theDate.setUTCMinutes(jacksonDate[4]);
		  theDate.setUTCSeconds(jacksonDate[5]);
	  }
	  return theDate;
  }

}
