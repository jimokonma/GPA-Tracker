import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Delete from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";
import Save from "@material-ui/icons/Save";
import Container from "@material-ui/core/container";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import { ButtonGroup } from "@material-ui/core";

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
  const [gpa, setGpa] = useState();
  // GPA Display state
  const [gpaDisplay, setGpaDisplay] = useState();
  // Status State
  const [status, setStatus] = useState("");
  // Form Display
  const [formDisplay, setFormDisplay] = useState(false);
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
  };
  // Handle GradePoint text input Change
  const handleGradeChange = (e) => {
    const { name, value } = e.target;
    setGradePoint((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  // Save Title State
  const [saveTitle, setSaveTitle] = useState("");
  // Handle Save Title Text input change
  const handleSaveTitleChange = (e) => {
    const { value } = e.target;
    setSaveTitle(value);
  };
  // Save GPA
  const saveGpa = (e) => {
    e.preventDefault();
    const saveData = {
      title: saveTitle,
      score: [...inputList],
      gpa: gpa,
    };
    axios
      .post("http://localhost:5000/api/gpa", saveData)
      .then(() => {
        setStatus(
          <Alert severity="success">
            File saved successfully{" "}
            <Link to="/dashboard" style={{ color: "green" }}>
              View
            </Link>
          </Alert>
        );
        setSaveTitle("");
        setFormDisplay(false);
        setInputList([{ course: "", hours: "", grade: "" }]);
        setGpaDisplay("");
      })
      .catch((err) => {
        console.log(err);
        setStatus(<Alert severity="error">File not saved</Alert>);
      });

    setTimeout(() => {
      setStatus("");
    }, 8000);
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
        setGpa(gpa);
        // set new gpaDisplay state
        if (isNaN(gpa)) {
          setFormDisplay(false);
        } else {
          setGpaDisplay(
            <Card style={{ maxWidth: 300 }}>
              <CardContent justify="center">
                <Typography variant="h3">GPA: {gpa}</Typography>
              </CardContent>
            </Card>
          );
          setFormDisplay(true);
        }
      } else {
        setStatus(<Alert severity="warning">Please Enter All fields</Alert>);
        setTimeout(() => {
          setStatus("");
        }, 2000);
        setGpa("");
      }
  };
  // Grade Value
  const setGradeValue5 = () => {
    setGradePoint({
      A: 5.0,
      An: 4.7,
      Bp: 4.3,
      B: 4.0,
      Bn: 3.7,
      Cp: 3.3,
      C: 3.0,
      Cn: 2.7,
      D: 2.3,
      F: 0,
    });
  };
  const setGradeValue4 = () => {
    setGradePoint({
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
        <Grid item xs={2}>
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
                size="large"
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
    <div className="App">
      <Container maxWidth="md" style={{ marginTop: 70 }}>
        <Typography>Grade Range</Typography>
        <ButtonGroup>
          <Button variant="contained" color="primary" onClick={setGradeValue5}>
            5
          </Button>
          <Button variant="contained" onClick={setGradeValue4}>
            4
          </Button>
        </ButtonGroup>
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
        <Button
          variant="contained"
          color="primary"
          onClick={calculateGPA}
          style={{ margin: "20px 0px" }}
        >
          Calculate
        </Button>
        {/* Display Calculated GPA */}
        <Grid container>
          <Grid item xs>
            {gpaDisplay}{" "}
          </Grid>
          <Grid item xs>
            <Card style={{ maxWidth: 300, opacity: formDisplay ? 1 : 0 }}>
              <CardContent>
                <form onSubmit={saveGpa}>
                  <TextField
                    name="title"
                    label="Enter Semester"
                    placeholder="eg: 100L 1st Semester"
                    type="text"
                    required
                    width={20}
                    value={saveTitle}
                    onChange={handleSaveTitleChange}
                  />
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    size="large"
                    type="submit"
                    color="primary"
                    style={{ float: "right" }}
                  >
                    Save
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
