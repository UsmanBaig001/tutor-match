import { useEffect, useState } from "react";
import getReviewsCollection from "../../hooks/ReviewsHook";

const useTestimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const arr = await getReviewsCollection();
      setTestimonials(arr);
    };
    fetchTestimonials();
  }, []);

  return { testimonials };
};

export default useTestimonial;
