import prisma from "../config/dbconfig.js";
import { errorHandler } from "../utils/error.js";

export const createCarInfo = async (req, res, next) => {
  try {
    const {
      title,
      description,
      make,
      model,
      year,
      pricePerDay,
      location,
      features,
      imageUrl,
    } = req.body;
    if (
      !title ||
      !description ||
      !make ||
      !model ||
      !year ||
      !pricePerDay ||
      !location ||
      !imageUrl
    ) {
      return next(errorHandler(400, "All fields are required"));
    }
    const newCar = await prisma.car.create({
      data: {
        title,
        description,
        make,
        model,
        year: Number(year),
        pricePerDay: Number(pricePerDay),
        location,
        features: features || [],
        imageUrl,
      },
    });
    return res
      .status(201)
      .json({ message: "Car created successfully", data: newCar });
  } catch (error) {
    next(error);
  }
};
export const fetchCars = async (req, res, next) => {
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;
  const status = String(req.query.status?.toUpperCase());

  if (page <= 0) page = 1;
  if (limit <= 0 || limit > 100) limit = 10;

  const skip = (page - 1) * limit;
  const whereClause = status && status !== "ALL" ? { status } : {};

  try {
    const cars = await prisma.car.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        id: "desc",
      },
    });

    const total = await prisma.car.count({
      where: whereClause,
    });
    const pending = await prisma.car.count({
      where: {
        status: "PENDING",
      },
    });
    const approved = await prisma.car.count({
      where: {
        status: "APPROVED",
      },
    });
    const rejected = await prisma.car.count({
      where: {
        status: "REJECTED",
      },
    });

    return res.status(200).json({
      data: cars,
      pagination: {
        page,
        limit,
        total,
        pending,
        approved,
        rejected,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const editCarInfo = async (req, res, next) => {
  const car_id = req.params.id;
  const {
    title,
    description,
    make,
    model,
    year,
    pricePerDay,
    location,
    features,
  } = req.body;
  const update = {};
  if (title !== undefined) update.title = title;
  if (description !== undefined) update.description = description;
  if (make !== undefined) update.make = make;
  if (model !== undefined) update.model = model;

  if (year !== undefined) update.year = year;
  if (pricePerDay !== undefined) update.pricePerDay = pricePerDay;
  if (location !== undefined) update.location;
  if (features !== undefined) update.features = features;

  // if(status !==undefined){
  //   const validate=["APPROVED", "PENDING","REJECTED"];
  //   if(!validate.includes(status.toUpperCase())){
  //     return res.status(400).json({ error: 'Invalid status value' });
  //   }
  //   update.status = status.toUpperCase().trim();
  // }
  if (Object.keys(update).length === 0) {
    return next(errorHandler(400, "No valid fields to update"));
  }
  try {
    const car = await prisma.car.update({
      where: {
        id: Number(car_id),
      },
      data: update,
    });
    return res
      .status(200)
      .json({ message: "Car updated successfully", data: car });
  } catch (error) {
    next(error);
  }
};
export const fetchCarByID = async (req, res, next) => {
  const car_id = req.params.id;
  try {
    const car = await prisma.car.findUnique({
      where: {
        id: Number(car_id),
      },
    });
    if (!car) {
      return next(errorHandler(404, "Car not found"));
    }
    return res.status(200).json({ data: car });
  } catch (error) {
    next(error);
  }
};
