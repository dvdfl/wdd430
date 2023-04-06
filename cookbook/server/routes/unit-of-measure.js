const express = require('express')
const router = express.Router()
const controller = require("../controllers/unit-of-measure")
//validation
const { validateRequest, unitOfMeasureValidation, unitOfMeasureRouteValidation } = require("../middleware/validations/unit-of-measure")

//resolving route with controller method 
router.get('/', controller.getAll)
router.get('/:unitId', unitOfMeasureRouteValidation, validateRequest, controller.getById)
router.post('/', unitOfMeasureValidation, validateRequest, controller.createUnitOfMeasure)
router.put('/:unitId', [unitOfMeasureRouteValidation,unitOfMeasureValidation], validateRequest, controller.updateUnitofMeasure)
router.delete('/:unitId', unitOfMeasureRouteValidation, validateRequest, controller.deleteById)


module.exports = router;