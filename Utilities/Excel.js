const exceljs = require('exceljs');

async function testexcl(){
    let rownum;
    let colnum;
    const workbook = await new exceljs.Workbook();
    await workbook.xlsx.readFile("C:/Users/prita/Downloads/download.xlsx");
    const worksheet = await workbook.getWorksheet('Sheet1');
    await worksheet.eachRow((row, rownumber)=>{
        row.eachCell((cell, cellnum)=>{
            if(cell.value==="Mango"){
                rownum = rownumber;
                colnum = cellnum;
            }
            
        })
    })
    const Finalcell=await worksheet.getCell(rownum,colnum)
    Finalcell.value= "Test";
    await workbook.xlsx.writeFile("C:/Users/prita/Downloads/download.xlsx");
}

testexcl();