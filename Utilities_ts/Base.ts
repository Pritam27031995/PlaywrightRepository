import {Page, TestInfo } from "@playwright/test";
import exceljs, { Worksheet } from "exceljs";

export class Base {
    testInfo : TestInfo;
    page : Page;
    constructor(page : Page, testInfo : TestInfo) {
        this.testInfo = testInfo;
        this.page = page;
    }

    async takeScreenshot(ScreenshotName : string) {
        const screenshot = await this.page.screenshot();
        await this.testInfo.attach(ScreenshotName, { body: screenshot, contentType: 'Image/png' });
    }

    async testexcl(){
        let rownum: any;
        let colnum: any;
        let worksheet : any;
        const workbook = await new exceljs.Workbook();
        await workbook.xlsx.readFile("C:/Users/prita/Downloads/download.xlsx");
        worksheet = await workbook.getWorksheet('Sheet1');
        await worksheet.eachRow((row, rownumber)=>{
            row.eachCell((cell, cellnum)=>{
                if(cell.value==="Mango"){
                    rownum = rownumber;
                    colnum = cellnum;
                }
                
            })
        })
        const Finalcell=await worksheet.getCell(rownum,colnum);
        Finalcell.value= "Test";
        await workbook.xlsx.writeFile("C:/Users/prita/Downloads/download.xlsx");
    }
}

