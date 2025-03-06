import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { FormikProps } from "formik";

interface ScoreCardProps {
  formik: FormikProps<ScoreCardValues>;
  previous: () => void;
  submit: () => void;
}

interface ScoreCardValues {
  [key: string]: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ formik, previous, submit }) => {
  return (
    <Box className="grid gap-4 mt-4">
      <Typography variant="h4">Enter Your Stable Scores</Typography>
      {[...Array(9)].map((_, index) => (
        <TextField
          key={index}
          fullWidth
          type="number"
          name={`hole${index + 1}`}
          label={`Hole ${index + 1}`}
          value={formik.values[`hole${index + 1}`]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched[`hole${index + 1}`] &&
            Boolean(formik.errors[`hole${index + 1}`])
          }
          helperText={
            formik.touched[`hole${index + 1}`] &&
            formik.errors[`hole${index + 1}`]
          }
        />
      ))}
      <Box display="flex" justifyContent="space-between">
        <Button variant="outlined" onClick={previous}>
          Previous
        </Button>
        <Button variant="contained" color="primary" onClick={submit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default ScoreCard;
