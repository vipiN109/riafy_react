const express = require("express");
var router = express.Router();
const Joi = require("joi");
const { create_bookmark, get_bookmarks } = require("../Controller/bookmark");

router.post("/create_bookmark", joiValidation, create_bookmark);
router.get("/get_bookmarks", get_bookmarks);

function joiValidation(req, res, next) {
  // create bookmark
  const create_bookmark = Joi.object({
    title: Joi.string().required(),
    url: Joi.string().uri().required(),
  });
 //fetch bookmark
  const get_bookmarks = Joi.object({
    search: Joi.string().optional().allow(""),
    skip: Joi.string().uri().required(),
    limit: Joi.string().uri().required(),
  });

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  // processing validation for the paths that matches
  if (req.path == "/create_bookmark")
    var { error, value } = create_bookmark.validate(req.body, options);
  if (req.path == "/get_bookmarks")
    var { error, value } = get_bookmarks.validate(req.query, options);

  if (error) {
    // returning the error if there is anything
    return res.json({
      status: false,
      code: 201,
      message: `${error.details.map((x) => x.message.replace(/"/g, ""))[0]}`,
    });
  } else {
    req.body = value;
    next();
  }
}

module.exports = router;
