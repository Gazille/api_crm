import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const VerCliente = () => {
  const { id } = useParams();

  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    setCargando(!cargando);
    const obtenerClienteAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    obtenerClienteAPI();
  }, []);

  return cargando ? (
    <Spinner />
  ) : Object.keys(cliente).length === 0 ? (
    <p>No Hay Resultado</p>
  ) : (
    <div>
      <>
        <h1 className="font-black text-4xl text-blue-900">
          Ver Cliente: {cliente.nombre}{" "}
        </h1>
        <p className="mt-3">Informacion del Cliente</p>
        <p className="text-4xl text-gray-700 mt-10">
          {" "}
          <span className=" uppercase font-bold">Cliente:</span>{" "}
          {cliente.nombre}{" "}
        </p>
        <p className="text-2xl text-gray-700 mt-4 ">
          {" "}
          <span className=" uppercase font-bold text-gray-800">
            Email:
          </span>{" "}
          {cliente.Email}{" "}
        </p>
        {cliente.telefono && (
          <p className="text-2xl text-gray-700 mt-4">
            {" "}
            <span className=" uppercase font-bold text-gray-800">
              Telefono:
            </span>{" "}
            {cliente.telefono}{" "}
          </p>
        )}
        <p className="text-2xl text-gray-700 mt-4">
          {" "}
          <span className=" uppercase font-bold text-gray-800">
            Empresa:
          </span>{" "}
          {cliente.empresa}{" "}
        </p>
        {cliente.notas && (
          <p className="text-2xl text-gray-700 mt-4">
            {" "}
            <span className=" uppercase font-bold text-gray-800">
              Notas:
            </span>{" "}
            {cliente.notas}{" "}
          </p>
        )}
      </>
    </div>
  );
};

export default VerCliente;
