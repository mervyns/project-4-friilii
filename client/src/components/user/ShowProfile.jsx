import React, { Fragment } from "react";
import moment from "moment";
import { Form } from "semantic-ui-react";

const ShowProfile = ({ props }) => (
  <div>
    
    <Form>
        <Form.Group widths='equal'>
          <Form.Input fluid label='First name' placeholder='First name' value={props.firstName} />
          <Form.Input fluid label='Last name' placeholder='Last name' value={props.lastName}/>
        </Form.Group>
        <Form.Group>
          <Form.Input label='Birth Date' value={moment(props.birthDate).format("DD/MM/YY")}/>
        </Form.Group>
      </Form>
  </div>
);

export default ShowProfile;