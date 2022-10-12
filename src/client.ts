import axios from "axios";

const data = {
  firstName: "Jordan",
  lastName: "Renaud",
};

axios.post("http://localhost:3000/", data).then((response) => {
  console.log(response.data);
});
