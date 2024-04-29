import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Office/Header';
import heroImage from '../assets/hero2.png';
import { FaQuoteRight, FaEarDeaf } from 'react-icons/fa6'; // Import the edit icon

const ViewFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [editedFeedback, setEditedFeedback] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:6005/feedback/bob@example.com')
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEditFeedback = (feedbackId, feedbackText) => {
    setEditingFeedback(feedbackId);
    setEditedFeedback(feedbackText);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingFeedback(null);
    setEditedFeedback('');
  };

  const handleSaveFeedback = async () => 
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  {
    try {
      // Update feedback in the backend
      await axios.put(`http://localhost:6005/feedback/${editingFeedback}`, { feedback: editedFeedback });

      // Update feedback in the frontend
      const updatedFeedbacks = feedbacks.map((feedback) =>
        feedback._id === editingFeedback ? { ...feedback, feedback: editedFeedback } : feedback
      );
      setFeedbacks(updatedFeedbacks);

      // Close the modal
      handleCloseModal();
    } catch (error) {
      console.error('Error updating feedback:', error);
    }
  };

  return (
    <div>
      <Header />

      <div
        className="hero"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '500px',
          width: '100%',
        }}
      >
        <div className="hero-content flex justify-center items-center h-full text-center">
          <div>
            <h1 className="text-white text-5xl font-normal font-['Sans Serif Collection']">Feedbacks and Testimonials</h1>
          </div>
        </div>
      </div>

      <div>
        <div className="container mx-auto grid grid-cols-3 gap-16 mt-10">
          {feedbacks.map((feedback, index) => (
            <div
              key={index}
              className={`bg-gray flex flex-col justify-center items-center rounded-lg p-6 ${
                index % 3 === 1 ? 'bg-orange' : ''
              }`}
              style={{ minWidth: '200px' }}
            >
              <>
                <FaQuoteRight className="inline-block w-6 h-6" />
                <p className="text-white">{feedback.feedback}</p>
                <p className="text-gray-300">{feedback.firstName} {feedback.lastName}</p>
                <button className="btn-edit" onClick={() => handleEditFeedback(feedback._id, feedback.feedback)}>
                  <FaEarDeaf /> Edit
                </button>
              </>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Feedback</h2>
            <textarea value={editedFeedback} onChange={(e) => setEditedFeedback(e.target.value)} />
            <div>
              <button className="btn-save" onClick={handleSaveFeedback}>Save</button>
              <button className="btn-cancel" onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewFeedbacks;
