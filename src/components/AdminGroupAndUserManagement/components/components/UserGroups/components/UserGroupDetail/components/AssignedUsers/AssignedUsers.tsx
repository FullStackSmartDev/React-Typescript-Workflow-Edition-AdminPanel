import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import Container from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
import './AssignedUsers.scss';
import { Col, Row } from "antd";
import TreeList from "../../../../../Common/TreeList";
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import logo from "../../../../../../../../../assets/icons/images/Ezra.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
        width: 550,
        height: 360
    },
    control: {
      padding: theme.spacing(8)
    }
  })
);

export default function AssignedUsers() {
  const [spacing, setSpacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
  };

  const rows = [
    ["Chelsea Harding", "Domain or Company"],
    ["Emmitt Harris ", "Domain or Company"],
  ];

  return (
        <div className="assigned-users">
        <Container>
            <FormLabel className='label'>Assigned Users:</FormLabel>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.root}
        >
            <Grid item xs={12}>
            <Grid container justify="center" spacing={spacing}>
            <Grid item>
                    <Paper className={classes.paper} variant="outlined" square>
                        <div className="assigned-role-container">
                            {
                            rows.map((row) => {
                                return(<div>
                                <Row>
                                  <Col span={2} className="mlt user-image">
                                  <img src={logo} alt="logo" />
                                  </Col>
                                    <Col span={16} className="mlt">
                                    <span className='role-key'>
                                        {row[0]}
                                    </span>
                                    <br/>
                                    <span className='description'>
                                        {row[1]}
                                    </span>
                                    </Col>
                                    <Col span={2} className="mlt">
                                    <span>
                                        <VisibilityIcon color="action"/>
                                    </span>
                                    </Col>
                                    <Col span={2} className="mlt">
                                    <span>
                                        <AddCircleSharpIcon color="primary"/>
                                    </span>
                                    </Col>
                                </Row>
                                    {/* <div className='description-row'>
                                    <Row>
                                        <Col span={24} className="mlt">
                                        <span>
                                        {row[1]}
                                        </span>
                                        </Col>
                                    </Row>
                                    </div> */}
                                    </div>);
                            })}
                        </div>
                        
                    </Paper>
                </Grid>
            </Grid>
            </Grid>
        </Grid>
        </Container>
    </div>
  );
}
