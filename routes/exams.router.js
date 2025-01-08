const express = require('express');

function examsRouter(io) {
  const router = express.Router();
  const { configureUpload } = require('./../middleware/configureUpload.js');
  const Exam = require("../services/exams.service.js");
  const exam = new Exam();


  // Ruta para crear un nuevo examen
  router.post('/',configureUpload, async (req, res) => {
    const uploadMiddleware = req.upload.any();
    uploadMiddleware(req, res, async (err) =>{
      if (err) {
            return next(Boom.badRequest(err.message));
          }
          try {
            const newExam = await exam.create(req.body);
            if (!newExam) {
              return res.status(400).json({ success: false, message: 'Usuario no encontrado' });
            }
            io.emit('new-exam', {id:newExam.id});
            res.status(201).json({
              success: true,
              message: 'Nuevo registro creado!',
              data: newExam
            });
          } catch (error) {
            res.status(500).json({ success: false, message: 'Ocurrió un error', error: error.message });
          }
    })

  });

  // Ruta para obtener todos los exámenes de un año
  router.get('/get-all/:year', async (req, res) => {
    try {
      const { year } = req.params;
      const exams = await exam.getAll(year);
      if (!exams) {
        return res.status(400).json({ success: false, message: 'No hay exámenes para este año' });
      }
      res.status(200).json({
        success: true,
        message: 'Lista de exámenes',
        data: exams
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Ocurrió un error', error: error.message });
    }
  });

   // Ruta para obtener todos los exámenes de un año
   router.get('/get-one/:year/:id', async (req, res) => {
    try {
      const { year,id } = req.params;
      const exams = await exam.getOne(year,id);
      if (!exams) {
        return res.status(400).json({ success: false, message: 'No hay exámenes para este año' });
      }
      res.status(200).json({
        success: true,
        message: 'Lista de exámenes',
        data: exams
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Ocurrió un error', error: error.message });
    }
  });

  // Ruta para agregar jueces a un examen
  router.post('/exam/:year/:id/judges', async (req, res) => {
    try {
      const { year, id } = req.params;
      const judges = req.body;
      const examen = await exam.addJudges(year, id, judges);
      if (!examen) {
        return res.status(400).json({ success: false, message: 'Examen no encontrado' });
      }
      // Emitir el evento para que todos los clientes conectados reciban la actualización
      io.emit('new-judge', examen);
      res.status(200).json({
        success: true,
        message: 'Jueces agregados',
        data: examen
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Ocurrió un error', error: error.message });
    }
  });
  //Ruta para agregar calificacion de un juez
  router.patch('/exam/:year/:id/judges/:idJ', async (req, res) => {
    try {
      const { year, id, idJ} = req.params;
      const cal = req.body;
      const calificacion = await exam.addCalJudge(year, id,idJ, cal);
      if (!calificacion) {
        return res.status(400).json({ success: false, message: 'Examen no encontrado' });
      }
      // Emitir el evento para que todos los clientes conectados reciban la actualización
      io.emit('new-cal-judge', calificacion);
      res.status(200).json({
        success: true,
        message: 'Calificaciones agregadas',
        data: calificacion
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Ocurrió un error', error: error.message });
    }
  });

  
  router.patch('/exam/edit-one/:year/:id/', async (req, res) => {
    try {
      const { year, id} = req.params;
      const cal = req.body;
      const calificacion = await exam.editOne(year, id, cal);
      if (!calificacion) {
        return res.status(400).json({ success: false, message: 'Examen no encontrado' });
      }
      // Emitir el evento para que todos los clientes conectados reciban la actualización
      io.emit('new-cal-judge', calificacion);
      res.status(200).json({
        success: true,
        message: 'Examen Finalizado',
        data: calificacion
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Ocurrió un error', error: error.message });
    }
  });

  return router;
}

module.exports = examsRouter;
