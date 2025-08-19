"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToLetListingsRouter = void 0;
const express_1 = require("express");
const ToLetListings_controller_1 = require("./ToLetListings.controller");
const ImageSendToCloudinary_1 = require("../../util/ImageSendToCloudinary");
const route = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: ToLetListings
 *   description: API for managing to-let property listings
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     ToLetListing:
 *       type: object
 *       required:
 *         - propertyType
 *         - bedroom
 *         - bathroom
 *         - balcony
 *         - availability
 *         - city
 *         - district
 *         - area
 *         - rent
 *         - advance
 *         - noticePeriod
 *         - ownerName
 *         - ownerEmail
 *         - phone
 *         - preferredContact
 *       properties:
 *         propertyType:
 *           type: string
 *           example: sublet
 *         bedroom:
 *           type: number
 *           example: 3
 *         bathroom:
 *           type: number
 *           example: 2
 *         balcony:
 *           type: number
 *           example: 1
 *         size:
 *           type: number
 *           example: 1200
 *         availability:
 *           type: string
 *           example: "2025-08-01"
 *         description:
 *           type: string
 *           example: "Spacious flat with great ventilation."
 *         street:
 *           type: string
 *           example: "House-12, Road-5"
 *         city:
 *           type: string
 *           example: "Dhaka"
 *         district:
 *           type: string
 *           example: "Dhaka"
 *         area:
 *           type: string
 *           example: "Dhanmondi"
 *         rent:
 *           type: number
 *           example: 30000
 *         advance:
 *           type: number
 *           example: 60000
 *         noticePeriod:
 *           type: number
 *           example: 2
 *         electricity:
 *           type: boolean
 *           example: true
 *         gas:
 *           type: boolean
 *           example: true
 *         water:
 *           type: boolean
 *           example: true
 *         rentNegotiable:
 *           type: boolean
 *           example: false
 *         internet:
 *           type: boolean
 *           example: true
 *         security:
 *           type: boolean
 *           example: true
 *         swimmingPool:
 *           type: boolean
 *           example: false
 *         furnished:
 *           type: boolean
 *           example: false
 *         parking:
 *           type: boolean
 *           example: true
 *         intercom:
 *           type: boolean
 *           example: false
 *         childrenPlayArea:
 *           type: boolean
 *           example: false
 *         lift:
 *           type: boolean
 *           example: true
 *         servantQuarter:
 *           type: boolean
 *           example: false
 *         waterHeater:
 *           type: boolean
 *           example: false
 *         generator:
 *           type: boolean
 *           example: true
 *         fitnessCenter:
 *           type: boolean
 *           example: false
 *         ac:
 *           type: boolean
 *           example: false
 *         ownerName:
 *           type: string
 *           example: "Mr. Rahman"
 *         ownerEmail:
 *           type: string
 *           example: "rahman@example.com"
 *         phone:
 *           type: string
 *           example: "+8801712345678"
 *         preferredContact:
 *           type: string
 *           example: email
 */
/**
 * @swagger
 * /api/to-letListings:
 *   post:
 *     summary: Create a new to-let listing
 *     tags: [ToLetListings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ToLetListing'
 *     responses:
 *       201:
 *         description: Listing created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ToLetListing'
 *       400:
 *         description: Bad request
 */
/**
 * @swagger
 * /api/to-letListings:
 *   get:
 *     summary: Get all to-let listings
 *     tags: [ToLetListings]
 *     responses:
 *       200:
 *         description: List of all to-let listings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ToLetListing'
 */
/**
 * @swagger
 * /api/to-letListings/{id}:
 *   get:
 *     summary: Get a single to-let listing by ID
 *     tags: [ToLetListings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the to-let listing
 *     responses:
 *       200:
 *         description: Listing found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ToLetListing'
 *       404:
 *         description: Listing not found
 */
/**
 * @swagger
 * /api/to-letListings/{id}:
 *   patch:
 *     summary: Update a to-let listing by ID
 *     tags: [ToLetListings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the to-let listing to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ToLetListing'
 *     responses:
 *       200:
 *         description: Listing updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ToLetListing'
 *       404:
 *         description: Listing not found
 */
/**
 * @swagger
 * /api/to-letListings/{id}:
 *   delete:
 *     summary: Delete a to-let listing by ID
 *     tags: [ToLetListings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the to-let listing to delete
 *     responses:
 *       200:
 *         description: Listing deleted successfully
 *       404:
 *         description: Listing not found
 */
route.post("/", ImageSendToCloudinary_1.upload.array("propertyImages", 10), 
// (req: Request, res: Response, next: NextFunction) => {
//   console.log("hhjhj", req);
//   req.body = JSON.parse(req.body);
//   console.log(req.body);
//   next();
// },
//schemaValidation(toLetListingValidation.createToLetListingValidationSchema),
ToLetListings_controller_1.ToLetListingsController.createToLetListings);
route.get("/", ToLetListings_controller_1.ToLetListingsController.getAllToLetListings);
route.get("/:id", ToLetListings_controller_1.ToLetListingsController.getSingleToLetListings);
route.patch("/:id", ToLetListings_controller_1.ToLetListingsController.updateToLetListings);
route.delete("/:id", ToLetListings_controller_1.ToLetListingsController.deleteToLetListings);
exports.ToLetListingsRouter = route;
