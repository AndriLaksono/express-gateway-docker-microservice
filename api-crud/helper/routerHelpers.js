const Joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if(result.error) {
                return res.status(400).json(result.error);
            }
            if (!req.value) req.value = {};
            req.value['body'] = result.value;
            next();
        }
    },

    // == validasi 
    schemas: {
        upPassSchema: Joi.object().keys({
            password: Joi.string().required().min(7),
            id: Joi.string(),
        }),
    }
}