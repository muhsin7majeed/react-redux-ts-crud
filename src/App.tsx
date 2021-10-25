import { Container } from "@mui/material";
import axios from "axios";

import { baseUrl } from "helpers/constants";
import Users from "pages/users/Users";
import Navbar from "components/Navbar";
import "./App.css";

function App() {
  axios.defaults.baseURL = baseUrl;

  return (
    <div className="App">
      <Navbar />

      <Container>
        <Users />
      </Container>
    </div>
  );
}

export default App;
