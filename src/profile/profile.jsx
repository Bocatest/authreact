import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { collection, addDoc } from 'firebase/firestore';
import "./profile.css";
import {db} from "../firebase";
import { getAuth } from 'firebase/auth';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function ProfileSetup() {

  const UserType = {
    FAN: 1,
    LUMINARY: 2,
  };

  const [firstName, setFirstName] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userType, setUserType] = useState(UserType.FAN);
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const navigate = useNavigate();
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleMenuItemSelect = (event) => {
    setUserType(parseInt(event.target.value)); // Convert the value to a number
  };

  const handleDateOfBirthChange = (date) => {
    setDateOfBirth(date);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate all fields

    const userCollectionRef = collection(db, 'users');

    const newUserData = {
      firstName,
      dateOfBirth: dateOfBirth.toString(),
      location,
      phoneNumber,
      userType: userType, // Update the field name and value
      userID: getAuth().currentUser.uid,
    };

    addDoc(userCollectionRef, newUserData)
      .then(() => {
        console.log('Form data saved successfully!');
        if (userType === UserType.FAN) {
          navigate('/home');
        } else if (userType === UserType.LUMINARY) {
          navigate('/dash');
        }
      })
      .catch((error) => {
        console.error('Error saving form data:', error);
      });
  };


  return (
      <div className="profile-container">
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input type="text" value={firstName} onChange={handleFirstNameChange}/>
          </label>
          <br/>
          <label>
            Date of Birth:
            <DatePicker selected={dateOfBirth} onChange={handleDateOfBirthChange}/>
          </label>
          <br/>
          <label>
            Location:
            <input type="text" value={location} onChange={handleLocationChange}/>
          </label>
          <br/>
          <label>
            Phone Number:
            <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange}/>
          </label>
          <br/>
          <label>
            Select User Type:
            <select value={userType} onChange={handleMenuItemSelect}>
              <option value="">Select Type</option>
              <option value={UserType.FAN}>Fan</option>
              <option value={UserType.LUMINARY}>Luminary</option>
            </select>
          </label>
          <br/>
          <div className="button-container">
          <button type="change">Change</button>
          <button type="submit">Save</button>
          </div>
        </form>
      </div>
  );
}

export default ProfileSetup;


