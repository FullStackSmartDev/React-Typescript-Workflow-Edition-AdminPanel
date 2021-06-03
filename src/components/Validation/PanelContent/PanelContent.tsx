import React, { useState, useEffect } from "react";
import { Row, Col, Avatar, Space, Divider, Tooltip } from "antd";
import "./PanelContent.css";
import "../Comment/Comment.css";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function Comment({ validations, getStatuColor }) {
  const [newUsers, setNewUsers] = useState<any[]>([]);
  const {
    validation_name,
    notes_count,
    display_date,
    status,
    prefered_count,
    users,
  } = validations;

  useEffect(() => {
    const newUsers: any[] = [...users];

    const colors: string[] = ["#1FDFF9", "#EA5050", "#BDDEB4"];
    newUsers.forEach((u, i) => {
      u["color"] = colors[i];
    });
    setNewUsers(newUsers);
    return;
  }, [users]);
  return (
    <Row className="Comment-card2" align="middle">
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
          <span className="title2">{validation_name}</span>
        </Space>
      </Col>
      <Col xs={24} lg={5}>
        <Space size="large">
          <div className="multi-avatar">
            <Avatar.Group
              maxCount={3}
              maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
            >
              {newUsers.length > 0 ? (
                newUsers.map((a) => {
                  return (
                    <Tooltip title={a.name} placement="top">
                      <Avatar
                        src={a.logo_path}
                        style={{
                          background:
                            a.logo_path === "empty-avatar" ? a.color : "",
                        }}
                      ></Avatar>
                    </Tooltip>
                  );
                })
              ) : (
                <div className="no-avatar" />
              )}
            </Avatar.Group>
          </div>
          <span className="date2">{display_date}</span>
        </Space>
      </Col>
      <Col xs={24} lg={3} style={{ textAlign: "center" }}>
        <Space size="small">
          {notes_count}
          <img src="/images/comment.png" alt="" />
        </Space>
      </Col>
      <Col xs={24} lg={4} style={{ textAlign: "right" }}></Col>
    </Row>
  );
}

export default Comment;
