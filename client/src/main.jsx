import React from "react";
import ReactDOM from "react-dom/client";
import appRouter, { Auth } from "./router/Router";

import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "./components/ScrollToTop";
import AnimationWrapper from "./common/AnimationWrapper";
import AppRouter from "./router/Router";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AnimationWrapper>
      <Auth>
        <AppRouter />
      </Auth>
    </AnimationWrapper>
  </QueryClientProvider>
);
