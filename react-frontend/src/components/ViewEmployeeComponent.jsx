import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

class ViewEmployeeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      employee: {},
    };
  }

  componentDidMount() {
    EmployeeService.getEmployeeById(this.state.id).then((res) => {
      this.setState({ employee: res.data });
    });
  }

  goHome = () => {
    this.props.history.push("/employees");
  };

  render() {
    const { employee } = this.state;

    return (
      <div className="animated-background">
        <Container maxWidth="sm" sx={{ mt: 5 }}>
          <Card elevation={4} sx={{ borderRadius: 4, bgcolor: "#f9f9f9" }}>
            <CardContent>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                fontWeight="bold"
              >
                Employee Details
              </Typography>

              <Box sx={{ mt: 3, mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <Typography fontWeight="bold">First Name:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography>{employee.firstName}</Typography>
                  </Grid>

                  <Grid item xs={5}>
                    <Typography fontWeight="bold">Last Name:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography>{employee.lastName}</Typography>
                  </Grid>

                  <Grid item xs={5}>
                    <Typography fontWeight="bold">Email ID:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography>{employee.emailId}</Typography>
                  </Grid>

                  <Grid item xs={5}>
                    <Typography fontWeight="bold">Department:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography>{employee.department}</Typography>
                  </Grid>

                  <Grid item xs={5}>
                    <Typography fontWeight="bold">Address:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography>{employee.address}</Typography>
                  </Grid>
                </Grid>
              </Box>

              <Box display="flex" justifyContent="center" mt={4}>
                <Button
                  variant="contained"
                  startIcon={<HomeIcon />}
                  onClick={this.goHome}
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    backgroundColor: "#1976d2",
                    fontWeight: "bold",
                    textTransform: "none",
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
                    fontSize: "16px",
                    "&:hover": {
                      backgroundColor: "#115293",
                    },
                  }}
                >
                  Back to Home
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </div>
    );
  }
}

export default ViewEmployeeComponent;
