import { useState } from "react";
import { firestore, storage } from "../../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { message } from "antd";
import generateUid from "../../../utils/uid";

const initialState = {
  name: "",
  date: "",
  price: "",
  teacher: "",
  duration: "",
  description: "",
};
const initialTime = {
  time1: false,
  time2: false,
  time3: false,
};
const initialDays = {
  Monday: false,
  Tuesday: false,
  Wednesday: false,
  Thursday: false,
  Friday: false,
  Saturday: false,
};
const UseDashboard = () => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState();
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState();
  const [photoURL, setPhotoURL] = useState();
  const [time, setTime] = useState(initialTime);
  const [days, setDays] = useState(initialDays);
  const id = generateUid();
  const handleCheckboxChange = (event) => {
    setDays({ ...days, [event.target.name]: event.target.checked });
  };
  const handleTimeChange = (event) => {
    setTime({ ...time, [event.target.name]: event.target.checked });
  };
  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };
  const uid = Math.random().toString(36).slice(2);
  const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
      const fileName = uid;
      const fileExtension = file.name.split(".").pop();
      const storageRef = ref(storage, `course/${fileName}.${fileExtension}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(Math.floor(progress));
        },
        (error) => {
          message.error("Something went wrong while uploading file");
          console.error("Something went wrong while uploading file", error);
          setLoading(false);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setPhotoURL(downloadURL);
              let data = { file: downloadURL };
              setFile(null);
              resolve(downloadURL);
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
              reject(error);
            });
        }
      );
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const selectedDays = Object.keys(days).filter((day) => days[day]);
      const selectedTimes = Object.keys(time).filter((slot) => time[slot]);
      if (selectedDays.length < 1 || selectedTimes.length < 1) {
        message.warning("Noday or time selected ");
        return;
      }
      const timeMappings = {
        time1: "08:00AM To 10:00AM",
        time2: "12:00PM To 02:00PM",
        time3: "04:00PM To 06:00PM",
      };

      const selectedTimeRanges = selectedTimes.map(
        (slot) => timeMappings[slot]
      );
      const { name, duration, price, date, description } = state;
      if (!name || !duration || !price || !date || !description) {
        return message.info("Fill all the fields!");
      }
      const downloadURL = await uploadFile(file);
      if (!downloadURL) {
        return message.info("Please select an image!");
      }
      setProgress(0);
      const courseData = {
        uid: uid,
        date: date,
        name: name,
        price: price,
        chatRoomUid: id,
        days: selectedDays,
        duration: duration,
        photoURL: downloadURL,
        description: description,
        times: selectedTimeRanges,
      };
      const chatData = {
        uid: id,
      };
      await setDoc(doc(firestore, "Courses", uid), courseData);
      await setDoc(doc(firestore, "ChatRooms", id), chatData);
      message.success("Course Added Successfully!");
      setState(initialState);
      setFile(null);
      setPhotoURL("");
      setDays(initialDays);
      setTime(initialTime);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  return {
    days,
    file,
    time,
    state,
    setFile,
    loading,
    progress,
    handleChange,
    handleSubmit,
    handleTimeChange,
    handleCheckboxChange,
  };
};

export default UseDashboard;
