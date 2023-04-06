const { check, param, validationResult } = require('express-validator');

exports.unitOfMeasureValidation = [
    check('name', 'Name is required').not().isEmpty().bail().isLength(3),
    check('abbreviation', 'Abbreviation  is required').not().isEmpty(),
];

exports.unitOfMeasureRouteValidation = [param('unitId', 'Unit Id value is invalid.').not().isEmpty().bail().isLength(24)]

exports.validateRequest = (req, res, next) => {
    const result = validationResult(req).array();
    
    if (!result.length) return next();
    
    const errors = [];
    result.forEach((i)=> errors.push(i.msg))
    //console.log(errors);
    //const error = result[0].msg;
    res.status(400)
    res.json({ message: "Validation failed", errors });
  };

