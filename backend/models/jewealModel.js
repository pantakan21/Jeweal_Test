import mongoose from "mongoose"

const jewealSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        amount: {
            type: Number,
        },
        weight: {
            type: Number,
        },
        price: {
            type: Number,
        },
        unit: {
            type: String,
        },
        priceBefore: {
            type: Number,
        },
        voucher: {
            type: Number,
        },
        totalPrice: {
            type: Number,
        },
    }
);

export const Jeweal = mongoose.model("jeweals", jewealSchema);