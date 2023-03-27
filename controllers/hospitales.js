const { response } = require("express");

const Hospital = require("../models/hospital");

const getHospitales = async(req, res = response) => {
  
  const hospitales = await Hospital.find().populate('usuario', 'nombre');

  res.json({
    ok: true,
    hospitales,
  });
};

const crearHospital = async(req, res) => {
  const hospital = new Hospital(
    {
        usuario: req.uid,
        ...req.body
    });

  try {

    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarHospital = async (req, res) => {

  const id = req.params.id;
  const uid = req.uid;

  try {

    const hospital = await Hospital.findById(id);

    if (!hospital){
      return res.status(404).json({
        ok: false,
        msg: 'Hospital no encontrado por el id'
      });
    }

    // Forma rápida de actualizar
    /* hospital.nombre = req.body.nombre; */

    // Forma más detallada
    const cambioHospital = {
      ...req.body,
      usuario: uid
    }

    const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambioHospital, {new: true});

    res.json({
      ok: true,
      msg: "actualizarHospital",
      hospital: hospitalActualizado
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador' 
    })
  }

  
};

const borrarHospital = async(req, res) => {
  const id = req.params.id;

  try {

    const hospital = await Hospital.findById(id);

    if (!hospital){
      return res.status(404).json({
        ok: false,
        msg: 'Hospital no encontrado por el id'
      });
    }

    await Hospital.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Hospital eliminado"
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador' 
    })
  }
};

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};
