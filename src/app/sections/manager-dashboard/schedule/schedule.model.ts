import { TimeSpan } from "../../models/timespan";

export interface ISchedule {
    id:number, 
    date:Date,
    startTime:TimeSpan,
    endTime:TimeSpan, 
    hours:number, 
    comments:string, 
    employeeId:number, 
    taskId:number
}