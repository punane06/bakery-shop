import { useRef } from "react";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { findAllInRenderedTree } from "react-dom/test-utils";

function Employees() {
  // TODO: Load data from backend service
  const idRef = useRef();
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const avatarRef = useRef();
  const [message, setMessage] = useState("");

  const [employees, setEmployees] = useState([]);

  const employeesDbUrl = "https://reqres.in/api/users";

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

  const addEmployee = () => {
    // TODO: Add validations
    // TODO: Add an employee to the table
    if (emailRef.current.value === "") {
      setMessage("No selected product");
    } else {
      setMessage("Successfully added " + firstNameRef.current.value);

      const newEmployees = {
        id: Number(idRef.current.value),
        email: emailRef.current.value,
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        avatar: avatarRef.current.value,
      };
      fetch(employeesDbUrl, {
        method: "POST",
        body: JSON.stringify(newEmployees),
        header: {
          "Content-Type": "application/json",
        },
      });
    }
  };

  const deleteEmployee = (employee) => {
    // TODO: Delete an employee from the table
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
                  <Button type="button" variant="danger">
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
                    />
                  </form>
                </td>
              </td>
              <td>
                <form>
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    className="form-control"
                  />
                </form>
              </td>
              <td>
                <Button onClick={addEmployee} type="submit" variant="success">
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
