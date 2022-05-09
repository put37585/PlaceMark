import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserSpec = Joi.object()
.keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  _id: IdSpec,
  __v: Joi.number(),
})
.label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const PoiSpec = {
  name: Joi.string().required(),
  description: Joi.string().allow("").optional(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  categoryid: Joi.string().required(),
};

export const PoiFromCatSpec = {
  name: Joi.string().required(),
  description: Joi.string().allow("").optional(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
};

export const CategorySpec = {
  title: Joi.string().required(),
};