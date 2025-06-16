import * as Yup from "yup";

const VerifyOtpSchema = Yup.object().shape({
    otp: Yup.string()
        .matches(/^[0-9]{6}$/, "OTP must be a 6-digit number")
        .required("OTP is required"),
});

export default VerifyOtpSchema;
