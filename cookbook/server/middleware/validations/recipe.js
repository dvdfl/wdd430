const { check, param, validationResult } = require('express-validator');

exports.recipeValidation = [
    check('name', 'Name is required').not().isEmpty().bail().isLength(3),
    check('description', 'Description is required').not().isEmpty().bail().isLength(10),
    check('prep_time', 'Preparation time is required, must be numeric').isNumeric(),
    check('total_time', 'Total is required, must be numeric').isNumeric(),
    check('servings', 'Servings information is required, must be numeric').isNumeric(),
    check('meal_type', 'Meal type is required, must be numeric').not().isEmpty().bail().isLength(3),
    check('ingredients', 'Ingredients list is required').isLength(2),
    check('ingredients.*.qty', 'Ingredient quantity is required, must be numeric').isNumeric(),
    check('ingredients.*.name', 'Ingredient name is required').not().isEmpty().bail().isLength(3),
    check('prep_steps', 'Prep steps list is required').isLength(2),
    check('prep_steps.*.step', 'Prep step number is required, must be numeric').isNumeric(),
    check('prep_steps.*.description', 'Prep step description is required').not().isEmpty().bail().isLength(3),
];

//exports.recipeRouteValidation = [param('recipeId', 'Recipe Id value is invalid.').not().isEmpty().bail().isLength(24)]
exports.recipeRouteValidation = [param('recipeId', 'Recipe Id value is invalid.').not().isEmpty().bail().isNumeric()]

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

