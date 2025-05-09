import * as Yup from "yup";

const usernameOrEmailSchema = Yup.string()
    .test(
        "username-or-email",
        "Enter a valid username or email",
        function (value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const usernameRegex = /^[a-zA-Z0-9_]+$/;
            return (
                value && (emailRegex.test(value) || usernameRegex.test(value))
            );
        }
    )
    .required("Username or email is required");

const LoginSchema = Yup.object().shape({
    identifier: usernameOrEmailSchema,
    password: Yup.string().required("Password is required"),
});

export default LoginSchema;
