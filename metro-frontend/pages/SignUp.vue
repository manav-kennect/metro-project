<template>
    <div class="signup-container">
      <form class="signup-form" @submit.prevent="submitForm">
        <h2 class="signup-heading">Sign Up</h2>
        <div class="form-group">
          <label for="employeeId" class="form-label">Name</label>
          <input
            type="text"
            id="employeeId"
            v-model="name"
            class="form-input"
            required
          />
        </div>
        <div class="form-group">
          <label for="employeeId" class="form-label">Employee ID:</label>
          <input
            type="tel"
            id="employeeId"
            v-model="employeeId"
            class="form-input"
            required
          />
        </div>
        <div class="form-group">
          <label for="password" class="form-label">Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-input"
            required
          />
        </div>
        <div class="form-group">
          <label for="Confirm Password" class="form-label"
            >Confirm Password:</label
          >
          <input
            type="password"
            id="password"
            v-model="confirmPass"
            class="form-input"
            required
          />
        </div>
        <button type="submit" class="signup-button">Sign Up</button>
        <p class="mt-5">Aready have account? <a href="/SignIn">SignIn</a></p>
      </form>
      
    </div>
  </template>
    
    <script>
  import axios from "axios";
  export default {
    middleware: 'auth',
    data() {
      return {
        employeeId: "",
        password: "",
        confirmPass: "",
        name : "",
        currentDate: Date.now(),
      };
    },
    methods: {
      async submitForm() {
        if (this.password === this.confirmPass) {
          const data = {
            username: this.employeeId,
            password: this.password,
            role: "user",
            name: this.name
          };
          await axios
            .post("http://localhost:11001/api/addUser", data)
            .then((response) => {
              console.log(response.data);
              if(response.data["ok"] === true){
                navigateTo('/SignIn');
              }
              else {
                alert("Please Confirm The Employee Is Already Registered With the Company")
              }
            });
  
        }
       else {
          alert("Password Not Matching")
       }  
      },
    },
  };
  </script>
    
    <style scoped>
  .signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* background-color: #f8f8f8; */
  }
  
  .signup-form {
    width: 400px;
    padding: 40px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.1);
  }
  
  .signup-heading {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-label {
    display: block;
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 600;
  }
  
  .form-input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
    transition: border-color 0.3s ease-in-out;
  }
  
  .form-input:focus {
    outline: none;
    border-color: #2c3e50;
  }
  
  .signup-button {
    display: block;
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    background-color: #2c3e50;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }
  
  .signup-button:hover {
    background-color: #34495e;
  }
  </style>
    