// src/UserTable.js
import React, { Component } from 'react';
import mockUsers from './mockData'; // Import mock data

class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      error: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    // Fetch user records from the API
    fetch('https://dummyjson.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data);
        this.setState({ users: data, isLoading: false });
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({ error, isLoading: false });
      });
  }

  render() {
    const { users, error, isLoading } = this.state;

    // Determine whether to use mock data or not
    const dataToDisplay = error ? mockUsers : users;

    return (
      <div className="user-table">
        <h1>User Records</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : dataToDisplay.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {dataToDisplay.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>{error ? "Error: Unable to fetch data." : "No user records found."}</p>
        )}
      </div>
    );
  }
}

export default UserTable;
