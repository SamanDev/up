import React from "react";
import { Label, Input } from "semantic-ui-react";
const Password = () => (
  <>
    <Input
      size="mini"
      fluid
      label={
        <Label size="tiny" color="yellow" pointing="right" className="farsi">
          Password
        </Label>
      }
      labelPosition="left"
      defaultValue=""
    />
  </>
);

export default Password;
