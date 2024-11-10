import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import Header from "../components/Header";
import { useState } from "react";
import * as yup from "yup";
import Alert from "@mui/material/Alert";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};
const Login = () => {
  const [errors, setErrors] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    schema
      .validate(formData)
      .then(async (valid) => {
        axios
          .post("", valid)
          .then((data) => {
            setToken(data.data);
            navigate("/", { replace: true });
          })
          .catch(function (error) {
            if (error.response) {
              handleOpen();
              console.log(error.response.status);
            }
          });
      })
      .catch((error) => {
        setErrors([error.message]);
      });
  };
  return (
    <div className="w-full mx-auto font-SF justify-center">
      <Header isLogin={true} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You are not signed in!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please check your credentials and try again
          </Typography>
        </Box>
      </Modal>
      <div className="flex flex-row gap-10 px-10 pt-10 w-full">
        <div className="beks rounded-3xl h-[500px] w-1/2"></div>
        <div className="flex flex-col w-1/2 px-40">
          <h3 className="font-semibold text-3xl text-center pt-8 hover:cursor-pointer">
            UGather.
          </h3>
          <h4 className="text-2xl text-center">Gather together</h4>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-col gap-4 pt-10">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-2xl">Email</h3>
                <input
                  name="email"
                  className="rounded-xl p-3 border-black border"
                  placeholder="example@nu.edu.kz"
                ></input>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-2xl">Password</h3>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="rounded-xl p-3 border-black border"
                ></input>
              </div>
            </div>
            {errors.length > 0 &&
              errors.map((error, index) => (
                <Alert key={index} severity="error">
                  {error}
                </Alert>
              ))}
            <button
              type="submit"
              className="bg-blue-700 rounded-xl text-white mt-4 py-2 px-8 mx-auto"
            >
              Login
            </button>
          </form>
          <h4
            onClick={() => navigate("/register", { replace: true })}
            className="font-semibold text-xl underline underline-offset-1 text-center pt-5 hover:cursor-pointer"
          >
            Do not have an account yet?
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Login;
