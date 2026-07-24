import {
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    useState
} from "react";

import api from "../../api/axiosConfig";

import "./Review.css";


function Review(){


    const location =
        useLocation();


    const navigate =
        useNavigate();



    const booking =
        location.state;



    const [rating,setRating] =
        useState(0);



    const [review,setReview] =
        useState("");



    const submitReview = async()=>{


        if(rating === 0){

            alert(
                "Please select star rating"
            );

            return;

        }



        if(!review.trim()){

            alert(
                "Please write your feedback"
            );

            return;

        }



        try{


            const reviewData = {


                customerName:
                    booking.customerName,


                serviceName:
                    booking.serviceName,


                technicianName:
                    booking.technicianName,


                rating:
                    rating,


                review:
                    review

            };



            await api.post(
                "/reviews",
                reviewData
            );



            await api.put(

                `/bookings/review-status/${booking.id}/SUBMITTED`

            );



            alert(
                "Thank you for your review ❤️"
            );



            navigate(
                "/reviews"
            );



        }

        catch(error){


            console.log(error);


            alert(
                "Unable to submit review"
            );


        }


    };





    if(!booking){

        return (

            <h2>
                Booking not found
            </h2>

        );

    }






    return (

        <div className="review-page">


            <div className="review-card">


                <h1>
                    Rate Your Experience
                </h1>



                <h2>
                    {booking.serviceName}
                </h2>



                <p>
                    Technician:
                    {" "}
                    {booking.technicianName}
                </p>





                <h3>
                    Select Rating
                </h3>



                <div className="star-rating">


                    {
                        [1,2,3,4,5]
                        .map((star)=>(


                            <span

                            key={star}

                            onClick={()=>
                                setRating(star)
                            }


                            className={
                                star <= rating
                                ?
                                "active-star"
                                :
                                "inactive-star"
                            }


                            >

                                ★

                            </span>


                        ))
                    }


                </div>





                <p>

                    Rating:
                    {" "}
                    {rating}/5

                </p>







                <textarea


                    placeholder="Write your feedback..."


                    value={review}


                    onChange={(e)=>
                        setReview(
                            e.target.value
                        )
                    }


                />





                <button

                    onClick={submitReview}

                >

                    Submit Review


                </button>




            </div>


        </div>

    );

}


export default Review;