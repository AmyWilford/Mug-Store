import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function UserInfo() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <>
      <div className="container my-1">
       
        
            <h2>
              {user.name} dashboard
            </h2>
            <h3>
              Email Address : {user.email}
            </h3>
            <h3>
              Shipping Address : {user.address}
            </h3>
                  
      
        <button>Edit Profile (to open editing section)</button> 
    </div>
    </>
  );}


export default UserInfo;
