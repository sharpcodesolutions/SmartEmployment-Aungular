export interface IEmployee {
    id:number, 
    employeeCode:string, 
    companyCode:string, 
    firstname:string, 
    lastname:string, 
    employeeEmail:string, 
    birthDate:Date, 
    startDate:Date,
    terminationDate?:Date
}