import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Stack,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";

class ListEmployeeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      selectedEmployeeId: null,
      dialogType: "", // "delete" or "edit"
      openDialog: false,
    };
  }

  componentDidMount() {
    EmployeeService.getEmployees().then((res) => {
      this.setState({ employees: res.data });
    });
  }

  handleOpenDialog = (type, id) => {
    this.setState({
      dialogType: type,
      selectedEmployeeId: id,
      openDialog: true,
    });
  };

  handleCloseDialog = () => {
    this.setState({
      openDialog: false,
      selectedEmployeeId: null,
      dialogType: "",
    });
  };

  handleConfirmDialog = () => {
    const { dialogType, selectedEmployeeId } = this.state;
    if (dialogType === "delete") {
      EmployeeService.deleteEmployee(selectedEmployeeId).then(() => {
        this.setState((prevState) => ({
          employees: prevState.employees.filter(
            (emp) => emp.id !== selectedEmployeeId
          ),
        }));
      });
    } else if (dialogType === "edit") {
      this.props.history.push(`/add-employee/${selectedEmployeeId}`);
    }

    this.handleCloseDialog();
  };

  addEmployee = () => {
    this.props.history.push("/add-employee/_add");
  };

  viewEmployee = (id) => {
    this.props.history.push(`/view-employee/${id}`);
  };

  render() {
    const { employees, openDialog, dialogType } = this.state;

    return (
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Paper elevation={4} sx={{ p: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h4" gutterBottom>
              Employees List
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={this.addEmployee}
            >
              Add Employee
            </Button>
          </Stack>

          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>
                  <strong>First Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Last Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id} hover>
                  <TableCell>{employee.firstName}</TableCell>
                  <TableCell>{employee.lastName}</TableCell>
                  <TableCell>{employee.emailId}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <IconButton
                        color="primary"
                        onClick={() =>
                          this.handleOpenDialog("edit", employee.id)
                        }
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() =>
                          this.handleOpenDialog("delete", employee.id)
                        }
                      >
                        <Delete />
                      </IconButton>
                      <IconButton
                        color="info"
                        onClick={() => this.viewEmployee(employee.id)}
                      >
                        <Visibility />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Dialog open={openDialog} onClose={this.handleCloseDialog}>
          <DialogTitle>
            {dialogType === "delete"
              ? "Delete Confirmation"
              : "Edit Confirmation"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to{" "}
              {dialogType === "delete" ? "delete" : "edit"} this employee?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="inherit">
              Cancel
            </Button>
            <Button
              onClick={this.handleConfirmDialog}
              color={dialogType === "delete" ? "error" : "primary"}
              variant="contained"
            >
              {dialogType === "delete" ? "Delete" : "Edit"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }
}

export default ListEmployeeComponent;
