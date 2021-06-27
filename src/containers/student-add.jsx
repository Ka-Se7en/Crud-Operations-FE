import React from 'react';
import { useHistory } from 'react-router-dom';
import { doGet, doPost } from '../services/axios-services';
import '../styles/student-add-style.css';
import '../styles/custom-style.css';

export const onChangePhoneNumber = (e, setPhoneNumber, setPhoneNumberError) => {
  const {
    target: { value },
  } = e;
  if (value) {
    const formattedPhoneNumber = value
      .replace(/\D/g, '')
      .match(/(\d{3})(\d{3})(\d{4})/);

    if (formattedPhoneNumber) {
      setPhoneNumber(formattedPhoneNumber);
      setPhoneNumberError(false);
    } else {
      setPhoneNumberError(true);
    }
  }
};

const StudentAdd = () => {
  const histroy = useHistory();
  const [currentCityId, setCurrentCityId] = React.useState('');
  const [currentDistrictId, setCurrentDistrictId] = React.useState('');
  const [name, setName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState([]);
  const [phoneNumberError, setPhoneNumberError] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const [cities, setCities] = React.useState([]);
  const [citiesLoading, setCitiesLoading] = React.useState(false);
  const [citiesError, setCitiesError] = React.useState(false);
  const [districties, setDistricties] = React.useState([]);
  const [districtiesLoading, setDistrictiesLoading] = React.useState(false);
  const [districtiesError, setDistrictiesError] = React.useState(false);

  React.useEffect(() => {
    setCitiesError(false);
    setCitiesLoading(true);
    doGet('/city/getList')
      .then((response) => setCities(response.data))
      .catch(() => setCitiesError(true))
      .finally(() => setCitiesLoading(false));
  }, []);

  React.useEffect(() => {
    if (currentCityId) {
      setDistrictiesError(false);
      setDistrictiesLoading(true);
      doGet(`district/getListByCityKey/${currentCityId}`)
        .then((response) => setDistricties(response.data))
        .catch(() => setDistrictiesError(true))
        .finally(() => setDistrictiesLoading(false));
    }
  }, [currentCityId]);

  const onSubmit = () => {
    if (name && lastName && phoneNumber && currentCityId && currentDistrictId) {
      const data = {
        name,
        lastName,
        phoneNumber: phoneNumber[0],
        cityKey: currentCityId,
        districtKey: currentDistrictId,
        description: description || null,
      };

      doPost('/addStudent', data)
        .then((response) => {
          if (response.data) {
            alert('Student Add Process Was Completed.');
            histroy.push('/');
          } else {
            alert('Student Add Process Was Uncompleted.');
          }
        })
        .catch((error) => alert('Student Add Process Was Uncompleted.'));
    } else {
      alert('All field is required!.');
    }
  };

  return (
    <div className="student-add-container">
      <h1 className="student-add-title">Add Student</h1>
      <div>
        <input
          className="custom-input"
          type="text"
          placeholder="Enter Student Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input
          className="custom-input"
          type="text"
          placeholder="Enter Student Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <input
          className="custom-input"
          type="text"
          placeholder="Enter Student Phone Number"
          onChange={(e) =>
            onChangePhoneNumber(e, setPhoneNumber, setPhoneNumberError)
          }
        />
        {phoneNumberError && 'You must enter minimum number length 10.'}
      </div>
      <div>
        <textarea
          className="custom-input"
          type="text"
          placeholder="Enter Description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="select-wrapper">
        {cities && !citiesLoading && !citiesError && (
          <select
            className="custom-input"
            value={currentCityId}
            onChange={(e) => setCurrentCityId(e.target.value)}>
            <option value="">Select City</option>
            {cities.map((city) => (
              <option
                key={`${city.sehir_id}/${city.sehir_title}`}
                value={city.sehir_key}>
                {city.sehir_title}
              </option>
            ))}
          </select>
        )}

        {districties?.length > 0 && !districtiesLoading && !districtiesError && (
          <select
            className="custom-input"
            value={currentDistrictId}
            onChange={(e) => setCurrentDistrictId(e.target.value)}>
            <option value="">Select District</option>
            {districties.map((district) => (
              <option
                key={`${district.ilce_id}/${district.ilce_title}`}
                value={district.ilce_key}>
                {district.ilce_title}
              </option>
            ))}
          </select>
        )}
      </div>
      <div onClick={onSubmit} className="custom-button">
        Add Student
      </div>
    </div>
  );
};

export default StudentAdd;
