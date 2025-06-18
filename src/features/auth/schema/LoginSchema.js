import * as Yup from "yup";

const usernameRegex = /^[a-zA-Z0-9_]+$/;

const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .matches(usernameRegex, "Only letters, numbers, and underscores")
        .required("Username is required"),
    password: Yup.string().required("Password is required"),
});

export default LoginSchema;
