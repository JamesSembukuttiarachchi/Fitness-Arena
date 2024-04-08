import React, { useState } from 'react';

function FeedbackForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    membershipId: '',
    subject: '',
    feedbackDetails: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-20 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Feedback Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block font-semibold">First Name:</label>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
          </div>

          <div>
            <label htmlFor="lastName" className="block font-semibold">Last Name:</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
          </div>

          <div>
            <label htmlFor="email" className="block font-semibold">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
          </div>

          <div>
            <label htmlFor="membershipId" className="block font-semibold">Membership ID:</label>
            <input type="text" id="membershipId" name="membershipId" value={formData.membershipId} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
          </div>

          <div>
            <label htmlFor="subject" className="block font-semibold">Subject:</label>
            <select id="subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required>
              <option value="">Select</option>
              <option value="Registration">Registration</option>
              <option value="workout shedule">About workout</option>
              <option value="Shopping">Shopping</option>
              <option value="Appointments">Appointments</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="feedbackDetails" className="block font-semibold">Feedback Details:</label>
            <textarea id="feedbackDetails" name="feedbackDetails" value={formData.feedbackDetails} onChange={handleChange} rows="4" className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required></textarea>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;
