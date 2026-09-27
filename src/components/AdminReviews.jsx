import { useEffect, useState } from "react";

const API_URL =
  "http://localhost:8080/om_Saravanan_Ice/ReviewServlet";

function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Load reviews from Java backend
  const loadReviews = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load reviews");
      }

      const data = await response.json();

      setReviews(data);

    } catch (error) {

      console.error("Error loading reviews:", error);

      setMessage("Unable to load reviews.");

    } finally {

      setLoading(false);

    }
  };

  // Load reviews when page opens
  useEffect(() => {
    loadReviews();
  }, []);

  // Delete review
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      setMessage("Deleting review...");

      const response = await fetch(
        `${API_URL}?id=${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {

        setMessage("Review deleted successfully.");

        // Remove deleted review from screen
        setReviews((previousReviews) =>
          previousReviews.filter(
            (review) => review.id !== id
          )
        );

      } else {

        setMessage(
          data.message || "Unable to delete review."
        );

      }

    } catch (error) {

      console.error(
        "Error deleting review:",
        error
      );

      setMessage(
        "Unable to connect to the server."
      );
    }
  };

  return (
    <div className="admin-reviews">

      <div className="admin-reviews-header">

        <div>
          <h1>Customer Reviews</h1>

          <p>
            Manage reviews submitted by your customers.
          </p>
        </div>

        <div className="review-count">
          <span>{reviews.length}</span>
          <small>Total Reviews</small>
        </div>

      </div>

      {message && (
        <p className="admin-message">
          {message}
        </p>
      )}

      {loading ? (

        <p className="admin-loading">
          Loading reviews...
        </p>

      ) : reviews.length === 0 ? (

        <div className="no-admin-reviews">
          <h2>No Reviews Found</h2>

          <p>
            There are currently no customer reviews.
          </p>
        </div>

      ) : (

        <div className="admin-review-list">

          {reviews.map((review) => (

            <div
              className="admin-review-card"
              key={review.id}
            >

              <div className="admin-review-top">

                <div>

                  <h3>
                    {review.name}
                  </h3>

                  <div className="admin-stars">

                    {"★".repeat(
                      review.rating
                    )}

                    {"☆".repeat(
                      5 - review.rating
                    )}

                  </div>

                </div>

                <span className="review-id">
                  ID: {review.id}
                </span>

              </div>

              <p className="admin-review-text">
                {review.comment}
              </p>

              <button
                className="delete-review-btn"
                onClick={() =>
                  handleDelete(review.id)
                }
              >
                🗑️ Delete Review
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default AdminReviews;