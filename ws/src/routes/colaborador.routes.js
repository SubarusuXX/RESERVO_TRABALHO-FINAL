const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Colaborador = require('../models/colaborador');
const SalaoColaborador = require('../models/relationship/salaoColaborador');
const ColaboradorServico = require('../models/relationship/colaboradorServico');

router.post('/', async (req, res) => {

   
  // inicia sessão de transação do MongoDB
  const db = mongoose.connection;
  const session = await db.startSession();
  session.startTransaction();

  try {

    // dados enviados no body
    const { colaborador, salaoId } = req.body;

    // variável para guardar novo colaborador caso seja criado
    let newColaborador = null;

    // 🔎 verificar se o colaborador já existe (por email ou telefone)
    const existingColaborador = await Colaborador.findOne({
      $or: [
        { email: colaborador.email },
        { telefone: colaborador.telefone }
      ]
    });

    // 🆕 se não existir, cria um novo colaborador
    if (!existingColaborador) {

      newColaborador = await Colaborador({
        ...colaborador
      }).save({ session });

    }

    // 📌 pegar o ID do colaborador (existente ou recém criado)
    const colaboradorId = existingColaborador
      ? existingColaborador._id
      : newColaborador._id;

    // 🔎 verificar se já existe relação entre colaborador e salão
    const existingRelationship = await SalaoColaborador.findOne({
      salaoId,
      colaboradorId,
      status: { $ne: 'E' } // diferente de excluído
    });

    // 🆕 se não existir relacionamento, cria
    if (!existingRelationship) {

      await SalaoColaborador({
        salaoId,
        colaboradorId,
        status: colaborador.vinculo || 'A'
      }).save({ session });

    }

    // 🔄 se já existir relacionamento, atualiza status
    if (existingRelationship) {

      await SalaoColaborador.findOneAndUpdate(
        {
          salaoId,
          colaboradorId
        },
        {
          status: colaborador.vinculo || 'A'
        },
        { session }
      );

    }

    // ⭐ relacionamento colaborador ↔ serviços (especialidades)
    if (colaborador.especialidades && colaborador.especialidades.length) {

      await ColaboradorServico.insertMany(
        colaborador.especialidades.map(servicoId => ({
          colaboradorId,
          servicoId
        })),
        { session }
      );

    }

    // ✅ confirma transação
    await session.commitTransaction();
    session.endSession();

    res.json({
      error: false,
      colaboradorId
    });

  } catch (error) {

    // ❌ se der erro, desfaz tudo
    await session.abortTransaction();
    session.endSession();

    res.json({
      error: true,
      message: error.message
    });

  }

});

module.exports = router;