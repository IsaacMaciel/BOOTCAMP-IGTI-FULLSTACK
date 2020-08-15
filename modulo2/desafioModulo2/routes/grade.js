const express = require("express");
const router = express.Router();
const { promises } = require("fs");

const fs = promises;

const controller = require('../controllers/gradeController')

router.route('').post(controller.store)

router.route('/:id').put(controller.update).delete(controller.destroy).get(controller.show)

router.route('/:subject/:type').get(controller.gradesSubjectType)

router.route('/:subject/:type/better').get(controller.bestGrades)

router.route('/:student/:subject/students').get(controller.totalGradeStudent)

router.route((err,req,res,next)=> {
    res.status(500).send({error: err.message})
})

module.exports = router;