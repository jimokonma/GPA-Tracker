import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Delete from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";
import Container from "@material-ui/core/container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Alert, AlertTitle } from "@material-ui/lab";

function App() {
  // Grade Points State
  const [gradePoint, setGradePoint] = useState({
    A: 4.0,
    An: 3.67,
    Bp: 3.33,
    B: 3.0,
    Bn: 2.67,
    Cp: 2.33,
    C: 2,
    Cn: 1.67,
    D: 1,
    F: 0,
  });
  // GPA text/option input state
  const [inputList, setInputList] = useState([
    { course: "", hours: "", grade: "" },
  ]);

  // GPA state
  const [gpa, setGpa] = useState(0);
  // Status State
  const [status, setStatus] = useState("");
  //Handle Add new course/grade input
  const addTextField = () => {
    const list = [...inputList, { course: "", hours: "", grade: "" }];
    setInputList(list);
  };
  //Handle remove course/grade input
  const removeField = (i) => {
    const list = [...inputList];
    list.splice(i, 1);
    setInputList(list);
  };
  // Handle text/option input change
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    console.log(inputList);
  };
  // Handle GradePoint text input Change
  const handleGradeChange = (e) => {
    const { name, value } = e.target;
    setGradePoint((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  // Calculate GPA
  const calculateGPA = () => {
    // Validate input
    for (let i = 0; i < inputList.length; i++)
      if (
        inputList[i].course !== "" &&
        inputList[i].hours !== "" &&
        inputList[i].grade !== ""
      ) {
        const scores = [];
        // multiply hours by grade points
        inputList.forEach((value) => {
          // Assign grade point
          switch (value.grade) {
            case "A":
              scores.push(parseFloat(value.hours) * parseFloat(gradePoint.A));
              break;
            case "A-":
              scores.push(parseFloat(value.hours) * parseFloat(gradePoint.An));
              break;
            case "B+":
              scores.push(parseFloat(value.hours) * parseFloat(gradePoint.Bp));
              break;
            case "B":
              scores.push(parseFloat(value.hours) * parseFloat(gradePoint.B));
              break;
            case "B-":
              scores.push(parseFloat(value.hours) * parseFloat(gradePoint.Bn));
              break;
            case "C+":
              scores.push(parseFloat(value.hours) * parseFloat(gradePoint.Cp));
              break;
            case "C":
              scores.push(parseFloat(value.hours) * parseFloat(gradePoint.C));
              break;
            case "C-":
              scores.push(parseFloat(value.hours) * parseFloat(gradePoint.Cp));
              break;
            case "D":
              scores.push(parseFloat(value.hours) * parseFloat(gradePoint.D));
              break;
            case "F":
              scores.push(parseFloat(value.hours) * parseFloat(gradePoint.F));
              break;
            default:
              return;
          }
        });
        // get total Hours
        const getHours = inputList.map((value) => {
          return value.hours;
        });
        // Sum total hours
        const totalHours = getHours.reduce((prev, val) => {
          const total = parseFloat(prev) + parseFloat(val);
          return total;
        });
        // sum total grade points
        const totalPoints = scores.reduce((prev, val) => {
          const total = parseFloat(prev) + parseFloat(val);
          return total;
        });
        // calculate for gpa and round to 2 decimals
        let gpa = (totalPoints / totalHours).toFixed(2);
        setStatus("");
        // set new gpa state
        setGpa(
          <Card style={{ maxWidth: 300 }}>
            <CardContent justify="center">
              <Typography variant="h3">GPA: {gpa}</Typography>
            </CardContent>
          </Card>
        );
      } else {
        setStatus(
          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            Please Enter All fields
          </Alert>
        );
        setTimeout(() => {
          setStatus("");
        }, 2000);
        setGpa("");
      }
  };
  // map gpa inputs text/option
  const List = inputList.map((val, index) => {
    return (
      <Grid container spacing={2} key={index} justify="center">
        <Grid item xs>
          <TextField
            type="text"
            name="course"
            variant="outlined"
            label="Course Title"
            value={val.course}
            onChange={(e) => handleChange(e, index)}
          />
        </Grid>
        <Grid item xs>
          <TextField
            type="number"
            variant="outlined"
            label="Credit Unit"
            name="hours"
            value={val.hours}
            onChange={(e) => handleChange(e, index)}
          />
        </Grid>
        <Grid item xs>
          <Select
            variant="outlined"
            label="Grade"
            name="grade"
            value={val.grade}
            onChange={(e) => handleChange(e, index)}
            style={{ width: "100%" }}
          >
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="A-">A-</MenuItem>
            <MenuItem value="B+">B+</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="B-">B-</MenuItem>
            <MenuItem value="C+">C+</MenuItem>
            <MenuItem value="C">C</MenuItem>
            <MenuItem value="C-">C-</MenuItem>
            <MenuItem value="D">D</MenuItem>
            <MenuItem value="F">F</MenuItem>
          </Select>
        </Grid>
        <Grid item xs>
          <div style={{ width: "50%" }}>
            {inputList.length !== 1 && (
              <Button
                color="secondary"
                startIcon={<Delete />}
                onClick={() => removeField(index)}
              ></Button>
            )}
            {inputList.length - 1 === index && (
              <Button
                color="primary"
                variant="contained"
                size="small"
                startIcon={<Add />}
                onClick={addTextField}
                style={{ width: 20 }}
              ></Button>
            )}
          </div>
        </Grid>
      </Grid>
    );
  });

  return (
    <div className="App" justify="center">
      <AppBar color="primary">
        <Toolbar>
          <Typography>CGP Tracker</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={{ marginTop: 60 }}>
        <Typography>Grade Range</Typography>
        {/* Grade point text input */}
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs>
                <TextField
                  name="A"
                  label="A"
                  type="text"
                  value={gradePoint.A}
                  width={20}
                  onChange={handleGradeChange}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  name="A-"
                  label="A-"
                  type="text"
                  value={gradePoint.An}
                  onChange={handleGradeChange}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  name="B+"
                  label="B+"
                  type="text"
                  value={gradePoint.Bp}
                  onChange={handleGradeChange}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  name="B"
                  label="B"
                  type="text"
                  value={gradePoint.B}
                  onChange={handleGradeChange}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  name="B-"
                  label="B-"
                  type="text"
                  value={gradePoint.Bn}
                  onChange={handleGradeChange}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  name="C+"
                  label="C+"
                  type="text"
                  value={gradePoint.Cp}
                  onChange={handleGradeChange}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  name="C"
                  label="C"
                  type="text"
                  value={gradePoint.C}
                  onChange={handleGradeChange}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  name="C-"
                  label="C-"
                  type="text"
                  value={gradePoint.Cn}
                  onChange={handleGradeChange}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  name="D"
                  label="D"
                  type="text"
                  value={gradePoint.D}
                  onChange={handleGradeChange}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  name="F"
                  label="F"
                  type="text"
                  value={gradePoint.F}
                  onChange={handleGradeChange}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <div className="container" style={{ padding: "10px 0px" }}>
          {/* Display Status */}
          {status}
        </div>
        <Card>
          <CardContent>{List}</CardContent>
        </Card>
        {/* Calculate GPA button */}
        <Button variant="contained" color="primary" onClick={calculateGPA}>
          Calculate
        </Button>

        {/* Display Calculated GPA */}
        {gpa}
      </Container>
    </div>
  );
}

export default App;
