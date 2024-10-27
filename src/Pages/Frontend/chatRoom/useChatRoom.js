import { useEffect, useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { firestore } from "../../../config/firebase";
import { message } from "antd";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import getStudentById from "../../../hooks/GetStudentData";

const UseChatRoom = ({ id }) => {
  // const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [members, setMembers] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const docRef = doc(firestore, "ChatRooms", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const allData = docSnap.data();
          const messagesRef = collection(docRef, "Messages");
          onSnapshot(messagesRef, (messagesSnap) => {
            const messagesArray = messagesSnap.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            messagesArray.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
            setMessages(messagesArray);
          });

          // Fetch members data
          const membersData = await Promise.all(
            allData.members.map(async (memberId) => {
              const studentData = await getStudentById(memberId);
              return (
                studentData || {
                  id: memberId,
                  name: "Unknown",
                  email: "Unknown",
                }
              );
            })
          );
          setMembers(membersData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

  const handleSendMessage = async () => {
    if (input.trim() === "") {
      message.warning("Message cannot be empty!");
      return;
    }

    try {
      await addDoc(collection(firestore, "ChatRooms", id, "Messages"), {
        message: input,
        sendBy: user?.uid,
        createdAt: new Date().toISOString(),
        dateStamp: new Date().toLocaleDateString(),
      });
      setInput("");
      message.success("Message Sent");
    } catch (error) {
      message.error("Message Sending Failed!");
      console.error("Error sending message:", error);
    }
  };

  return {
    id,
    handleSendMessage,
    messages,
    input,
    setInput,
    members,
    user,
    loading,
  };
};

export default UseChatRoom;
