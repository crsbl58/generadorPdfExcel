import styles from "./Generator.module.scss";
import { useState } from "react";

import { useGenerator } from "../../../store/hooks/index";

import Input from "@/components/ui/Input/Input";

import excelSvg from "../../../../public/svg/excel.svg";
import Image from "next/image";

const GeneratorExcel = () => {
  const { generateExcel } = useGenerator();

  const [stateInputExcel, setStateInputExcel] = useState({
    date: "",
    typeExam: "",
    result: "",
  });
  const [stateArrayExcel, setStateArrayExcel] = useState([
    {
      id: 0,
      date: "23/07/2023",
      typeExam: "Radiografía p.",
      result: "Anormal",
    },
    { id: 1, date: "23/07/2023", typeExam: "Radiografía", result: "Anormal" },
  ]);

  const changeInputs = (e: any, stateValue: boolean) => {
    
    if (stateValue) {
      setStateInputExcel({
        ...stateInputExcel,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    } 
  };

  return (
    <div className={styles.containerExcel}>
      <div>
        <h1>Examés de mascota</h1>
        <Image height={50} width={50} src={excelSvg} alt={"excel"}></Image>
      </div>

      <div>
        <div className={styles.groupBox}>
          <h3>Fecha</h3>
          <Input
            Only="text"
            type="date"
            width="9rem"
            name="date"
            onChange={changeInputs}
            value={stateInputExcel.date}
          />
        </div>
        <div className={styles.groupBox}>
          <h3>T. Examen</h3>
          <Input
            width="9rem"
            name="typeExam"
            onChange={changeInputs}
            value={stateInputExcel.typeExam}
          />
        </div>
        <div className={styles.groupBox}>
          <h3>Resultado</h3>
          <Input
            width="9rem"
            name="result"
            onChange={changeInputs}
            value={stateInputExcel.result}
          />
        </div>
      </div>
      <button
        onClick={() => {
          if (
            stateInputExcel.date.length > 0 &&
            stateInputExcel.typeExam.length &&
            stateInputExcel.result.length
          ) {
            setStateArrayExcel([
              ...stateArrayExcel,
              {
                id: stateArrayExcel.length + 1,
                date: stateInputExcel.date,
                typeExam: stateInputExcel.typeExam,
                result: stateInputExcel.result,
              },
            ]);
          }
        }}
      >
        Agregar Examen
      </button>
      <div className={styles.table}>
        <div>
          <h3>Fecha</h3>
          <h3>T. Examen</h3>
          <h3>Resultado</h3>
        </div>

        <div>
          {stateArrayExcel.map((item: any, index: number) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setStateArrayExcel(
                    stateArrayExcel.filter(
                      (filterItem: any) => filterItem.id !== item.id
                    )
                  );
                }}
              >
                <h3>{item.date}</h3>
                <h3>{item.typeExam}</h3>
                <h3>{item.result}</h3>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => {
          generateExcel(stateArrayExcel);
        }}
      >
        Generar Excel
      </button>
    </div>
  );
};

export default GeneratorExcel;
