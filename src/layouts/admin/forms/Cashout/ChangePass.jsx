import React, { useState } from "react";
import { Divider } from "semantic-ui-react";
import FormikControl from "../../../../components/form/FormikControl";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../../utils/alerts";
import { forgetPasswordService } from "../../../../services/auth";
import MyMsg from "../../../../utils/MsgDesc";
import CashoutButton from "../../input/CashoutButton";

const onSubmit = async (values, submitMethods, prop) => {
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
  const loginToken = prop.loginToken;
  try {
    var _email = loginToken.email;
  } catch (error) {
    var _email = "";
  }

  const initialValues = {
    password: "",
    newPassword: "",
    email: _email,
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
  const [depMode, setDepMode] = useState(false);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, submitMethods) =>
        onSubmit(values, submitMethods, prop)
      }
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              formik={formik}
              control="input"
              type="password"
              name="password"
              label="Password جدید"
              autoComplete="new-password"
              labelcolor={prop.labelcolor}
              size={prop.size}
            />
            <FormikControl
              formik={formik}
              control="input"
              type="password"
              name="newPassword"
              label="تکرار Password"
              autoComplete="new-password"
              labelcolor={prop.labelcolor}
              size={prop.size}
            />
            <Divider inverted />
            <MyMsg
              icon="unlock"
              color="red"
              text="لینک  تایید به ایمیل شما ارسال خواهد شد. پس از کلیک روی آن Password شما تفییر خواهد کرد."
            />
            <CashoutButton
              val={"ارسال لینک  تایید"}
              fluid
              style={{ margin: "10px 0" }}
              className="farsi"
              type="submit"
              color="olive"
              disabled={formik.isSubmitting}
              loading={formik.isSubmitting}
              {...prop}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
