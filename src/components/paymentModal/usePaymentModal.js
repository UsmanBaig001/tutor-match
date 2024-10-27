import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { message } from "antd";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase";

const UsePaymentModal = ({ props }) => {
  const { user } = useAuthContext();
  const initialState = {
    name: user.name,
    pincode: "",
    address: user.address,
    phoneNumber: "",
  };
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleEnrollNow = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (
        !state.name ||
        !state.address ||
        !state.pincode ||
        !state.phoneNumber
      ) {
        setLoading(false);
        return message.info("Fill all the Fields!");
      }

      const { name, address, pincode, phoneNumber } = state;
      const addressInfo = {
        name,
        address,
        pincode,
        phoneNumber,
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };
      console.log(addressInfo);
      var options = {
        key: "rzp_test_hFAAS0UH1piYDz",
        key_secret: "uZtJMGHsxjhEXLfTnoiRAOAk",
        amount: parseInt(props.data.price * 100),
        currency: "PKR",
        order_receipt: "order_rcptid_" + name,
        name: "Tutor Match",
        description: "for testing purpose",
        handler: function (response) {
          console.log(response);
          const paymentId = response.razorpay_payment_id;
          const orderInfo = {
            cartItems: {
              name: props.data.name,
              photoUrl: props.data.photoURL,
              price: props.data.price,
              uid: props.data.uid,
              quantity: 1,
            },
            addressInfo,
            date: new Date().toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
            email: user.email,
            userid: user.uid,
            paymentId,
          };
          const result = addDoc(collection(firestore, "orders"), orderInfo);
          console.log(result);
          message.success("Payment Successful");
        },
        theme: {
          color: "#3399cc",
        },
      };

      var pay = new window.Razorpay(options);
      pay.open();
      console.log(pay);

      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
    // const uid = Math.random().toString(36).slice(2);
    // const courseData = props.data;
    // if (!courseData) {
    //   return message.error("Course data not found !");
    // }
    // if (!user) {
    //   return message.error("Please login to enroll now!");
    // }
    // const applicant = user;
    // const CourseEnrollmentData = {
    //   courseData: courseData,
    //   applicant: applicant,
    //   uid: uid,
    // };
    // await setDoc(doc(firestore, "Request", uid), CourseEnrollmentData);
    // message.success("Request sent successfully!");
  };
  return { state, loading, handleChange, handleEnrollNow };
};

export default UsePaymentModal;
