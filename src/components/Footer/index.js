import React from "react";
import { Box, Container, Stack, Text } from "@chakra-ui/react";
import "./Footer.css";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="footer">
      <Box bg="gray.50" color="gray.700">
        <Box
          borderStyle="solid"
          borderTop="1px"
          borderBottom="0px"
          borderLeft="0px"
          borderRight="0px"
          borderColor="red.200"
          borderTopWidth={1}
        >
          <Container
            as={Stack}
            maxW="3xl"
            py={4}
            direction="row"
            spacing={4}
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>
              © 2021 Juan Garcia de Lima. Todos os direitos reservados
            </Text>
            <Stack direction="row" spacing={6} className="links">
              <a
                target="blank"
                className="iconBackground"
                href="https://github.com/juangarciadelima/plan-it-poker"
              >
                <FaGithub />
              </a>
            </Stack>
          </Container>
        </Box>
      </Box>
    </div>
  );
}
