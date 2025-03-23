import { Spinner } from "@chakra-ui/react";
import React from "react";

const Loading = () => {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100vh"}}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </div>
  );
};

export default Loading;
