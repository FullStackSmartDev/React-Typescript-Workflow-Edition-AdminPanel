import React from "react";
import { Row, Col, Avatar, Space } from "antd";
import "./Comment.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
interface Props {
  element: any;
}
//"#EE5959"
function getStatuColor(s) {
  if (s === "P") {
    return "#b0dfa5";
  } else if (s === "W") {
    return "#f5c38c";
  } else if (s === "F") {
    return "#fc7878";
  }
}

function Comment(props: Props) {
  const {
    validation_name,
    notes_count,
    display_date,
    status,
    prefered_count,
    users,
  } = props.element;
  return (
    <Row className="Comment-card" align="middle">
      <Col xs={24} lg={12}>
        <Space size="large">
          <Avatar
            style={{
              backgroundColor: getStatuColor(status),
              verticalAlign: "middle",
            }}
          >
            {prefered_count}
          </Avatar>
          <span className="title">{validation_name}</span>
        </Space>
      </Col>
      <Col xs={24} lg={4} style={{ textAlign: "center" }}>
        <Space size="large">
          <div className="multi-avatar">
            {users.length > 0 ? (
              users.map((a) => {
                return (
                  <div className="tooltip">
                    <span className="tooltiptext">{a.name}</span>
                    <AccountCircleIcon className="empty-avatar"></AccountCircleIcon>
                  </div>
                );
              })
            ) : (
              <div className="no-avatar" />
            )}
          </div>
        </Space>
      </Col>
      <Col xs={24} lg={4} style={{ textAlign: "left" }}>
        <span className="date">{display_date}</span>
      </Col>
      <Col xs={12} lg={2} style={{ textAlign: "center" }}>
        <Space size="small">
          {notes_count}
          <img src="/images/comment.png" alt="" />
        </Space>
      </Col>
      <Col xs={12} lg={2} style={{ textAlign: "right" }}>
        <img src="/images/arrow.png" alt="" />
      </Col>
    </Row>
  );
}

export default Comment;
