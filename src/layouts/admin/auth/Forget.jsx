import React, { useState } from "react";
import { Header, Divider, Button, Segment } from "semantic-ui-react";
import AuthFormikControl from "../../../components/authForm/AuthFormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../utils/alerts";
import { forgetPasswordService } from "../../../services/auth";
import MyMsg from "../../../utils/MsgDesc";
const initialValues = {
  email: "",
  password: "",
  newPassword: "",
};
const validationSchema = Yup.object({
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
const onSubmit = async (values, submitMethods, navigate) => {
  try {
    const res = await forgetPasswordService(values);
    if (res.status == 200) {
      if (res.data == "Waiting...") {
        Alert(
          "",
          "لینک تایید تغییر Password به ایمیل شما ارسال گردید. پس از کلیک روی آن Password شما تغییر خواهد کرد.",
          "success"
        );
      }
    } else {
      Alert("متاسفم...!", res.data.message, "error");
    }
    submitMethods.setSubmitting(false);
  } catch (error) {
    submitMethods.setSubmitting(false);
    Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
  }
};

const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, submitMethods) =>
        onSubmit(values, submitMethods, navigate, prop)
      }
    >
      {(formik) => {
        return (
          <Form>
            <Segment
              inverted
              padded="very"
              className="fadeout"
              style={{
                paddingBottom: 200,

                boxShadow: "0 40px 50px rgba(81,88,95,.6549019607843137)",
              }}
            >
              <Header as="h2" inverted className="farsi">
                Password Recovry
              </Header>
              <Divider hidden />

              <AuthFormikControl
                formik={formik}
                control="input"
                type="email"
                name="email"
                label="Email"
                labelcolor="orange"
                autoComplete="email"
                size={prop.size}
              />
              <Divider inverted />
              <AuthFormikControl
                formik={formik}
                control="input"
                type="password"
                name="password"
                autoComplete="new-password"
                label="New Password"
                labelcolor={prop.labelcolor}
                size={prop.size}
              />
              <AuthFormikControl
                formik={formik}
                control="input"
                type="password"
                name="newPassword"
                label="Repeat Password"
                labelcolor={prop.labelcolor}
                autoComplete="new-password"
                size={prop.size}
              />
              <Divider inverted />
              <MyMsg
                icon="unlock"
                color="red"
                text="A confirmation link will be sent to your email. After clicking on it, your password will change."
              />

              <Button
                content="Send Confirmation Link"
                fluid
                type="submit"
                size="huge"
                style={{ margin: "10px 0" }}
                disabled={formik.isSubmitting}
                loading={formik.isSubmitting}
                className="farsi"
                color="orange"
              />
            </Segment>
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
