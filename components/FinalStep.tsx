import React from "react";
import { Box, Typography, Button } from "@mui/material";

interface FinalStepProps {
  firstName: string;
  restartForm: () => void;
}

const FinalStep: React.FC<FinalStepProps> = ({ firstName, restartForm }) => {
  return (
    <Box className="grid gap-4 text-center text-balance">
      <p className="text-5xl">⛳</p>
      <Typography variant="h5">Thanks For Playing {firstName}!</Typography>
      <Typography variant="body1">
        Your scores will be delivered to your email shortly.
      </Typography>
      <Typography variant="body1" className="text-balance">
        Thanks for playing <strong>The Stable Putting Course</strong>!
      </Typography>
      <Button variant="contained" onClick={restartForm}>
        Submit Another Score
      </Button>
    </Box>
  );
};

export default FinalStep;
