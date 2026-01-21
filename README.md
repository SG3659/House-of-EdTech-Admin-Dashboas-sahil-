# House-of-EdTech-Admin-Dashboas-sahil-
## Current Functionality:
    ->  Full fledge  
    ->  Dashboard of task Pending, Approved, Rejected.
    ->  Listing 
    ->  Aduit for maintainig what task hase done
    
## Future Functionality:
    -> Implement a Ceo Dashbord Handle & Create All Admin Account. 

| Route | Method | Description |
|-------|-------------|----------|
| /user/signup          | `POST`  | create Admin Email (eg:name@example.com)     |
| /cars/createCar       | `POST`  | Create Car Details to show in listing        |
| /cars/fetchCar        | `GET`   | Fetch all Car Details                        |
| /cars/fetchCar/:id    | `GET`   | Fetch Single Car Details by ID               |
| /cars/editCar/:id     | `PATCH` | Edit Car Details (Auth & RateLimited Route)  |
| /audit/fetchAudit     | `GET`   | Fetch all Audit Entries                      |
| /audit/editAudit/:id  | `POST`  | Edit Audit Entry by ID (Auth & RateLimited)  |


This is json example for Admin Email register
{
  "name":"oneClickDrive",
  "email": "_name@example.com",
  "password": "abd" ("min 8 length")
}

This is json example for Car Listing

  {
  "title": "2024 Honda Civic - Reliable Compact",
  "description": "Fuel-efficient and reliable car perfect for city driving.",
  "make": "Honda",
  "model": "Civic",
  "year": 2025,
  "pricePerDay": 150,
  "location": "Chicago",
  "imageUrl": "/placeholder.svg?height=200&width=300",
  "features": [ "Fuel Efficient", "Backup Camera", "Bluetooth", "USB Ports"]
}

Prisma SetUp:
DATABASE_URL="postgresql://postgres:password@localhost:5432/Database_name?schema=public"
