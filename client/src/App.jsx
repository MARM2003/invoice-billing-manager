import AppRoutes from "./routes/AppRoute"
import { ToastContainer } from "react-toastify";
function App() {
  
  return (
    <>
      <AppRoutes/>
       <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default App
