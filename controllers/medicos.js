const { response } = require("express");

const Medico = require("../models/medico");

const getMedicos = async (req, res = response) => {
  const medicos = await Medico.find()
    .populate("usuario", "nombre img")
    .populate("hospital", "nombre img");

  res.json({
    ok: true,
    medicos,
  });
};

const getMedicoById = async (req, res = response) => {
  const id = req.params.id;

  try {
    const medico = await Medico.findById(id)
      .populate("usuario", "nombre img")
      .populate("hospital", "nombre img");

    res.json({
      ok: true,
      medico,
    });
  } catch (error) {
    res.json({
      ok: true,
      msg: 'Hable con el administrador',
    });
  }
};

const crearMedico = async (req, res) => {
  const medico = new Medico({
    usuario: req.uid,
    ...req.body,
  });

  try {
    const medicoDB = await medico.save();

    res.json({
      ok: true,
      medico: medicoDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarMedico = async (req, res) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const medico = await Medico.findById(id);

    if (!medico) {
      return res.status(404).json({
        ok: false,
        msg: "Médico no encontrado por el id",
      });
    }

    const cambioMedico = {
      ...req.body,
      usuario: uid,
    };

    const medicoActualizado = await Medico.findByIdAndUpdate(id, cambioMedico, {
      new: true,
    });

    res.json({
      ok: true,
      msg: "Actualizado Médico",
      hospital: medicoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const borrarMedico = async (req, res) => {
  const id = req.params.id;

  try {
    const medico = await Medico.findById(id);

    if (!medico) {
      return res.status(404).json({
        ok: false,
        msg: "Médico no encontrado por el id",
      });
    }

    await Medico.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Médico eliminado",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
  getMedicoById
};
