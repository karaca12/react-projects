import DefaultRoutes from "./routes/DefaultRoutes";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <div className="App">
            <DefaultRoutes />
          </div>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
