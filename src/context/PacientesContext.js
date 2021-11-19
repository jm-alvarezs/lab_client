import React, { createContext, useContext, useReducer } from "react";
import PacientesReducer from "../reducers/PacientesReducer";
import PacientesService from "../services/PacientesService";
import {
  PACIENTES_RECIBIDOS,
  SINGLE_USER_RECIBIDO,
  SET_PROPIEDAD_PACIENTE,
  SET_DAMAGE_LOCATION,
  NECHAPI_RECIBIDO,
  CREATE_PACIENTE,
  CREATE_DAMAGE,
  DELETE_DAMAGE,
  SHOW_SPINNER,
  HIDE_SPINNER,
} from "../types";
import { ModalContext } from "./ModalContext";
import { navigate } from "@reach/router";
import { hideModal } from "../utils";
import PruebasService from "../services/PruebasService";

const initialState = {
  spinner: false,
  pacientes: null,
  paciente: null,
  categorias: null,
};

export const PacientesContext = createContext(initialState);

export const PacientesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PacientesReducer, initialState);

  const { success } = useContext(ModalContext);

  const getPacientes = () => {
    PacientesService.getPacientes().then((res) => {
      const pacientes = res.data.data;
      dispatch({ type: PACIENTES_RECIBIDOS, payload: pacientes });
    });
  };

  const getPacientesAdmin = () => {
    PacientesService.getPacientesAdmin().then((res) => {
      const pacientes = res.data.data;
      dispatch({ type: PACIENTES_RECIBIDOS, payload: pacientes });
    });
  };

  const getSinglePaciente = (idPaciente) => {
    PacientesService.getSinglePaciente(idPaciente).then((res) => {
      const paciente = res.data.data;
      dispatch({ type: SINGLE_USER_RECIBIDO, payload: paciente });
    });
  };

  const postPaciente = (paciente) => {
    delete paciente.id;
    if (paciente.drugsConsumption !== "") {
      paciente.dose = paciente.drugsConsumption;
      paciente.drugsConsumption = true;
      paciente.drugsTreatment = true;
    } else {
      paciente.drugsConsumption = false;
      paciente.drugsTreatment = false;
    }
    PacientesService.postPaciente(paciente).then((res) => {
      const id = res.data.data.id;
      navigate(`/pacientes/${id}`);
      success("¡Paciente guardado!");
    });
  };

  const updatePaciente = (paciente) => {
    if (typeof paciente.drugsConsumption !== "boolean") {
      paciente.whichDrugs = paciente.drugsConsumption;
      paciente.drugsConsumption = true;
      paciente.drugsTreatment = true;
    }
    PacientesService.updatePaciente(paciente).then(() => {
      success("Paciente actualizado!");
    });
  };

  const createPaciente = () => {
    dispatch({ type: CREATE_PACIENTE });
  };

  const createDamage = () => {
    dispatch({ type: CREATE_DAMAGE });
  };

  const setPropiedadPaciente = (key, value) => {
    dispatch({ type: SET_PROPIEDAD_PACIENTE, payload: { key, value } });
  };

  const setDamageLocation = (id, damageLocation) => {
    dispatch({ type: SET_DAMAGE_LOCATION, payload: { id, damageLocation } });
  };

  const deletePaciente = (id) => {
    PacientesService.deletePaciente(id).then(() => {
      success("¡Paciente eliminado con éxito!");
      getPacientes();
      hideModal();
    });
  };

  const deleteDamage = (id) => {
    dispatch({ type: DELETE_DAMAGE, payload: id });
  };

  const getNechapiForecast = (idPatient) => {
    dispatch({ type: SHOW_SPINNER });
    PruebasService.getNechapi(idPatient)
      .then((res) => {
        const categorias = res.data.data;
        dispatch({ type: NECHAPI_RECIBIDO, payload: categorias });
        dispatch({ type: HIDE_SPINNER });
      })
      .catch((error) => {
        dispatch({ type: HIDE_SPINNER });
      });
  };

  return (
    <PacientesContext.Provider
      value={{
        ...state,
        getPacientes,
        getSinglePaciente,
        getPacientesAdmin,
        postPaciente,
        createPaciente,
        updatePaciente,
        deletePaciente,
        createDamage,
        deleteDamage,
        getNechapiForecast,
        setDamageLocation,
        setPropiedadPaciente,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};
