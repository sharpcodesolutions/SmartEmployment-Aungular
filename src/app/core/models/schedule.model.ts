import { TimeSpan } from "./timespan";

export interface ISchedule {
    id:number, 
    date:Date,
    dayIndex:number,
    startTime:Date,
    endTime:Date, 
    hours?:number, 
    comments?:string, 
    employeeId:number, 
    taskId?:number
}

export interface IAllSchedules {
    id:number, 
    date?:Date,
    dayIndex?:number,
    startTime?:Date,
    endTime?:Date, 
    hours?:number, 
    comments?:string, 
    employeeId:number, 
    taskId?:number,
    active:boolean
}
