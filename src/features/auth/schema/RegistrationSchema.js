import * as Yup from "yup";

const registrationSchema = Yup.object({
    name: Yup.string().min(2).max(50).required("Name is required"),
    username: Yup.string().min(2).max(20).required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(8, "At least 8 characters")
        .matches(/[A-Z]/, "Must include uppercase")
        .matches(/[a-z]/, "Must include lowercase")
        .matches(/\d/, "Must include number")
        // .matches(/[@$!%*?&]/, "Must include special character")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
});

export default registrationSchema;
