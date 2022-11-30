export interface IEmployee {
    id:number, 
    employeeCode:string, 
    companyCode:string, 
    firstname:string, 
    lastname:string, 
    employeeEmail:string, 
    birthdate:Date, 
    startdate:Date,
    terminationDate?:Date
}