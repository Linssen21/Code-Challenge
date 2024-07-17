import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import { routeTree } from "./routeTree.gen.ts";
import { SuccessProvider } from "./state/SuccessContext.tsx";
import { DeleteCustomerContextProvider } from "./state/DeleteCustomerContext.tsx";

const queryClient = new QueryClient();

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SuccessProvider>
          <DeleteCustomerContextProvider>
            <RouterProvider router={router} />
          </DeleteCustomerContextProvider>
        </SuccessProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
