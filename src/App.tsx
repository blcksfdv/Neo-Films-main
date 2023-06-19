import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './Routes'
import {useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

function App() {
    const router = createBrowserRouter(routes)
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
        <div className="App bg-[url('../src/assets/neobg.jpg')] bg-cover bg-no-repeat bg-blend-normal text-white font-poppins min-h-screen">
            <RouterProvider router={router} />
        </div>
        </QueryClientProvider>
    )
}

export default App
