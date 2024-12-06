import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
// import "@fortawesome/fontawesome-svg-core/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomRoutes from "./utils/Routes";
import { PAGE_TITLE } from "./utils/constants";

function App() {
  document.title = PAGE_TITLE;
  return (
    <div>
      <ToastContainer />
      <CustomRoutes />
    </div>
  );
}

export default App;
