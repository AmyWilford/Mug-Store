import React from "react";
import { useQuery } from "@apollo/client";
import {  QUERY_ORDER } from "../utils/queries";

function SingleOrder(_id) {

    const { data } = useQuery(QUERY_ORDER,{
        variables= : {_id:_id}
    });
    let product;
  
    if (data) {
      product = data.products;
    }

 return(
    <>
  
        
        </>
  
        )}

        export default SingleOrder;