"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Paper, CircularProgress, Typography, Box } from "@mui/material";
import UserInfo from "../components/UserInfo";
import ScoreCard from "../components/ScoreCard";
import { sendToZapier } from "@/lib/webhooks/zapier";
import Logo from "./Logo";
import FinalStep from "./FinalStep";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  [key: string]: string;
}

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const today = new Date().toLocaleDateString("en-US");
  const resetForm = () => {
    formik.resetForm();
    setStep(1);
    setSubmitted(false);
  };

  const validationSchemas = [
    yup.object({
      firstName: yup.string().required("First Name is required"),
      lastName: yup.string().required("Last Name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      phone: yup.string().required("Phone number is required"),
    }),
    yup.object(
      [...Array(9)].reduce((schema, _, i) => {
        schema[`hole${i + 1}`] = yup
          .number()
          .required(`Score for Hole ${i + 1} is required`);
        return schema;
      }, {} as Record<string, yup.NumberSchema>)
    ),
  ];

  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      ...Object.fromEntries([...Array(9)].map((_, i) => [`hole${i + 1}`, ""])),
      date: today,
    },

    validationSchema: validationSchemas[step - 1],
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setTimeout(async () => {
        try {
          setLoading(true);
          sendToZapier(values);
        } catch (error) {
          console.error("Error adding document: ", error);
        } finally {
          setLoading(false);
          setSubmitted(true);
        }
      }, 1000);
    },
  });

  const handleNext = () => {
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        setStep((prev) => prev + 1);
      } else {
        formik.setTouched(
          Object.keys(formik.values).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {}
          )
        );
      }
    });
  };

  const handlePrevious = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  return (
    <section className="grid place-content-center">
      <Box className="space-y-8 pt-8 flex flex-col items-center">
        <div className="flex flex-col items-center">
          <Logo />
          <Typography variant="h4">Scorecard</Typography>
          <p>
            <strong>{today}</strong>
          </p>
        </div>

        <Paper className="p-8 max-md:w-[90vw] rounded grid gap-9">
          {loading && <CircularProgress color="primary" size={64} />}
          {step === 1 && !loading && !submitted && (
            <UserInfo formik={formik} next={handleNext} />
          )}
          {step === 2 && !loading && !submitted && (
            <ScoreCard
              formik={formik}
              previous={handlePrevious}
              submit={formik.handleSubmit}
            />
          )}
          {submitted && (
            <FinalStep
              firstName={formik.values.firstName}
              restartForm={resetForm}
            />
          )}
        </Paper>
      </Box>
    </section>
  );
};

export default MultiStepForm;
