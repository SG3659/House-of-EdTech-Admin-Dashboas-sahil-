"use client"

import type { CarListing } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle, Edit, Clock, DollarSign, MapPin } from "lucide-react"
import Image from "next/image"

interface ListingsTableProps {
  listings: CarListing[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
  onEdit: (listing: CarListing) => void
}

const statusConfig = {
  pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
  approved: { color: "bg-green-100 text-green-800", icon: CheckCircle },
  rejected: { color: "bg-red-100 text-red-800", icon: XCircle },
}

export function ListingsTable({ listings, onApprove, onReject, onEdit }: ListingsTableProps) {
  // console.log(listings)

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings && (listings.map((listing) => {
              const StatusIcon = statusConfig[listing.status.toLowerCase() as keyof typeof statusConfig].icon

              return (
                <TableRow key={listing.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Image
                        src={listing.imageUrl || "/placeholder.svg"}
                        alt={listing.title}
                        width={60}
                        height={40}
                        className="rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium">{listing.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {listing.year} {listing.make} {listing.model}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {listing.location}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span className="font-medium">{listing.pricePerDay}/day</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusConfig[listing.status.toLowerCase() as keyof typeof statusConfig].color}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {listing.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {listing.submittedAt
                      ? (
                        <>
                          <p className="text-sm">
                            {new Date(listing.submittedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit'
                            })}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(listing.submittedAt).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">N/A</p>
                      )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {listing.status.toUpperCase() === "PENDING" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 border-green-200 hover:bg-green-50 bg-transparent"
                            onClick={() => onApprove(listing.id)}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approve
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                            onClick={() => onReject(listing.id)}
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline" onClick={() => onEdit(listing)}>
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            }))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
