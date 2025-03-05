"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Container, Paper, CircularProgress, Typography } from "@mui/material";
import UserInfo from "../components/UserInfo";
import ScoreCard from "../components/ScoreCard";
import { sendToZapier } from "@/lib/webhooks/zapier";

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
    
    const timeStamp = new Date;

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
      date: 
    },

    validationSchema: validationSchemas[step - 1],
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setTimeout(async () => {
        try {
          setLoading(true);
          sendToZapier(values);
          alert("Your Scores Have Been Submitted");
          formik.resetForm();
          setStep(1);
        } catch (error) {
          console.error("Error adding document: ", error);
        } finally {
          setLoading(false);
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
    <section className="grid h-auto lg:h-svh place-content-center">
      <Container maxWidth="xl" className="space-y-8">
        <hgroup className="text-center pt-8">
          <Typography variant="h3">
            The Stable <br /> Scorecard
          </Typography>
        </hgroup>

        <Paper className="p-8 rounded grid gap-9">
          {loading && <CircularProgress />}
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
