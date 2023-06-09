import { useEffect, useState } from "react";
import styles from "./Generator.module.scss";
import { config } from "../../../utils/config";

import { useGenerator, useModalLoading } from "../../../store/hooks/index";

import GeneratorPdf from "./generatorPdf";
import GeneratorExcel from "./generatorExcel";

const Generator = () => {
  const { loading, pdfStateGenerate, excelStateGenerate } = useGenerator();
  const { changeState } = useModalLoading();

  useEffect(() => {
    if (pdfStateGenerate === true) {
      fetch(`${config.server}/files/pdf/petInfoPdf.pdf`)
        .then((response) => response.blob())
        .then((blob) => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = `petInfoPdf.pdf`;
          link.click();
        })
        .catch(console.error);
    }
  }, [pdfStateGenerate]);

  useEffect(() => {
    if (excelStateGenerate === true) {
      fetch(`${config.server}/files/excel/petInfoExcel.xlsx`)
        .then((response) => response.blob())
        .then((blob) => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "petInfoExcel.xlsx";
          link.click();
        })
        .catch(console.error);
    }
  }, [excelStateGenerate]);

  useEffect(() => {
    changeState(loading);
  }, [loading]);

  return (
    <div className={styles.container}>
      <GeneratorPdf />
      <GeneratorExcel />
    </div>
  );
};

export default Generator;
