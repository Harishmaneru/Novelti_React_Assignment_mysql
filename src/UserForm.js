import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
function UserForm() {
  const countryStates = {
    US: [
      { value: "NY", label: "New York" },
      { value: "CA", label: "California" },
    ],
    CA: [
      { value: "ON", label: "Ontario" },
      { value: "QC", label: "Quebec" },
    ],
    GB: [
      { value: "ENG", label: "England" },
      { value: "SCT", label: "Scotland" },
    ],
    India: [
      { value: "AP", label: "Andhra Pradesh" },
      { value: "AR", label: "Arunachal Pradesh" },
      { value: "AS", label: "Assam" },
      { value: "BR", label: "Bihar" },
      { value: "CG", label: "Chhattisgarh" },
      { value: "GA", label: "Goa" },
      { value: "GJ", label: "Gujarat" },
      { value: "HR", label: "Haryana" },
      { value: "HP", label: "Himachal Pradesh" },
      { value: "JH", label: "Jharkhand" },
      { value: "KA", label: "Karnataka" },
      { value: "KL", label: "Kerala" },
      { value: "MP", label: "Madhya Pradesh" },
      { value: "MH", label: "Maharashtra" },
      { value: "MN", label: "Manipur" },
      { value: "ML", label: "Meghalaya" },
      { value: "MZ", label: "Mizoram" },
      { value: "NL", label: "Nagaland" },
      { value: "OR", label: "Odisha" },
      { value: "PB", label: "Punjab" },
      { value: "RJ", label: "Rajasthan" },
      { value: "SK", label: "Sikkim" },
      { value: "TN", label: "Tamil Nadu" },
      { value: "TS", label: "Telangana" },
      { value: "TR", label: "Tripura" },
      { value: "UP", label: "Uttar Pradesh" },
      { value: "UK", label: "Uttarakhand" },
      { value: "WB", label: "West Bengal" },
    ],
  };
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address1: "",
    address2: "",
    state: "",
    country: "",
    zipCode: "",
  });
  const [errors, setErrors] = useState({});
  const [stateOptions, setStateOptions] = useState(countryStates["IN"]);
  const navigate = useNavigate();
  const validateForm = () => {
    const newErrors = {};

    // Validate First Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    } else if (formData.firstName.trim().length < 5) {
      newErrors.firstName = "First Name must be at least 5 characters";
    }

    // Validate Last Name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    } else if (formData.lastName.trim().length < 5) {
      newErrors.lastName = "Last Name must be at least 5 characters";
    }

    // Validate Email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Validate Mobile
    const mobileRegex = /^[0-9]{10}$/;
    if (formData.mobile && !mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Invalid mobile number";
    }

    // Validate Address 1
    if (!formData.address1.trim()) {
      newErrors.address1 = "Address 1 is required";
    }

    // Validate ZIP Code
    const zipCodeRegex = /^[0-9]+$/;
    if (formData.zipCode && !zipCodeRegex.test(formData.zipCode)) {
      newErrors.zipCode = "Invalid ZIP code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation before submission
    if (validateForm()) {
      try {
        // Send user data to your API
        const response = await fetch("http://localhost:3001/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        function resetField() {
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            address1: "",
            address2: "",
            state: "",
            country: "",
            zipCode: "",
          });
        }
        if (response.ok) {
          resetField();
          alert("Form data submitted successfully");
          navigate("/UserList");
        } else {
          alert("Error creating user");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleCountryChange = (selectedOption) => {
    const selectedCountry = selectedOption.value;
    const selectedStates = countryStates[selectedCountry] || [];
    setFormData({
      ...formData,
      country: selectedCountry,
      state: "",
    });
    setStateOptions(selectedStates);
  };
  const countryOptions = [
    { value: "US", label: "United States (+1)" },
    { value: "CA", label: "Canada (+1)" },
    { value: "GB", label: "United Kingdom (+44)" },
    { value: "AU", label: "Australia (+61)" },
    { value: "DE", label: "Germany (+49)" },
    { value: "FR", label: "France (+33)" },
    { value: "IT", label: "Italy (+39)" },
    { value: "JP", label: "Japan (+81)" },
    { value: "India", label: "India (+91)" },
    { value: "CN", label: "China (+86)" },
    { value: "BR", label: "Brazil (+55)" },
  ];

  return (
    <div className="user-form-container">
      <h2>Create User</h2>

      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form-control"
          />
          {errors.firstName && <div className="error">{errors.firstName}</div>}
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="form-control"
          />
          {errors.lastName && <div className="error">{errors.lastName}</div>}
        </div>
        <div className="form-group">
          <label>Email Id:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label>Country Code:</label>
          <Select
            options={countryOptions}
            value={countryOptions.find(
              (option) => option.value === formData.country
            )}
            onChange={handleCountryChange}
            className="country-select"
          />
        </div>
        <div className="form-group">
          <label>Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="form-control"
          />
          {errors.mobile && <div className="error">{errors.mobile}</div>}
        </div>
        <div className="form-group">
          <label>Address 1:</label>
          <input
            type="text"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            className="form-control"
          />
          {errors.address1 && <div className="error">{errors.address1}</div>}
        </div>
        <div className="form-group">
          <label>Address 2:</label>
          <input
            type="text"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>State:</label>
          <Select
            options={stateOptions || []}
            value={stateOptions?.find(
              (option) => option.value === formData.state
            )}
            onChange={(selectedOption) =>
              setFormData({ ...formData, state: selectedOption.value })
            }
            className="state-select"
          />
        </div>

        <div className="form-group">
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Zip Code:</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="form-control"
          />
          {errors.zipCode && <div className="error">{errors.zipCode}</div>}
        </div>
        <button type="button" className="btn-submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserForm;
