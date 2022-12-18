import { useState } from 'react';
import './App.css';


const initialValues = {
  name:'',
  lastname:'',
  email:'',
  age: 0,
  gender:''
};
 const validate = (values) =>{
   const errors = {};
   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
   if (!values.name) {
     errors.name = "name is required!";
   }else if (values.name.length < 4) {
     errors.name = "name must be more than 4 characters";
   }
   if (!values.email) {
     errors.email = "Email is required!";
   } else if (!regex.test(values.email)) {
     errors.email = "This is not a valid email format!";
   }
   if (!values.lastname) {
     errors.lastname = "lastname is required";
   } else if (values.lastname.length < 4) {
     errors.lastname = "lastname must be more than 4 characters";
   } else if (values.lastname.length > 10) {
     errors.password = "lastname cannot exceed more than 10 characters";
   }
   if (!values.age) {
     errors.age = "age is required";
   } else if (values.age < 18) {
     errors.age = "age must be more than 18 years";
   }
   return errors;
 };
function App() {
const [userData,setUserData ] = useState(initialValues);
const [users,setUsers] = useState([]);
const [formErrors,setFormErrors] = useState({});
const [editUserData,setEditUserData] = useState({
  isEdit: false,
  userIndex: null
})

 const handleSubmit = (e) => {
  e.preventDefault();
  console.log(validate(userData));
  const errors = validate(userData);
  if(Object.keys(errors).length > 0) { 
  setFormErrors(validate(userData))
  }else{
    if(editUserData.isEdit){
      const editedData = users;
      editedData.splice(editUserData.userIndex,1,userData);

      setUsers(editedData);

      setEditUserData({
        isEdit: false,
        userIndex: null
      });
    }else{
      setUsers((prev)=> [...prev,userData]);
    };

  setUserData(initialValues);
  setFormErrors({});
  }
 };
//  const validate = userData.name && userData.lastname && userData.email && userData.age && userData.gender;

 const handleClear = () => setUserData(initialValues);
 
 const handleRemove = (index) => {
  setUsers(users.filter((user,userIndex)=> userIndex !== index))
 };

 const handleEdit = (data,index) => {
  setUserData(data); 
  setEditUserData({
    isEdit: true,
    userIndex: index
  });
  console.log('hhhheeey');
 }

  return(
    
    <div className='wrapper'>
     
      <div className='wrapper-content'>
      <div className='header'>
      <h2>add user to screen</h2>
    </div>
        <div>
          <form onSubmit={handleSubmit} onReset={handleClear}>
            <input placeholder='name' type='name' value={userData.name} onChange={(e)=>setUserData((prevState)=>({
              ...prevState,
              name: e.target.value
            }))}/>
            {<p>{formErrors.name}</p>}
            <input placeholder='lastname' type='name' value={userData.lastname} onChange={(e)=>setUserData((prevState)=>({
              ...prevState,
              lastname: e.target.value
            }))}/>
            {<p>{formErrors.lastname}</p>}
            <input placeholder='email' type='email' value={userData.email} onChange={(e)=>setUserData((prevState)=>({
              ...prevState,
              email: e.target.value
            }))}/>
            {<p>{formErrors.email}</p>}
            <input placeholder='age' type='number' onSubmit={validate} value={userData.age} onChange={(e)=>setUserData((prevState)=>({
              ...prevState,
              age: e.target.value
            }))}/>
            {<p>{formErrors.age}</p>}
            <h4>gender</h4>
            <select onChange={(e)=>setUserData((prevState)=>({
              ...prevState,
              gender: e.target.value
            }))}>
              <option>male</option>
              <option>Female</option>
            </select>
            {<p>{formErrors.gender}</p>}
            <div className='button-wrapper'>
              <button type='reset' >clear</button>
              { <button /*disabled={!validate}*/ type='submit'>{editUserData.isEdit ? 'change': 'add'}</button> }
            </div>
          </form>
        </div>
        <div className='table-data'>
          <table>
            <th>#</th>
            <th>name</th>
            <th>lastname</th>
            <th>email</th>
            <th>age</th>
            <th>gender</th>
            <th>options</th>
            <tbody>
              {users.map((user, index)=>(
                <tr>
                  <td>{index +1}</td>
                  <td>{user.name}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>{user.gender}</td>
                  <td>
                    <div>
                      <button className='edit' onClick={()=>handleEdit(user,index)}>edit</button>
                      <button className='remove' onClick={()=>handleRemove(index)}>remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
