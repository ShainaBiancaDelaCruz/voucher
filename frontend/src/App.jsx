import "./App.css";
import { Toaster } from "react-hot-toast";
import { LandingLayout } from "./layout";
import { Voucher,Expenditure } from "./pages";
import { QueryClient, QueryClientProvider } from "react-query";
import { CustomError } from "./components";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

function App() {
  const client = new QueryClient();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<LandingLayout />}>
          <Route 
            index 
            element={<Voucher />} 
            errorElement={<CustomError />}
          />
           <Route 
            path="expenditure" 
            element={<Expenditure />} 
            errorElement={<CustomError />}
          />

        </Route>
      </>
    )
  );

  return (
    <>
      <QueryClientProvider client={client}>
        <Toaster position="top-center" />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
