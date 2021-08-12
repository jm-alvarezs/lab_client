import moment from "moment";
import {
  CREATE_DAMAGE,
  CREATE_PACIENTE,
  DELETE_DAMAGE,
  PACIENTES_RECIBIDOS,
  SET_DAMAGE_LOCATION,
  SET_PROPIEDAD_PACIENTE,
  SINGLE_USER_RECIBIDO,
} from "../types";

const schema = {
  id: "nuevo",
  name: "",
  email: "",
  birthDate: moment().utc().format("YYYY-MM-DD"),
  gender: "Hombre",
  dominantHand: "Diestro",
  antecedent: "",
  drugsConsumption: false,
  drugsTreatment: false,
  whichDrugs: "",
  dose: "",
  damages: [],
};

const damageSchema = {
  id: "nuevo",
  damageLocation: "",
};

export default (state, { type, payload }) => {
  switch (type) {
    case PACIENTES_RECIBIDOS:
      return { ...state, pacientes: payload };
    case SINGLE_USER_RECIBIDO:
      return { ...state, paciente: payload };
    case SET_PROPIEDAD_PACIENTE:
      const paciente = { ...state.paciente };
      const { key, value } = payload;
      paciente[key] = value;
      return { ...state, paciente };
    case CREATE_PACIENTE:
      return { ...state, paciente: schema };
    case SET_DAMAGE_LOCATION: {
      const paciente = { ...state.paciente };
      const damages = [...paciente.damages];
      const { id, damageLocation } = payload;
      const index = damages.findIndex((damage) => damage.id === id);
      if (index !== -1) {
        damages[index].damageLocation = damageLocation;
      }
      return { ...state, paciente };
    }
    case CREATE_DAMAGE: {
      const paciente = { ...state.paciente };
      paciente.damages = [
        ...paciente.damages,
        { ...damageSchema, id: `nuevo-${paciente.damages.length + 1}` },
      ];
      return { ...state, paciente };
    }
    case DELETE_DAMAGE: {
      const paciente = { ...state.paciente };
      const index = paciente.damages.findIndex(
        (damage) => damage.id === payload
      );
      if (index !== -1) {
        paciente.damages[index].id = `d${paciente.damages[index].id}`;
      }
      return { ...state, paciente };
    }
    default:
      return { ...state };
  }
};
