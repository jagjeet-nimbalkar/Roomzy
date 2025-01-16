// the schema for server side validation
const Joi = require("joi");

module.exports.listingSchema=Joi.object({
    listing:Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image:Joi.string().allow("",null),
    price:Joi.number().required().min(0),
    country:Joi.string().required(),
    location:Joi.string().required()
    }).required()
})

module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required().max(5).min(0),
        comment:Joi.string().required()
    }).required()
})