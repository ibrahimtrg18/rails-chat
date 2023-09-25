import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CSSReset, ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <CSSReset />
    <App />
  </ChakraProvider>
);
