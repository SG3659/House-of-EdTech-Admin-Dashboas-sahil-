"use client"

import { useState, useEffect } from "react"
import type { CarListing, ListingStatus } from "@/lib/types"
import { ListingsTable } from "@/components/listings-table"
import { EditListingDialog } from "@/components/edit-listing-dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNotification } from "@/contexts/notification-context"
import { Loader2 } from "lucide-react"
import axiosConfig from "@/services/axiosConfig"
import authAxiosConfig from "@/services/authAxiosConfig"
export default function ListingsPage() {
   const [listings, setListings] = useState<CarListing[]>([])
   const [loading, setLoading] = useState(true)
   const [currentPage, setCurrentPage] = useState(1)
   const [totalPages, setTotalPages] = useState(1)
   const [statusFilter, setStatusFilter] = useState<ListingStatus>("all")
   const [editingListing, setEditingListing] = useState<CarListing | null>(null)
   const { addNotification } = useNotification()

   const fetchListings = async () => {
      setLoading(true)
      try {
         const response = await axiosConfig.get(`/api/cars/fetchCar?page=${currentPage}&limit=10&status=${statusFilter}`)
         const data = response.data as {
            data: CarListing[]
         }

         setListings(data.data)
         setTotalPages(data.pagination.totalPages)
      } catch (error) {
         addNotification({
            type: "error",
            title: "Error",
            message: "Failed to fetch listings",
         })
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      fetchListings()
   }, [currentPage, statusFilter])
   const admin = localStorage.getItem("admin-user")
   // console.log(admin)
   const parsedAdmin = JSON.parse(admin || "{}");
   const adminEmail = parsedAdmin.user.email;
   // console.log("Admin Email:", adminEmail);

   const handleStatusChange = async (listingId: string, action: "APPROVED" | "REJECTED", adminEmail: string, car_id: string) => {
      try {
         const response = await authAxiosConfig.post(`/api/audit/editAudit/${listingId}`, { action, adminEmail, car_id })

         if (response.status === 200) {
            addNotification({
               type: "success",
               title: "Success",
               message: `Listing ${action.toLowerCase()} successfully`,
            })
            fetchListings()
         }
      } catch (error) {
         addNotification({
            type: "error",
            title: "Error",
            message: `Failed to ${action.toLowerCase()} listing`,
         })
      }
   }

   const handleEdit = (listing: CarListing) => {
      setEditingListing(listing)
   }

   const handleEditSave = async (updatedListing: CarListing) => {
      try {
         const response = await authAxiosConfig.patch(`http://localhost:8000/api/cars/editCar/${updatedListing.id}`, {...updatedListing})

         if (response.status == 200)   {
            addNotification({
               type: "success",
               title: "Success",
               message: "Listing updated successfully",
            })
            setEditingListing(null)
            fetchListings()
         }
      } catch (error) {
         addNotification({
            type: "error",
            title: "Error",
            message: "Failed to update listing",
         })
      }
   }

   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <div>
               <h1 className="text-3xl font-bold tracking-tight">Listings Management</h1>
               <p className="text-muted-foreground">Review and manage car rental listings</p>
            </div>
            <Select
               value={statusFilter}
               onValueChange={(value: ListingStatus) => {
                  setStatusFilter(value)
                  setCurrentPage(1)
               }}
            >
               <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="all">All Listings</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
               </SelectContent>
            </Select>
         </div>

         {loading ? (
            <div className="flex justify-center items-center h-64">
               <Loader2 className="h-8 w-8 animate-spin" />
            </div>
         ) : (
            <ListingsTable
               listings={listings}
               onApprove={(id) => handleStatusChange(id, "APPROVED", adminEmail, id)}
               onReject={(id) => handleStatusChange(id, "REJECTED", adminEmail, id)}
               onEdit={handleEdit}
            />
         )}

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

         {editingListing && (
            <EditListingDialog
               listing={editingListing}
               open={!!editingListing}
               onClose={() => setEditingListing(null)}
               onSave={handleEditSave}
            />
         )}
      </div>
   )
}
