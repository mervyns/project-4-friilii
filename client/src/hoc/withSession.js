import React from 'react';
import {GET_CURRENT_USER} from '../queries';
import decode from "jwt-decode";
import * as Cookies from "es-cookie";

import { Query } from 'react-apollo';


const withSession = Component => (props) => (
    <Query query={GET_CURRENT_USER}>
        {({data, loading, refetch}) => {
            if(loading) return null;
            return (
                <Component {...props} refetch={refetch} session={data} />
            )
        }}
    </Query>
);

export default withSession;
