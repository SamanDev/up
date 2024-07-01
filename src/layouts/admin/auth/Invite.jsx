import React from "react";
import { Button, Divider } from "semantic-ui-react";
import AuthFormikControl from "../../../components/form/FormikControl";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { registerService } from "../../../services/auth";
import { MyToast } from "../../../utils/myAlert";

function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username should be a minimum of 3 characters.")
    .min(3, "Username should be a minimum of 3 characters.")
    .max(12, "Username should be a maximum of 12 characters.")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Username فقط می تواند شامل حروف لاتین و اعداد باشد."
    ),
  email: Yup.string()
    .required("Please enter a valid email.")
    .email("Please enter a valid email."),
  password: Yup.string()
    .required("Password should be a minimum of 8 characters.")
    .min(8, "Password should be a minimum of 8 characters.")

    .matches(/(?=.*\d)/, "Password must contain a number.")

    .matches(/((?=.*[A-Z]){1})/, "Password حتما باید شامل یک حرف بزرگ باشد.")
    .matches(/(?=.*\W)/, "Password حتما باید شامل علامت (?!@...) باشد."),
  newPassword: Yup.string()

    .required("Password should be a minimum of 8 characters.")

    .oneOf([Yup.ref("password"), null], "کلمه های عبور باید مطابقت ندارند."),
});
const onSubmit = async (values, submitMethods) => {
  const res = await registerService(values);
  if (res.status == 200) {
    if (res.data.accessToken) {
      submitMethods.resetForm();
      MyToast("انجام شد", "success");
    }
  }
  submitMethods.setSubmitting(false);
};

const depositArea = (prop) => {
  const loginToken = prop.loginToken;
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        newPassword: "",

        refer: loginToken?.username,
      }}
      onSubmit={(values, submitMethods) => onSubmit(values, submitMethods)}
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form>
            <AuthFormikControl
              formik={formik}
              control="input"
              type="text"
              name="username"
              label="Username"
              labelcolor={prop.labelcolor}
              size={prop.size}
              maxLength="12"
              autoComplete="username"
            />
            <AuthFormikControl
              formik={formik}
              control="input"
              type="email"
              name="email"
              label="ایمیل"
              labelcolor={prop.labelcolor}
              size={prop.size}
              autoComplete="email"
            />
            <Divider inverted />
            <AuthFormikControl
              formik={formik}
              control="input"
              type="password"
              name="password"
              autoComplete="new-password"
              label=" Password "
              labelcolor={prop.labelcolor}
              size={prop.size}
            />
            <AuthFormikControl
              formik={formik}
              control="input"
              type="password"
              name="newPassword"
              label="تکرار Password"
              labelcolor={prop.labelcolor}
              autoComplete="new-password"
              size={prop.size}
            />
            <Button
              content="ساخت اکانت"
              fluid
              type="submit"
              style={{ margin: "10px 0" }}
              disabled={formik.isSubmitting}
              loading={formik.isSubmitting}
              className="farsi"
              color="orange"
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
