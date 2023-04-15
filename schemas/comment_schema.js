const Joi = require("joi");

const validComment = data => {
  const schema = {
    comment: Joi.string()
      .min(1)
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(data, schema);
};

module.exports.validComment = validComment;
