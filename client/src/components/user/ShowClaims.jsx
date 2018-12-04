import React from "react";
import { Table } from "semantic-ui-react";

const ShowClaims = ({ props }) => (
  <div>
    <Table color={"pink"}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Plan Name</Table.HeaderCell>
          <Table.HeaderCell>Amount Claimed</Table.HeaderCell>
          <Table.HeaderCell>Reason</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.map(user => {
          return (
            <Table.Row key={user.amountClaimed}>
              <Table.Cell>{user.planName}</Table.Cell>
              <Table.Cell>${user.amountClaimed}</Table.Cell>
              <Table.Cell>${user.reason}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  </div>
);

export default ShowClaims;
