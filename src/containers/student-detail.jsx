import React from 'react';
import { doGet, doPut } from '../services/axios-services';
import { useHistory, useParams } from 'react-router-dom';
import { onChangePhoneNumber } from './student-add';
import '../styles/custom-style.css';
import '../styles/student-detail-style.css';

const StudentDetails = () => {
  const histroy = useHistory();
  const { id } = useParams();
  const [currentCityId, setCurrentCityId] = React.useState('');
  const [currentDistrictId, setCurrentDistrictId] = React.useState('');
  const [cities, setCities] = React.useState([]);
  const [districties, setDistricties] = React.useState([]);
  const [studentDetail, setStudentDetail] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [name, setName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState([]);
  const [phoneNumberError, setPhoneNumberError] = React.useState(false);
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setLoading(true);
    setError(false);
    doGet(`/getStudentById/${id}`)
      .then((response) => {
        const { data } = response;
        data.forEach((element) => {
          setName(element.name);
          setLastName(element.lastName);
          setPhoneNumber(element.phoneNumber);
          setDescription(element.description);
          setCurrentDistrictId(element.districtKey);
          setCurrentCityId(element.cityKey);
        });
        setStudentDetail(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  React.useEffect(() => {
    doGet('/city/getList').then((response) => setCities(response.data));
  }, []);

  React.useEffect(() => {
    if (currentCityId) {
      doGet(`district/getListByCityKey/${currentCityId}`).then((response) =>
        setDistricties(response.data),
      );
    }
  }, [currentCityId]);

  const onSubmit = () => {
    if (name && lastName && phoneNumber && currentCityId && currentDistrictId) {
      const data = {
        name,
        lastName,
        phoneNumber: phoneNumber[0].length > 1 ? phoneNumber[0] : phoneNumber,
        cityKey: currentCityId,
        districtKey: currentDistrictId,
        description: description || null,
      };

      doPut('/updateStudent', data)
        .then((response) => {
          if (response.data) {
            alert('Student Update Process Was Completed.');
            histroy.push('/');
          } else {
            alert('Student Update Process Was Uncompleted.');
          }
        })
        .catch(() => alert('Student Add Process Was Uncompleted.'));
    } else {
      alert('All field is required!.');
    }
  };

  return (
    <div className="student-detail-container">
      {loading && <div>Loading..</div>}
      {error && <div>There is one error!..</div>}
      {!loading &&
        !error &&
        studentDetail?.map((detail) => (
          <div key={`${detail.id}/${detail.name}`}>
            {detail.name && (
              <div>
                Name:
                <input
                  className="custom-input"
                  type="text"
                  defaultValue={detail.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div>
              Last Name:
              <input
                className="custom-input"
                type="text"
                defaultValue={detail.lastName || ''}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              Phone Number:
              <input
                className="custom-input"
                type="text"
                defaultValue={detail.phoneNumber || ''}
                onChange={(e) =>
                  onChangePhoneNumber(e, setPhoneNumber, setPhoneNumberError)
                }
              />
              {phoneNumberError && 'You must enter minimum number length 10.'}
            </div>

            <div>
              Description :
              <textarea
                className="custom-input"
                type="text"
                defaultValue={detail.description || ''}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="select-wrapper">
              {cities.length > 0 && (
                <div>
                  City :
                  <select
                    className="custom-input"
                    defaultValue={detail.cityKey || ''}
                    onChange={(e) => {
                      setCurrentCityId(e.target.value);
                      setCurrentDistrictId('');
                    }}>
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option
                        key={`${city.sehir_id}/${city.sehir_title}`}
                        value={city.sehir_key}>
                        {city.sehir_title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {districties?.length > 0 && (
                <div>
                  District :
                  <select
                    className="custom-input"
                    defaultValue={detail.districtKey || ''}
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
                </div>
              )}
            </div>
            <div>
              <div className="custom-button" onClick={onSubmit}>
                Update
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default StudentDetails;
