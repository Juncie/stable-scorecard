import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { FormikProps } from "formik";

interface UserInfoProps {
  formik: FormikProps<UserInfoValues>;
  next: () => void;
}

interface UserInfoValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: Date;
}

const UserInfo: React.FC<UserInfoProps> = ({ formik, next }) => {
  const handleNext = () => {
    if (formik.isValid) {
      next();
    } else {
      formik.setTouched({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
      });
    }
  };

  return (
    <Box maxWidth={500} className="grid gap-4">
      <Typography variant="h4">Player Info</Typography>
      <TextField
        fullWidth
        name="firstName"
        label="First Name"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
      />
      <TextField
        fullWidth
        name="lastName"
        label="Last Name"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
      />
      <TextField
        fullWidth
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        name="phone"
        label="Phone Number"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
      />
      <Button variant="contained" onClick={handleNext}>
        Next
      </Button>
    </Box>
  );
};

export default UserInfo;
