/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

//import * as jose from "jose";
// eslint-disable-next-line react/prop-types
const Header = ({ isLogin, token, handleOpen, club }) => {
  const Login = () => {
    navigate("/login");
  };
  const Profile = () => {
    navigate("/profile");
  };

  const navigate = useNavigate();

  return (
    <header className="w-full bg-[rgb(242,241,241)] h-16 flex items-center">
      {isLogin ? (
        <a
          className="text-lg font-semibold mx-auto hover:cursor-pointer"
          onClick={() => navigate("/", { replace: true })}
        >
          UGather
        </a>
      ) : (
        <div className="flex flex-row justify-between w-full px-10 items-center">
          <h2 className="text-lg font-semibold">UGather.</h2>
          {!token ? (
            <button
              className="bg-blue-700 px-4 py-1 rounded-3xl text-white font-light"
              onClick={() => Login()}
            >
              Log In as Club
            </button>
          ) : (
            <div className="flex flex-row gap-8">
              <button
                className="bg-white px-4 py-1 rounded-3xl font-light"
                onClick={handleOpen}
              >
                Create Event
              </button>
              <button
                className="bg-blue-700 px-4 py-1 rounded-3xl text-white font-light"
                onClick={() => Profile()}
              >
                {club.username}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
