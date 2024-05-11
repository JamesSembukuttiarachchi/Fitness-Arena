import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Home/Header";
import heroImage from "../assets/hero2.png";
import { FaQuoteRight, FaEarDeaf } from "react-icons/fa6"; // Import the edit icon
import { MdOutlineDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import Swal from "sweetalert2";

const ViewFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [editedFeedback, setEditedFeedback] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:6005/feedback/jen@gmail.com")
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEditFeedback = (feedbackId, feedbackText) => {
    console.log("asda");
    setEditingFeedback(feedbackId);
    setEditedFeedback(feedbackText);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingFeedback(null);
    setEditedFeedback("");
  };

  const handleSaveFeedback = async () => {
    try {
      // Update feedback in the backend
      await axios.put(`http://localhost:6005/feedback/${editingFeedback}`, {
        feedback: editedFeedback,
      });

      // Update feedback in the frontend
      const updatedFeedbacks = feedbacks.map((feedback) =>
        feedback._id === editingFeedback
          ? { ...feedback, feedback: editedFeedback }
          : feedback
      );
      setFeedbacks(updatedFeedbacks);

      // Close the modal
      handleCloseModal();
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  const handleDeleteFeedback = async (feedbackId) => {
    // Show confirmation dialog using SweetAlert
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this feedback!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Delete feedback in the backend
          await axios.delete(`http://localhost:6005/feedback/${feedbackId}`);

          // Update feedbacks in the frontend
          const updatedFeedbacks = feedbacks.filter(
            (feedback) => feedback._id !== feedbackId
          );
          setFeedbacks(updatedFeedbacks);

          // Show success message using SweetAlert
          Swal.fire("Deleted!", "Your feedback has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting feedback:", error);
          // Show error message using SweetAlert
          Swal.fire(
            "Error!",
            "An error occurred while deleting the feedback.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div>
      <Header />

      <div
        className="hero"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "500px",
          width: "100%",
        }}
      >
        <div className="hero-content flex justify-center items-center h-full text-center">
          <div>
            <h1 className="text-white text-5xl font-normal font-['Sans Serif Collection']">
              Feedbacks and Testimonials
            </h1>
          </div>
        </div>
      </div>

      <div>
        <div className="container mx-auto grid grid-cols-3 gap-16 mt-10">
          {feedbacks.map((feedback, index) => (
            <div
              key={index}
              className={`bg-gray-400 flex flex-col justify-center items-center rounded-lg p-6 ${
                index % 3 === 1 ? "bg-orange" : ""
              }`}
              style={{ minWidth: "200px" }}
            >
              <>
                <FaQuoteRight className="inline-block w-6 h-6" />
                <p className="text-white">{feedback.feedback}</p>
                <p className="text-gray-300">
                  {feedback.firstName} {feedback.lastName}
                </p>
                <div className="flex gap-3 mt-2">
                  <button
                    className="btn-edit"
                    onClick={(e) =>
                      handleEditFeedback(feedback._id, feedback.feedback)
                    }
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteFeedback(feedback._id)}
                  >
                    <MdOutlineDelete className="text-red-500" />
                    Delete
                  </button>
                </div>
              </>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <h2 className="text-lg font-bold mb-4">Edit Feedback</h2>
              <textarea
                className="w-full border rounded-md p-2 mb-4"
                value={editedFeedback}
                onChange={(e) => setEditedFeedback(e.target.value)}
              />
              <div className="text-right">
                <button
                  className="btn-save mr-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={handleSaveFeedback}
                >
                  Save
                </button>
                <button
                  className="btn-cancel px-4 py-2 bg-gray-500 text-white rounded-md"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewFeedbacks;
