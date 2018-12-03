import React from "react";
import { Table } from "semantic-ui-react";

const ShowUsers = ({ props }) => (
  <div>
    <Table color={"pink"}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>User Name</Table.HeaderCell>
          <Table.HeaderCell>User Email</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.map(user => {
          return (
            <Table.Row key={user.id}>
              <Table.Cell>{user.username}</Table.Cell>
              <Table.Cell>${user.email}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  </div>
);

export default ShowUsers;
