import React, { Fragment } from "react";
import moment from "moment";
import { Table } from "semantic-ui-react";

const ShowPlans = ({ props }) => (
  <div>
    <Table color={"pink"}>
      {props[0].userId ? (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User Id</Table.HeaderCell>
            <Table.HeaderCell>Plan Name</Table.HeaderCell>
            <Table.HeaderCell>Sum Insured</Table.HeaderCell>
            <Table.HeaderCell>Start Date</Table.HeaderCell>
            <Table.HeaderCell>End Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      ) : (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Plan Name</Table.HeaderCell>
            <Table.HeaderCell>Sum Insured</Table.HeaderCell>
            <Table.HeaderCell>Start Date</Table.HeaderCell>
            <Table.HeaderCell>End Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      )}
      <Table.Body>
        {props.map(plan => {
          return (
            <Table.Row key={plan.id}>
              {plan.userId && <Table.Cell>{plan.userId}</Table.Cell>}
              <Table.Cell>{plan.planName}</Table.Cell>
              <Table.Cell>${plan.sumInsured}</Table.Cell>
              <Table.Cell>
                {moment(plan.dateStart).format("DD MMM YY")}
              </Table.Cell>
              <Table.Cell>
                {moment(plan.dateEnd).format("DD MMM YY")}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  </div>
);

export default ShowPlans;
