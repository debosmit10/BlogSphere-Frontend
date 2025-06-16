import * as Yup from "yup";

const ResetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New Password is required"),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm New Password is required"),
});

export default ResetPasswordSchema;
