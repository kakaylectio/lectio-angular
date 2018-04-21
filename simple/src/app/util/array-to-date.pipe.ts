import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'arrayToDate'
})
export class ArrayToDatePipe implements PipeTransform {

  transform(jacksonDate: number[]): Date {
 	  var theDate: Date;
  	 theDate = new Date();
	  if (jacksonDate.length >= 3) {
		  theDate.setFullYear(jacksonDate[0]);
		  theDate.setMonth(jacksonDate[1]-1);
		  theDate.setDate(jacksonDate[2]);
	  }
	  if (jacksonDate.length >= 6) {
		  theDate.setHours (jacksonDate[3]);
		  theDate.setMinutes(jacksonDate[4]);
		  theDate.setSeconds(jacksonDate[5]);
	  }
	  return theDate;
  }

}
