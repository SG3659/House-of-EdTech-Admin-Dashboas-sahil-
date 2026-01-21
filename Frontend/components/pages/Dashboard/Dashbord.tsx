"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, CheckCircle, Clock, XCircle } from "lucide-react"
import axios from "axios"
import { useEffect, useState } from "react"
import axiosConfig from "@/services/axiosConfig"

export default function DashboardPage() {
   type FetchCarResponse = {
      pagination?: {
         total?: number;
         pending?: number;
         approved?: number;
         rejected?: number;
      };
   };

   const [stats, setStats] = useState<FetchCarResponse["pagination"]>()

   const fetcStats = async () => {
      try {
         const response = await axiosConfig.get<FetchCarResponse>('/api/cars/fetchCar?limit=1&page=1&status=all')
         // console.log(response.data?.pagination)
         setStats(response.data?.pagination)
         // Process the data as needed
      } catch (error) {
         console.error('Error fetching stats:', error)
      }
   }

   useEffect(() => {
      fetcStats()
   }, [])

   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Overview of car rental listings and admin activities</p>
         </div>

         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
                  <Car className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">{stats?.total}</div>
                  <p className="text-xs text-muted-foreground">All submitted listings</p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-600" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">{stats?.pending}</div>
                  <p className="text-xs text-muted-foreground">Awaiting approval</p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Approved</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">{stats?.approved}</div>
                  <p className="text-xs text-muted-foreground">Live on platform</p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                  <XCircle className="h-4 w-4 text-red-600" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">{stats?.rejected}</div>
                  <p className="text-xs text-muted-foreground">Did not meet standards</p>
               </CardContent>
            </Card>
         </div>


      </div>
   )
}
