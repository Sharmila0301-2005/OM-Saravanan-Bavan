import { useEffect, useState } from "react";

const API_URL =
  "http://localhost:8080/om_Saravanan_Ice/ReviewServlet";

function Reviews() {
  // Store all customer reviews
  const [reviews, setReviews] = useState([]);

  // Store customer name
  const [name, setName] = useState("");

  // Store selected rating
  const [rating, setRating] = useState(0);

  // Store review comment
  const [comment, setComment] = useState("");

  // Store message
  const [message, setMessage] = useState("");

  // Loading status
  const [loading, setLoading] = useState(true);


  // ==========================================
  // LOAD REVIEWS FROM JAVA + MYSQL
  // ==========================================

  useEffect(() => {

    fetch(API_URL)

      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to load reviews");
        }

        return response.json();
      })

      .then((data) => {

        setReviews(data);

      })

      .catch((error) => {

        console.error("Error loading reviews:", error);

        setMessage(
          "Unable to load reviews from server."
        );

      })

      .finally(() => {

        setLoading(false);

      });

  }, []);


  // ==========================================
  // SUBMIT REVIEW
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    // Check all fields
    if (
      !name.trim() ||
      rating === 0 ||
      !comment.trim()
    ) {

      setMessage(
        "Please fill all fields and select a rating."
      );

      return;
    }


    // Create form data
    const formData = new URLSearchParams();

    formData.append("name", name.trim());
    formData.append("rating", rating);
    formData.append("comment", comment.trim());


    try {

      setMessage("Submitting review...");


      // Send review to Java Servlet
      const response = await fetch(
        API_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },

          body: formData,
        }
      );


      const data = await response.json();


      // Check server response
      if (data.success) {

        setMessage(
          "Thank you for your review! ❤️"
        );


        // Clear form
        setName("");
        setRating(0);
        setComment("");


        // Load reviews again from database
        const reviewResponse =
          await fetch(API_URL);

        const reviewData =
          await reviewResponse.json();

        setReviews(reviewData);

      } else {

        setMessage(
          data.message ||
          "Review could not be saved."
        );
      }


    } catch (error) {

      console.error(
        "Error submitting review:",
        error
      );

      setMessage(
        "Unable to connect to the server."
      );
    }
  };


  // ==========================================
  // CALCULATE TOTAL REVIEWS
  // ==========================================

  const totalReviews = reviews.length;


  // ==========================================
  // CALCULATE AVERAGE RATING
  // ==========================================

  const averageRating =
    totalReviews === 0
      ? 0
      : (
          reviews.reduce(
            (total, review) =>
              total + review.rating,
            0
          ) / totalReviews
        ).toFixed(1);


  // ==========================================
  // COUNT EACH RATING
  // ==========================================

  const ratingCounts = {

    5: reviews.filter(
      (review) => review.rating === 5
    ).length,

    4: reviews.filter(
      (review) => review.rating === 4
    ).length,

    3: reviews.filter(
      (review) => review.rating === 3
    ).length,

    2: reviews.filter(
      (review) => review.rating === 2
    ).length,

    1: reviews.filter(
      (review) => review.rating === 1
    ).length,
  };


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <section
      className="reviews-section"
      id="reviews"
    >

      <h2>Customer Reviews</h2>

      <p className="section-subtitle">
        Share your experience with OM SARAVANAN BAVAN
      </p>


      {/* Overall Rating */}

      <div className="overall-rating">

        <div className="average-rating">

          <h3>
            {averageRating} / 5
          </h3>

          <div className="big-stars">

            {"★".repeat(
              Math.round(averageRating)
            )}

            {"☆".repeat(
              5 - Math.round(averageRating)
            )}

          </div>

          <p>
            Based on {totalReviews} reviews
          </p>

        </div>


        {/* Rating Breakdown */}

        <div className="rating-breakdown">

          {[5, 4, 3, 2, 1].map((star) => (

            <div
              className="rating-row"
              key={star}
            >

              <span>
                {star} ★
              </span>

              <div className="rating-bar">

                <div
                  className="rating-bar-fill"

                  style={{
                    width:
                      totalReviews === 0
                        ? "0%"
                        : `${
                            (ratingCounts[star] /
                              totalReviews) *
                            100
                          }%`,
                  }}
                ></div>

              </div>

              <span>
                {ratingCounts[star]}
              </span>

            </div>

          ))}

        </div>

      </div>


      {/* Review Form */}

      <form
        className="review-form"
        onSubmit={handleSubmit}
      >

        <h3>
          Write a Review
        </h3>


        {/* Name */}

        <div className="form-group">

          <label>
            Your Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}

            onChange={(e) =>
              setName(e.target.value)
            }
          />

        </div>


        {/* Rating */}

        <div className="form-group">

          <label>
            Your Rating
          </label>

          <div className="star-input">

            {[1, 2, 3, 4, 5].map(
              (star) => (

                <button
                  type="button"
                  key={star}

                  className={
                    star <= rating
                      ? "active-star"
                      : ""
                  }

                  onClick={() =>
                    setRating(star)
                  }
                >
                  ★
                </button>

              )
            )}

          </div>

        </div>


        {/* Comment */}

        <div className="form-group">

          <label>
            Your Review
          </label>

          <textarea
            placeholder="Write your experience..."
            value={comment}

            onChange={(e) =>
              setComment(e.target.value)
            }

            rows="5"
          ></textarea>

        </div>


        <button
          type="submit"
          className="submit-review-btn"
        >
          Submit Review
        </button>


        {message && (

          <p className="review-message">
            {message}
          </p>

        )}

      </form>


      {/* Customer Reviews */}

      <div className="reviews-container">

        {loading ? (

          <p className="no-reviews">
            Loading reviews...
          </p>

        ) : reviews.length === 0 ? (

          <p className="no-reviews">
            No reviews yet. Be the first to review us! 😊
          </p>

        ) : (

          reviews.map((review) => (

            <div
              className="review-card"
              key={review.id}
            >

              <h3>
                {review.name}
              </h3>

              <div className="review-stars">

                {"★".repeat(
                  review.rating
                )}

                {"☆".repeat(
                  5 - review.rating
                )}

              </div>

              <p>
                {review.comment}
              </p>

            </div>

          ))

        )}

      </div>

    </section>
  );
}

export default Reviews;