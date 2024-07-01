import React, { useState } from "react";
import { Header, Divider, Button, Segment } from "semantic-ui-react";
import AuthFormikControl from "../../../components/authForm/AuthFormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyMsg from "../../../utils/MsgDesc";

import { registerService } from "../../../services/auth";
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
const onSubmit = async (values, submitMethods, navigate, prop) => {
  const res = await registerService(values);
  if (res.status == 200) {
    if (res.data.accessToken) {
      prop.setSecondOpen(false);
      prop.setIsUser(true);
      localStorage.setItem(btoa(values.username), btoa(values.password));
      localStorage.removeItem("email");
      localStorage.removeItem("refer");
    }
  }
  submitMethods.setSubmitting(false);
};

const depositArea = (prop) => {
  var reffer = localStorage.getItem("refer");
  var email = localStorage.getItem("email");
  const [depMode, setDepMode] = useState(false);
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        username: "",
        email: email != null ? email : "",
        password: "",
        newPassword: "",
        refer: reffer,
      }}
      onSubmit={(values, submitMethods) =>
        onSubmit(values, submitMethods, navigate, prop)
      }
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form>
            <Segment
              inverted
              padded="very"
              className="fadeout"
              style={{
                paddingBottom: 300,

                boxShadow: "0 40px 50px rgba(81,88,95,.6549019607843137)",
              }}
            >
              <Header as="h2" inverted className="farsi">
                Create Account
              </Header>
              <Divider hidden />

              <MyMsg
                icon=""
                color="black"
                text={
                  <>
                    Thank you very much for creating an account on the USDT
                    Poker.
                    {reffer && (
                      <>
                        <br />
                        شما توسط کاربر <b className="text-gold">
                          {reffer}
                        </b>{" "}
                        دعوت شده اید.
                      </>
                    )}
                  </>
                }
              />
              <Divider inverted />

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

              {email != null && email.indexOf("@") > -1 ? (
                <AuthFormikControl
                  formik={formik}
                  control="input"
                  type="email"
                  name="email"
                  label="ایمیل"
                  labelcolor={prop.labelcolor}
                  size={prop.size}
                  autoComplete="email"
                  disabled={true}
                />
              ) : (
                <AuthFormikControl
                  formik={formik}
                  control="input"
                  type="email"
                  name="email"
                  label="Email"
                  labelcolor={prop.labelcolor}
                  size={prop.size}
                  autoComplete="email"
                />
              )}

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
                label="Repeat Password"
                labelcolor={prop.labelcolor}
                autoComplete="new-password"
                size={prop.size}
              />
              <Button
                content="Create Account"
                fluid
                type="submit"
                style={{ margin: "10px 0" }}
                disabled={formik.isSubmitting}
                loading={formik.isSubmitting}
                className="farsi"
                color="orange"
                size="huge"
              />
            </Segment>
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
