import { TimeSpan } from "../../models/timespan";

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