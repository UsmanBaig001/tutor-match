import { useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../../../config/firebase";
import { useAuthContext } from "../../../contexts/AuthContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { message } from "antd";

const UseAccount = () => {
  const [data, setData] = useState();
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState();
  const [progress, setProgress] = useState(0);
  const { user } = useAuthContext();
  const id = user.uid;
  const userRole = localStorage.getItem("user");
  const role = JSON.parse(userRole);

  useEffect(() => {
    try {
      const uid = user?.uid;
      const userDocRef = doc(firestore, user?.role, uid);
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          setData(userData);
        } else {
          setData(null);
        }
      });

      return unsubscribe;
    } catch (error) {
      console.error("Error listening to user data:", error);
      throw new Error("An error occurred while listening to user data");
    }
  }, []);

  const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
      const fileName = user.uid;
      const fileExtension = file.name.split(".").pop();
      const storageRef = ref(storage, `images/${fileName}.${fileExtension}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(Math.floor(progress));
          console.log("progress", progress);
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
              console.log("data => ", data);
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

  const handleFile = async () => {
    if (file) {
      setLoading(true);
      try {
        const downloadURL = await uploadFile(file);
        setProgress(0);
        const docRef = doc(firestore, role.role, id);
        const userDataToUpdate = { photoURL: downloadURL };
        await updateDoc(docRef, userDataToUpdate);
        message.success("User profile updated successfully");
        console.log("User profile updated successfully");
      } catch (error) {
        console.error("Error handling file:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return {
    file,
    open,
    data,
    loading,
    progress,
    photoURL,
    setFile,
    handleOpen,
    handleFile,
    handleClose,
  };
};

export default UseAccount;
