import express from "express";
import {Jeweal} from "../models/jewealModel.js"

const router = express.Router();

// Route for save new product
router.post("/", async(request, response) => {
    try {
        if(!request.body.title || !request.body.weight || !request.body.price) {
            return response.status(400).send({
                message: "Send all required fields"
            });
        }

        const newJeweal = {
            title: request.body.title,
            amount: request.body.amount,
            weight: request.body.weight,
            price: request.body.price,
            weight: request.body.weight,
            unit: request.body.unit,
            priceBefore: request.body.priceBefore,
            voucher: request.body.voucher,
            totalPrice: request.body.totalPrice,
        };

        const jeweal = await Jeweal.create(newJeweal);
        return response.status(201).send(jeweal);
    }
    catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for get all product
router.get("/", async(request, response) => {
    try {
        const jeweals = await Jeweal.find({});

        return response.status(200).json({
            count: jeweals.length,
            data: jeweals
        });
    }
    catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for get one product by id
router.get("/:id", async(request, response) => {
    try {
        const {id} = request.params;
        const jeweal = await Jeweal.findById(id);

        return response.status(200).json(jeweal);
    }
    catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for update a product
router.patch("/:id", async(request, response) => {
    try {
        const {id} = request.params;
        const updateData = request.body;
        const result = await Jeweal.findByIdAndUpdate(id, updateData, {new: true});

        if(!result) {
            return response.status(404).json({message: "Product not found"});
        }

        return response.status(200).send({message: "Product updated successfully", data: result});
    }
    catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for delete a product
router.delete("/:id", async(request, response) => {
    try {
        const {id} = request.params;
        const result = await Jeweal.findByIdAndDelete(id);

        if(!result) {
            return response.status(404).json({message: "Product not found"});
        }

        return response.status(200).send({message: "Product deleted successfully"});
    }
    catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;