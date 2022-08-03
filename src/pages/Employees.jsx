import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
// import { findAllInRenderedTree } from "react-dom/test-utils";
// import validator from "validator";

function Employees() {
  // DONE: Load data from backend service
  // const idRef = useRef();
  // const emailRef = useRef();
  // const firstNameRef = useRef();
  // const lastNameRef = useRef();
  // const avatarRef = useRef();
  // const [message, setMessage] = useState("");

  const [employees, setEmployees] = useState([]);

  const employeesDbUrl = "https://reqres.in/api/users";
  const [addFormData, setAddFormData] = useState({
    id: "",
    image: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    fetch(employeesDbUrl)
      .then((res) => res.json())
      .then((data) => {
        const newArray = [];
        for (const key in data) {
          newArray.push(data[key]);
        }
        setEmployees(newArray[4]);
      });
  }, []);

  const handleAddFormChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      id: addFormData.id,
      email: addFormData.email,
      firstName: addFormData.first_name,
      lastName: addFormData.last_name,
      image: addFormData.avatar,
    };
    const newEmployees = [...employees, newEmployee];
    setEmployees(newEmployees);
  };

  // const addEmployee = (e) => {
  //   // TODO: Add validations
  //   // TODO: Add an employee to the table - there not backend APPis ready yet - need add later
  //   if (emailRef.current.value === "") {
  //     setMessage("No selected product");
  //   } else {
  //     setEmployees();
  //     setMessage("Successfully added " + firstNameRef.current.value);

  //     const newEmployees = {
  //       id: Number(idRef.current.value),
  //       email: emailRef.current.value,
  //       first_name: firstNameRef.current.value,
  //       last_name: lastNameRef.current.value,
  //       avatar: avatarRef.current.value,
  //     };
  //     fetch(employeesDbUrl, {
  //       method: "POST",
  //       body: JSON.stringify(newEmployees),
  //       header: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //   }
  // };

  const deleteEmployee = (contactId) => {
    // TODO: Delete an employee from the table
    const newEmployees = [...employees];
    const index = employees.findIndex((employee) => employee.id === contactId);
    newEmployees.splice(index, 1);
    setEmployees(newEmployees);
  };

  return (
    <div>
      <div className="container">
        <h2 className="mb-4">Employees</h2>
        <Table className="table table-hover table-bordered table-sortable">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Avatar</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              {/* <!-- DONE: Add a column for an avatar --> */}
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>
                  <img src={e.avatar} alt="avatar"></img>
                </td>
                <td>
                  {e.first_name} <br />
                  {e.last_name}
                </td>
                <td>{e.email}</td>
                <td>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => deleteEmployee(employees.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}

            <tr className="input-row">
              <td>
                <form>
                  <input
                    required
                    type="number"
                    placeholder="ID"
                    className="form-control"
                    name="id"
                    onChange={handleAddFormChange}
                  />
                </form>
              </td>
              <td>
                <form>
                  <input
                    required
                    type="url"
                    placeholder="Image"
                    className="form-control"
                    name="image"
                    onChange={handleAddFormChange}
                  />
                </form>
              </td>
              <td>
                <td>
                  <form>
                    <input
                      required
                      type="text"
                      placeholder="First Name"
                      className="form-control"
                      name="firstName"
                      onChange={handleAddFormChange}
                    />
                  </form>
                </td>
                <br />
                <td>
                  <form>
                    <input
                      required
                      type="text"
                      placeholder="Last Name"
                      className="form-control"
                      name="lastName"
                      onChange={handleAddFormChange}
                    />
                  </form>
                </td>
              </td>
              <td>
                <form>
                  <input
                    required="required"
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    name="email"
                    onChange={handleAddFormChange}
                  />
                </form>
              </td>
              <td>
                <Button
                  type="submit"
                  variant="success"
                  onClick={handleAddFormSubmit}
                >
                  Add
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Employees;
