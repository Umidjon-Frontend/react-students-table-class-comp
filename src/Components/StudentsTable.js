import React, { Component } from "react";
import "./StudentsTable.css";

class StudentsTable extends Component {
  state = {
    inputValue: JSON.parse(localStorage.getItem("data")),
    name: "",
    surname: "",
    age: "",
    male: false,
    female: false,
    jobs: "",
    isActiveBtn: false,
  };

  submitBtn = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submit = () => {
    let box = this.state.inputValue;
    const { name, surname, age, male, female, jobs } = this.state;
    if (name && surname && age && jobs && (male || female)) {
      box.push({
        name: this.state.name,
        surname: this.state.surname,
        age: this.state.age,
        male: this.state.male,
        female: this.state.female,
        jobs: this.state.jobs,
      });
      localStorage.setItem('data', JSON.stringify(this.state.inputValue))
    }
    this.setState({
      name: "",
      surname: "",
      age: "",
      male: false,
      female: false,
      jobs: "",
      inputValue: box,
    });
  };

  delete = (index) => {
    let box = this.state.inputValue;
    box.splice(index, 1);
    this.setState({
      inputValue: box,
    });
    localStorage.setItem('data', JSON.stringify(this.state.inputValue))
  };

  edit = (item, index) => {
    this.setState({
      name: item.name,
      surname: item.surname,
      age: item.age,
      male: item.male,
      female: item.female,
      jobs: item.jobs,
      isActiveBtn: true,
    });
    this.a = index;
  };
  update = () => {
    const { inputValue, name, surname, age, male, female, jobs } = this.state;
    let box = inputValue;
    box[this.a].name = name;
    box[this.a].surname = surname;
    box[this.a].age = age;
    box[this.a].male = male;
    box[this.a].female = female;
    box[this.a].jobs = jobs;
    this.setState({
      inputValue: box,
      name: "",
      surname: "",
      age: "",
      male: false,
      female: false,
      jobs: "",
      inputValue: box,
    });
    localStorage.setItem('data', JSON.stringify(this.state.inputValue))
  };
  render() {
    const { inputValue, name, surname, age, male, female, jobs } = this.state;
    return (
      <div className="students-container">
        <div className="students-addstudents">
          <div className="addstudents-heading">
            <h1>Add Students</h1>
          </div>
          <div className="addstudents-body">
            <div className="input-box">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={this.submitBtn}
                placeholder="Name..."
              />
            </div>
            <div className="input-box">
              <label>Surname:</label>
              <input
                type="text"
                name="surname"
                value={surname}
                onChange={this.submitBtn}
                placeholder="Surname..."
              />
            </div>
            <div className="input-box">
              <label>Age:</label>
              <input
                type="text"
                name="age"
                value={age}
                onChange={this.submitBtn}
                placeholder="Age..."
              />
            </div>
            <div className="input-box">
              <label>Gender:</label>
              <div className="radio-box">
                <input
                  id="male"
                  type="checkbox"
                  checked={male}
                  name="male"
                  onChange={this.submitBtn}
                />
                <label htmlFor="male">Male</label>
                <input
                  id="female"
                  type="checkbox"
                  checked={female}
                  name="female"
                  onChange={this.submitBtn}
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
            <div className="input-box">
              <label>Jobs:</label>
              <input
                type="text"
                name="jobs"
                value={jobs}
                onChange={this.submitBtn}
                placeholder="Jobs..."
              />
            </div>
          </div>

          <div className="addstudents-footer">
            {!this.state.isActiveBtn ? (
              <button className="btn-save" onClick={this.submit}>
                Save
              </button>
            ) : (
              <button className="btn-update" onClick={this.update}>
                Update
              </button>
            )}
          </div>
        </div>
        <div className="students-studentstable">
          <div className="addstudents-heading">
            <h1>Students Table</h1>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>№</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Age</th>
                <th>Male</th>
                <th>Female</th>
                <th>Jobs</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {inputValue.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.surname}</td>
                    <td>{item.age}</td>
                    <td>
                      <input type="checkbox" checked={item.male} />
                    </td>
                    <td>
                      <input type="checkbox" checked={item.female} />
                    </td>
                    <td>{item.jobs}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => this.edit(item, index)}
                      >
                        edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-delete"
                        onClick={() => this.delete(index)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default StudentsTable;
