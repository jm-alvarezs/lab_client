import moment from "moment";
import {
  CREATE_PACIENTE,
  PACIENTES_RECIBIDOS,
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
  damageLocation: "",
  antecedent: "",
  drugsConsumption: false,
  drugsTreatment: false,
  whichDrugs: "",
  dose: "",
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
    default:
      return { ...state };
  }
};
