import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import PanelContent from "../PanelContent/PanelContent";
import ListItem from "../ListItem/ListItem";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Collapse, Row, Col, Comment, Tooltip, Avatar, Input } from "antd";
import { getValidationListNotes } from "../../../redux/slices/formulary/validation/validationActionCreation";
import { dateFormat } from "../../../utils/common";

const { Panel } = Collapse;
const { TextArea } = Input;

function ValidationBody(props) {
  const {
    validation,
    updateNotesList,
    note,
    handleNoteChange,
    addNote,
  } = props;
  let [successStateCount, setSuccessCount] = useState(0);
  let [warningCount, setWarningCount] = useState(0);
  let [failCount, setFailCount] = useState(0);

  const getStatuColor = (s) => {
    if (s === "P") {
      return "#b0dfa5";
    } else if (s === "W") {
      return "#f5c38c";
    } else if (s === "F") {
      return "#fc7878";
    }
  };

  const calculateCount = (s) => {
    if (s === "P") {
      setSuccessCount(++successStateCount);
    } else if (s === "W") {
      setWarningCount(++warningCount);
    } else if (s === "F") {
      setFailCount(++failCount);
    }
  };

  useEffect(() => {
    console.log("VALIDATION: ", validation);
    return;
  }, [validation.notes]);

  useEffect(() => {
    validation.children.forEach((ele) => {
      calculateCount(ele.validation_status);
    });
  }, [validation.children]);

  return (
    <Collapse
      onChange={(toggle) =>
        updateNotesList(toggle, validation.id_formulary_validation)
      }
      expandIconPosition={"right"}
      className="collapse"
    >
      <Panel
        className="custom"
        header={
          <PanelContent
            validations={validation}
            getStatuColor={getStatuColor}
          />
        }
        key={validation.id_formulary_validation}
      >
        {/* id_formulary_validation */}
        <Row className="row">
          <Col span={14} className="col-1">
            <Row>
              <Col span={12}>VALIDATION</Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <span style={{ color: "#FD9A9A" }}>&#11044;</span>&nbsp;
                {failCount}
                &nbsp;&nbsp;
                <span style={{ color: "#F8D2A9" }}>&#11044;</span>&nbsp;
                {warningCount}
                &nbsp;&nbsp;
                <span style={{ color: "#C4E7BC" }}>&#11044;</span>&nbsp;
                {successStateCount}
                &nbsp;&nbsp;
              </Col>
            </Row>
            <div className="scroll-bar scrolling">
              {validation.children.map((childList) => (
                <ListItem child={childList} getStatuColor={getStatuColor} />
              ))}
            </div>
          </Col>
          <Col span={10} className="col-2">
            <p>NOTES</p>

            <div className="scroll-bar scrolling">
              {validation?.notes?.map((note, id) => (
                <Comment
                  key={id}
                  actions={[
                    <span key="comment-basic-reply-to">
                      Version: {note.formulary_version_number}
                    </span>,
                  ]}
                  author={<a>{note.user}</a>}
                  avatar={
                    <Tooltip title={note.user} placement="top">
                      <Avatar
                        // src={a.logo_path}
                        style={{
                          background: "",
                          // a.logo_path === "empty-avatar" ? a.color : "",
                        }}
                      ></Avatar>
                    </Tooltip>
                  }
                  content={<p>{note.note}</p>}
                  datetime={
                    <Tooltip
                      title={moment(note.note_added_time).format("YYYY-MM-DD")}
                    >
                      <span>
                        {
                          dateFormat.dateFormat(note.note_added_time)
                          // moment(note.note_added_time).fromNow()
                        }
                      </span>
                    </Tooltip>
                  }
                  className="comment"
                />
              ))}
              <hr className="divider" />
            </div>
            <TextField
              label="Add a Note"
              variant="outlined"
              size="small"
              value={note}
              onChange={handleNoteChange}
            />
            <Button
              size="large"
              onClick={() => addNote(validation.id_formulary_validation)}
            >
              Add Note
            </Button>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
}
function mapProps(state) {
  return {
    validationNotes: state.validationNotesReducer.validationNotesListData,
  };
}

function mapDispatch(dispatch) {
  return {
    getValidationListNotesDispatch: (validationId: number) =>
      dispatch(getValidationListNotes(validationId)),
  };
}
export default connect(mapProps, mapDispatch)(ValidationBody);
