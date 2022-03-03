import React from "react";
import { Heading, Text } from "@chakra-ui/react";
import "./index.css";
function Card({ valor }) {
  //Function that verify if is string and return two values one if's true and other if false
  const isString = (valor) => typeof valor === "string";

  return (
    <>
      <Heading className={isString(valor) ? "text-card" : "value-card"}>
        {valor}
      </Heading>

      {!isString(valor) && (
        <>
          <Text as="span" className="numCardR">
            {valor}
          </Text>
          <Text as="span" className="numCardL">
            {valor}
          </Text>
        </>
      )}
    </>
  );
}

export { Card };
