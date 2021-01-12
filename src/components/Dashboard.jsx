import Axios from "axios";
import { React, useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  IconButton,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

const Dashboard = () => {
  const [chartData, setChartData] = useState({});
  const [data, setData] = useState({
    title: [],
    gpa: [],
    full: [],
  });
  // Status State
  const [status, setStatus] = useState("");

  const chart = () => {
    //   retrive data from mongoDB
    Axios.get("http://localhost:5000/api/gpa")
      .then((res) => {
        const title = [];
        const gpa = [];

        res.data.forEach((item) => {
          title.push(item.title);
          gpa.push(item.gpa);
        });
        setData((prevState) => {
          return {
            ...prevState,
            title,
            gpa,
            full: res.data,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
    //   Set chart data
    setChartData({
      labels: [...data.title],
      datasets: [
        {
          label: "GPA Tracker",
          data: [...data.gpa],
          backgroundColor: "blue",
        },
      ],
    });
  };

  //   set data on Mount
  useEffect(() => {
    chart();
  }, [data]);

  // Hande Delete
  const handleDelete = (id) => {
    Axios.delete(`http://localhost:5000/api/gpa/${id}`)
      .then((res) => {
        setStatus(<Alert severity="warning">Deleted successfully</Alert>);
        setTimeout(() => {
          setStatus("");
        }, 5000);
      })
      .catch((err) => {
        setStatus(<Alert severity="errer">File not deleted</Alert>);
        setTimeout(() => {
          setStatus("");
        }, 5000);

        console.log(err);
      });
  };
  const history = data.full.map((data) => {
    return (
      <Grid item xs={12} lg={12}>
        <Card>
          <CardContent>
            <Typography variant="h5">{data.title}</Typography>
            {data.score.map((score) => {
              return (
                <Grid container>
                  <Grid item xs>
                    <Typography variant="subtitle2">{score.course}</Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="subtitle1">{score.grade}</Typography>
                  </Grid>
                </Grid>
              );
            })}
            <Typography variant="h6">GPA: {data.gpa}</Typography>
            <Button
              startIcon={<Delete color="secondary" />}
              onClick={() => handleDelete(data._id)}
              style={{ float: "right" }}
            ></Button>
          </CardContent>
        </Card>
      </Grid>
    );
  });
  return (
    <div>
      <Container style={{ marginTop: 60 }}>
        <Typography variant="h3" style={{ margin: "0px auto" }}>
          Dashboard
        </Typography>
        {status}
        <Grid container justify="center">
          <Grid item lg={8} xs={12}>
            {data.title.length > 0 ? (
              <Line
                data={chartData}
                width={"100%"}
                height={50}
                options={{
                  maintainAspectRatio: true,
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          suggestedMin: 0,
                        },
                      },
                    ],
                  },
                }}
              />
            ) : (
              <Typography variant="subtitle1">
                {" "}
                <i style={{ margin: "0px auto" }}>No chart data </i>{" "}
              </Typography>
            )}
          </Grid>
          <Grid item lg={2}>
            <Typography variant="h5">CGP</Typography>
            <Grid container spacing={1}>
              {history}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default Dashboard;
