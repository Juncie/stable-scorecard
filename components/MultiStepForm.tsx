"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Container, Paper, Stepper, Step, StepLabel } from "@mui/material";
import UserInfo from "../components/UserInfo";
import ScoreCard from "../components/ScoreCard";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  [key: string]: string;
}

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  // Validation Schema
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

  // Formik Hook
  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      ...Object.fromEntries([...Array(9)].map((_, i) => [`hole${i + 1}`, ""])),
    },
    validationSchema: validationSchemas[step - 1],
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      alert("Form submitted successfully!");
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
    <section className="grid h-auto lg:h-svh place-content-center">
      <Container maxWidth="lg" className="space-y-8">
        <hgroup className="text-center">
          <h1>Golf Score Submission</h1>
          <p>Enter your details and golf scores.</p>
        </hgroup>

        <Stepper activeStep={step - 1} alternativeLabel sx={{ mb: 4 }}>
          <Step>
            <StepLabel>User Information</StepLabel>
          </Step>
          <Step>
            <StepLabel>Scorecard</StepLabel>
          </Step>
        </Stepper>

        <Paper className="p-8 rounded grid gap-9">
          {step === 1 && <UserInfo formik={formik} next={handleNext} />}
          {step === 2 && (
            <ScoreCard
              formik={formik}
              previous={handlePrevious}
              submit={formik.handleSubmit}
            />
          )}
        </Paper>
      </Container>
    </section>
  );
};

export default MultiStepForm;
