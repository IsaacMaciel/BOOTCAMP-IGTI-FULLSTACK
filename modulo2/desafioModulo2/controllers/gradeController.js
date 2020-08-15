const { promises } = require("fs");

const fs = promises;

const loadGrades = async () => {
  const grades = JSON.parse(await fs.readFile(filename));

  return grades;
};

module.exports = {
  async store(req, res, next) {
    try {
      const { student, subject, type, value } = req.body;
      const timestamps = new Date();

      const data = await loadGrades();
      let grades = {
        id: data.nextId++,
        student,
        subject,
        type,
        value,
        timestamps,
      };
      data.grades.push(grades);

      await fs.writeFile(filename, JSON.stringify(data, null, 2));

      res.send(grades);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { student, subject, type, value } = req.body;
      const { id } = req.params;
      const data = await loadGrades();

      const findRegiserIndex = data.grades.findIndex(
        (grade) => grade.id === +id
      );
      const [findRegister] = data.grades.filter((grades) => grades.id === +id);

      if (findRegiserIndex === -1) throw new Error("A nota não existe");

      student
        ? (data.grades[findRegiserIndex].student = student)
        : (data.grades[findRegiserIndex].student = findRegister.student);
      subject
        ? (data.grades[findRegiserIndex].subject = subject)
        : (data.grades[findRegiserIndex].subject = findRegister.subject);
      type
        ? (data.grades[findRegiserIndex].type = type)
        : (data.grades[findRegiserIndex].type = findRegister.type);
      value
        ? (data.grades[findRegiserIndex].value = value)
        : (data.grades[findRegiserIndex].value = findRegister.value);

      await fs.writeFile(filename, JSON.stringify(data, null, 2));
      res.end();
    } catch (error) {
      next(error);
    }
  },

  async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const data = await loadGrades();
      const findRegiser = data.grades.findIndex((grade) => grade.id === +id);
      if (findRegiser === -1) throw new Error("A nota não existe");

      data.grades = data.grades.filter((grade) => grade.id !== +id);
      await fs.writeFile(filename, JSON.stringify(data, null, 2));
      res.end();
    } catch (error) {
      next(error);
    }
  },
  async show(req, res, next) {
    try {
      const { id } = req.params;
      const data = await loadGrades();
      const grade = data.grades.filter((grade) => grade.id === +id);

      if (grade.length === 0) throw new Error("A nota procurada não existe");

      return res.status(200).json(grade);
    } catch (error) {
      next(error);
    }
  },

  async gradesSubjectType(req, res, next) {
    try {
      const { subject, type } = req.params;
      const data = await loadGrades();

      const subjectType = data.grades.filter(
        (grade) => grade.subject === subject && grade.type === type
      );

      const total = subjectType.reduce((acumulator, current) => {
        return acumulator + current.value;
      }, 0);

      const media = total / subjectType.length;

      return res.status(200).json(media);
    } catch (error) {
      next(error);
    }
  },

  async bestGrades(req, res, next) {
    try {
      const { subject, type } = req.params;
      const data = await loadGrades();

      const subjectType = data.grades
        .filter((grade) => grade.subject === subject && grade.type === type)
        .sort((a, b) => b.value - a.value)
        .slice(0, 3);

      return res.status(200).json(subjectType);
    } catch (error) {
      next(error);
    }
  },

  async totalGradeStudent(req, res, next) {
    try {
      const { student, subject } = req.params;

      console.log(req.params);
      const data = await loadGrades();

      const json = data.grades.filter(
        (grade) => grade.student === student && grade.subject === subject
      );

      console.log(json);

      const total = json.reduce((acumulator, current) => {
        return acumulator + current.value;
      }, 0);

      return res.status(200).json(total);
    } catch (error) {
      next(error);
    }
  },
};
