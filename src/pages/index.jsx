import Header from "../components/Header";
import { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Event from "../components/Event";
import EventsCarousel from "../components/EventCarousel";
import Footer from "../components/Footer";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import * as yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import Alert from "@mui/material/Alert";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { useAuth } from "../provider/authProvider";

import * as jose from "jose";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 630,
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

const attendStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  marginLeft: "auto",
  marginRight: "auto",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 300,
  bgcolor: "white",
  borderRadius: "20px",
  p: 4,
};

const Home = () => {
  const [errors, setErrors] = useState([]);
  const [dateTime, setDateTime] = useState(null);
  const [open, setOpen] = useState(false);
  const [attendOpen, setAttendOpen] = useState(false);

  const handleAttend = () => {
    setAttendOpen(true);
  };
  const handleAttendClose = () => setAttendOpen(false);
  const handleClose = () => setOpen(false);
  const [file, setFile] = useState();
  const [club, setClub] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState({});
  let selected;
  const [isTicketSubmitted, setIsTicketSubmitted] = useState();
  const handleOpen = (event) => {
    
    
    setSelectedEvent(event);
    selected = event;
    setOpen(true);
  };
  const { token } = useAuth;

  useEffect(() => {
    try {
      const data = jose.decodeJwt(localStorage.getItem("token"));
      setClub(data.sub);
    } catch(e) {
      
    }
    
  }, [token]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };
  const schema = yup.object().shape({
    eventName: yup.string().required("Club name is required"),
    date: yup.string().required("Date is required"),
    location: yup.string().required("Location is required"),
    description: yup.string().required("Description is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      eventName: e.target.eventName.value,
      date: e.target.date.value,
      location: e.target.location.value,
      description: e.target.description.value,
    };
    if (file) {
      const form = new FormData();
      form.append("file", file);
      console.log(form);
      schema
        .validate(formData)
        .then(async (valid) => {
          axios
            .post("http://localhost:8080/events", { ...valid, form })
            .then((data) => {
              console.log(data);
            })
            .catch(function (error) {
              if (error.response) {
                console.log(error.response.status);
              }
            });
        })
        .catch((error) => {
          setErrors([error.message]);
        });
    }
  };
  const handleAttendSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("/attend", e.target.email.value)
      .then((data) => {
        setIsTicketSubmitted(true);
        console.log(data);
      })
      .catch(function (error) {
        setIsTicketSubmitted(true);
        if (error.response) {
          console.log(error.response.status);
        }
      });
  };
  const [chips, setChips] = useState([
    { name: "IT", clicked: false },
    { name: "Engineering", clicked: false },
    { name: "Entertainment", clicked: false },
    { name: "Webinar", clicked: false },
    { name: "Workshop", clicked: false },
    { name: "Research", clicked: false },
    { name: "Fashion", clicked: false },
  ]);

  const [events, setEvents] = useState([]);

  const fetchEvents = async (eventTypes) => {
    try {
      const response = await axios.get("http://localhost:8080/events/trending");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleChipClick = (index) => {
    setChips((prevChips) =>
      prevChips.map((chip, i) =>
        i === index ? { ...chip, clicked: !chip.clicked } : chip
      )
    );
  };

  useEffect(() => {
    const selectedTypes = chips
      .filter((chip) => chip.clicked)
      .map((chip) => chip.name);

    fetchEvents(selectedTypes);
  }, [chips]);

  const isFilterApplied = chips.some((chip) => chip.clicked);

  return (
    <div className="font-SF">
      <Header
        isLogin={false}
        token={token}
        handleOpen={handleOpen}
        club={club}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="flex flex-col focus:outline-none">
          {club ? (
            // Show the form if club data is present
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label
                htmlFor="image_upload"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                  p: 2,
                  border: "1px dashed",
                  borderRadius: "20px",
                  width: 600,
                  height: 200,
                }}
              >
                <div className="flex flex-col mx-auto">
                  <AddIcon className="mx-auto" />
                  {file ? <h3>{file.name}</h3> : <h3>Add an image</h3>}
                </div>
              </label>
              <input
                type="file"
                id="image_upload"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="flex flex-col gap-2">
                <h3>Create a name for your event</h3>
                <input
                  name="eventName"
                  className="rounded-xl p-2 border-black border"
                  placeholder="Event name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3>Choose date and time</h3>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DesktopDateTimePicker
                      name="date"
                      className="border-black border"
                      value={dateTime}
                      onChange={(newValue) => setDateTime(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="flex flex-col gap-2">
                <h3>Choose Location</h3>
                <input
                  name="location"
                  className="rounded-xl p-2 border-black border"
                  placeholder="Location"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3>Description</h3>
                <input
                  name="description"
                  className="rounded-xl p-2 border-black border"
                  placeholder="Description"
                />
              </div>
              {errors.map((error, index) => (
                <Alert key={index} severity="error">
                  {error}
                </Alert>
              ))}
              <button
                className="bg-blue-700 px-8 py-2 mt-4 self-center rounded-3xl text-white font-light"
                type="submit"
              >
                Create an event
              </button>
            </form>
          ) : (
            <>
              <img
                src="math.jpg"
                alt={selected?.name}
                className="w-full h-48 rounded-lg object-cover"
              />

              <div className="mt-6 flex flex-row items-center gap-6">
                <h2 className="text-2xl font-bold">Book</h2>
                <p className="">by beknur</p>
              </div>

              <div className="mt-6 flex gap-6">
                <p>Dec 01, 2024</p>
                <p>Main Hall</p>
              </div>

              <p className="mt-6 text-lg">Book reading</p>

              <button
                className="mt-6 bg-blue-700 text-white rounded-full px-12 py-2 self-center hover:bg-blue-700 transition"
                onClick={() => {
                  handleClose();
                  handleAttend();
                }}
              >
                Attend
              </button>
            </>
          )}
        </Box>
      </Modal>
      <Modal
        open={attendOpen}
        onClose={handleAttendClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={attendStyle}
          className="flex flex-col focus:outline-none text-center gap-5"
        >
          {!isTicketSubmitted ? (
            <>
              <h3 className="text-2xl font-semibold">
                We will send you a ticket for this event!
              </h3>
              <form
                className="flex flex-col gap-10"
                onSubmit={handleAttendSubmit}
              >
                <input
                  name="email"
                  className="rounded-xl p-3 border-black border self-center px-40 text-left"
                  placeholder="example@nu.edu.kz"
                ></input>
                <button
                  type="submit"
                  className="bg-blue-700 px-12 py-1 rounded-3xl self-center text-white"
                >
                  Take a ticket
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col mx-auto gap-4">
              {" "}
              <img src="circle-check.png" className="w-24 h-24 mx-auto" />{" "}
              <h3 className="text-3xl font-semibold">Successfull!</h3>
              <h3 className="text-xl">You are registered for this event!</h3>
            </div>
          )}
        </Box>
      </Modal>
      <div className="pt-4 flex px-10 flex-col gap-2">
        <h4 className="text-xl font-semibold">Fields</h4>
        <Stack direction="row" spacing={2}>
          {chips.map((chip, index) => (
            <Chip
              key={index}
              label={chip.name}
              onClick={() => handleChipClick(index)}
              color="primary"
              variant={chip.clicked ? "filled" : "outlined"}
            />
          ))}
        </Stack>
      </div>

      {isFilterApplied ? (
        <div className="pt-4 flex px-10 flex-wrap gap-4">
          {events.map((event, index) => (
            <div key={index} className="w-1/4 p-4">
              <Event {...event} />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="pt-4 flex px-10 flex-col gap-2">
            <div className="flex flex-col items-center gap-2">
              <div className="flex w-full justify-between">
                <div className="flex gap-2">
                  <h4 className="text-xl font-semibold">Trending</h4>
                  <img src="fire.png" className="w-6 h-6" alt="Trending" />
                </div>
                <button className="py-1 px-4 rounded-3xl bg-blue-700 text-white">
                  Filter
                </button>
              </div>
              <EventsCarousel events={events} handleOpen={handleOpen} />
            </div>
          </div>
          <div className="pt-4 flex px-10 flex-col gap-2">
            <div className="flex flex-col gap-2">
              <h4 className="text-xl font-semibold">Today</h4>
              <EventsCarousel events={events} handleOpen={handleOpen} />
            </div>
          </div>
          <div className="pt-4 flex px-10 flex-col gap-2 pb-4">
            <div className="flex flex-col gap-2">
              <h4 className="text-xl font-semibold">Upcoming Events</h4>
              <EventsCarousel events={events} handleOpen={handleOpen} />
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Home;
