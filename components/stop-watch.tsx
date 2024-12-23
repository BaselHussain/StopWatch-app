"use client";
import { useState, useEffect } from "react"; 
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"; 
import { Button } from "@/components/ui/button"; 
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

type LapTime=number;


export default function StopWatchComponent() {


const [isRunning,setIsRunning]=useState<boolean>(false)
const [time,setTime]=useState<number>(0)
const [lapTimes,setLapTimes]=useState<LapTime[]>([])

useEffect(()=>{
let interval:NodeJS.Timeout
if(isRunning){
interval=setInterval(()=>{
    setTime((prevTime)=>prevTime+10)
},10)
}
return ()=>clearInterval(interval)
},[isRunning])

const hanldeStart=()=>{
    setIsRunning(true)
}
const handleStop=()=>{
    setIsRunning(false)
}
const handleReset=()=>{
    setIsRunning(false)
    setTime(0)
    setLapTimes([])
}
const handleLapTimes=()=>{
    setLapTimes((prevLapTime)=>[...prevLapTime,time])
}

const minutes=Math.floor(time / 60000)
const seconds=Math.floor((time % 60000) / 1000)
const milliSeconds=Math.floor((time  % 1000)/10)
return(
    <>
    <div className="flex  justify-center items-center h-screen bg-gradient-to-tr from-[#f5e93e] to-[#69280e]">
<Card className="w-full max-w-lg">
<CardHeader>
    <CardTitle className="text-center text-5xl  ">Stop Watch</CardTitle>
    <CardDescription className="text-center text-lg">Track your time with this stop watch</CardDescription>
</CardHeader>
<CardContent className="flex flex-col items-center justify-center gap-8">
    <div className="text-7xl font-bold">
        {minutes.toString().padStart(2,"0")}:
        {seconds.toString().padStart(2,"0")}.
        {milliSeconds.toString().padStart(2,"0")}
    </div>
    <div className="flex items-center gap-4">
        <Button onClick={isRunning?handleStop:hanldeStart}>{isRunning?"Stop":"Start"}</Button>
        <Button onClick={handleReset}>Reset</Button>
        <Button onClick={handleLapTimes}>Lap</Button>
    </div>

    <div className="w-full max-w-md">
        <Card>
            <CardHeader className="bg-gray-200 ">
               <CardTitle>Lap Times</CardTitle>
                </CardHeader>
                <CardContent className="max-h-[300px] overflow-auto p-0">
<Table>
    <TableHeader>
        <TableRow>
            <TableHead className="text-left">Lap</TableHead>
            <TableHead className="text-right">Time</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {lapTimes.map((lapTime,index)=>(
            <TableRow key={index}>
<TableCell className="font-medium">
    {index+1}
</TableCell>
<TableCell className="text-right">
{Math.floor(lapTime/60000).toString().padStart(2,"0")}:
{Math.floor((lapTime % 60000)/1000).toString().padStart(2,"0")}:
{Math.floor((lapTime  % 1000)/10).toString().padStart(2,"0")}

</TableCell>
            </TableRow>
        ))}
    </TableBody>
</Table>
                </CardContent>
        </Card>

    </div>

</CardContent>
</Card>
    </div>
    </>
)

}
