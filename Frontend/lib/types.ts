export interface CarListing {
  id: string
  title: string
  description: string
  make: string
  model: string
  year: number
  pricePerDay: number
  location: string
  imageUrl: string
  status: "pending" | "approved" | "rejected"
  submittedBy: string
  submittedAt: string
  reviewedBy?: string
  reviewedAt?: string
  features: string[]
}

export interface AuditLog {
  id: number
  action: "approved" | "rejected" | "edit"
  adminEmail: string
  car: {
    id: string
    title: string
  }
  car_id: number
  submittedAt: string
}

export type ListingStatus = "all" | "pending" | "approved" | "rejected"
