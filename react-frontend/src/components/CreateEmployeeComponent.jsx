import React, { Component, createRef } from "react";
import EmployeeService from "../services/EmployeeService";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

class CreateEmployeeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      firstName: "",
      lastName: "",
      emailId: "",
      department: "",
      address: "",
      errors: {},
      openDialog: false,
    };

    // Create refs for each field
    this.firstNameRef = createRef();
    this.lastNameRef = createRef();
    this.emailIdRef = createRef();
    this.departmentRef = createRef();
    this.addressRef = createRef();
  }

  componentDidMount() {
    if (this.state.id === "_add") return;

    EmployeeService.getEmployeeById(this.state.id).then((res) => {
      const emp = res.data;
      this.setState({
        firstName: emp.firstName,
        lastName: emp.lastName,
        emailId: emp.emailId,
        department: emp.department,
        address: emp.address,
      });
    });
  }

  validateFields = () => {
    const errors = {};
    if (!this.state.firstName.trim())
      errors.firstName = "First Name is required";
    if (!this.state.lastName.trim()) errors.lastName = "Last Name is required";
    if (!this.state.emailId.trim()) errors.emailId = "Email is required";
    if (!this.state.department.trim())
      errors.department = "Department is required";
    if (!this.state.address.trim()) errors.address = "Address is required";
    return errors;
  };

  focusFirstError = (errors) => {
    if (errors.firstName) this.firstNameRef.current.focus();
    else if (errors.lastName) this.lastNameRef.current.focus();
    else if (errors.emailId) this.emailIdRef.current.focus();
    else if (errors.department) this.departmentRef.current.focus();
    else if (errors.address) this.addressRef.current.focus();
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      this.focusFirstError(errors);
      return;
    }
    this.setState({ openDialog: true });
  };

  handleDialogClose = () => {
    this.setState({ openDialog: false });
  };

  handleConfirmSave = () => {
    const { firstName, lastName, emailId, department, address, id } =
      this.state;
    const employee = { firstName, lastName, emailId, department, address };

    const redirect = () => this.props.history.push("/employees");

    if (id === "_add") {
      EmployeeService.createEmployee(employee).then(redirect);
    } else {
      EmployeeService.updateEmployee(employee, id).then(redirect);
    }

    this.setState({ openDialog: false });
  };

  cancel = () => {
    this.props.history.push("/employees");
  };

  getTitle = () =>
    this.state.id === "_add" ? "Add Employee" : "Update Employee";

  render() {
    const { errors, openDialog } = this.state;

    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Card elevation={4}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              {this.getTitle()}
            </Typography>

            <Box component="form" noValidate onSubmit={this.handleFormSubmit}>
              <Stack spacing={2}>
                <TextField
                  label="First Name"
                  fullWidth
                  required
                  inputRef={this.firstNameRef}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  value={this.state.firstName}
                  onChange={(e) =>
                    this.setState({
                      firstName: e.target.value,
                      errors: { ...errors, firstName: "" },
                    })
                  }
                />
                <TextField
                  label="Last Name"
                  fullWidth
                  required
                  inputRef={this.lastNameRef}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  value={this.state.lastName}
                  onChange={(e) =>
                    this.setState({
                      lastName: e.target.value,
                      errors: { ...errors, lastName: "" },
                    })
                  }
                />
                <TextField
                  label="Email Address"
                  fullWidth
                  required
                  inputRef={this.emailIdRef}
                  error={!!errors.emailId}
                  helperText={errors.emailId}
                  value={this.state.emailId}
                  onChange={(e) =>
                    this.setState({
                      emailId: e.target.value,
                      errors: { ...errors, emailId: "" },
                    })
                  }
                />
                <TextField
                  label="Department"
                  fullWidth
                  required
                  inputRef={this.departmentRef}
                  error={!!errors.department}
                  helperText={errors.department}
                  value={this.state.department}
                  onChange={(e) =>
                    this.setState({
                      department: e.target.value,
                      errors: { ...errors, department: "" },
                    })
                  }
                />
                <TextField
                  label="Address"
                  fullWidth
                  multiline
                  rows={3}
                  required
                  inputRef={this.addressRef}
                  error={!!errors.address}
                  helperText={errors.address}
                  value={this.state.address}
                  onChange={(e) =>
                    this.setState({
                      address: e.target.value,
                      errors: { ...errors, address: "" },
                    })
                  }
                />
                <Stack direction="row" spacing={2} justifyContent="center">
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={this.cancel}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </CardContent>
        </Card>

        {/* Confirmation Dialog */}
        <Dialog open={openDialog} onClose={this.handleDialogClose}>
          <DialogTitle>Confirm Save</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to{" "}
              {this.state.id === "_add" ? "add" : "update"} this employee?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose}>Cancel</Button>
            <Button
              onClick={this.handleConfirmSave}
              variant="contained"
              color="primary"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }
}

export default CreateEmployeeComponent;
