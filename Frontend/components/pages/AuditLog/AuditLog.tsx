"use client"

import { useState, useEffect } from "react"
import type { AuditLog } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, CheckCircle, XCircle, Edit, Loader2, CloudFog } from "lucide-react"
import axiosConfig from "@/services/axiosConfig"
const actionConfig = {
   approved: { color: "bg-green-100 text-green-800", icon: CheckCircle },
   rejected: { color: "bg-red-100 text-red-800", icon: XCircle },
   edit: { color: "bg-blue-100 text-blue-800", icon: Edit },
}

export default function AuditPage() {
   type AuditLogResponse = {
      data: AuditLog[],
      pagination?: {
         totalPages?: number;
      };
   }

   const [logs, setLogs] = useState<AuditLogResponse["data"]>([])
   const [loading, setLoading] = useState(true)
   const [currentPage, setCurrentPage] = useState(1)
   const [totalPages, setTotalPages] = useState<AuditLogResponse["pagination"]>()

   const fetchLogs = async () => {
      setLoading(true)
      try {
         const response: AuditLogResponse = await axiosConfig.get(`/api/audit/fetchAudit?page=${currentPage}&limit=5`)

         // console.log(response.data)
         const data = response.data
         setLogs(data.data)
         setTotalPages(data.pagination.totalPages)
      } catch (error) {
         console.error("Failed to fetch audit logs:", error)
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      fetchLogs()
   }, [currentPage])

   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-3xl font-bold tracking-tight">Audit Trail</h1>
            <p className="text-muted-foreground">Track all administrative actions performed on listings</p>
         </div>

         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Actions
               </CardTitle>
               <CardDescription>Chronological log of all admin activities</CardDescription>
            </CardHeader>
            <CardContent>
               {loading ? (
                  <div className="flex justify-center items-center h-32">
                     <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
               ) : (
                  <div className="space-y-4">
                     {logs && logs.map((log) => {
                        const ActionIcon = actionConfig[log.action.toLowerCase() as keyof typeof actionConfig].icon
                        return (
                           <div key={log.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                              <div className="flex-shrink-0">
                                 <Badge className={actionConfig[log.action.toLowerCase() as keyof typeof actionConfig].color}>
                                    <ActionIcon className="h-3 w-3 mr-1" />
                                    {log.action}
                                 </Badge>
                              </div>
                              <div className="flex-1 min-w-0">
                                 <p className="text-sm font-medium">
                                    {log.action.toLowerCase()} listing #{log.car.title}
                                 </p>
                                 <p className="text-sm text-muted-foreground mt-1">{log.adminEmail}</p>
                                 <p className="text-xs text-muted-foreground mt-2">{new Date(log.submittedAt).toLocaleDateString('en-US', {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: '2-digit'

                                 })}</p>
                                 <p className="text-xs text-muted-foreground mt-2">{new Date(log.submittedAt).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                 })}</p>
                              </div>
                           </div>
                        )
                     })}
                  </div>
               )}
            </CardContent>
         </Card>

         <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
               Page {currentPage} of {totalPages}
            </p>
            <div className="space-x-2">
               <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
               >
                  Previous
               </Button>
               <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
               >
                  Next
               </Button>
            </div>
         </div>
      </div>
   )
}
