import * as FileSaver from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
export class LogUtils {

  static   isShow = true;

    public static showLog(txt:any){

        if(LogUtils.isShow){
            console.log(txt);
        }
    }

    public static saveAsFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: 'application/pdf' });
        FileSaver.saveAs(data, fileName);
      }

      public static saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: EXCEL_TYPE});
        FileSaver.saveAs(data, fileName);
      }
}