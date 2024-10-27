import React from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import SchoolIcon from "@mui/icons-material/School";
import GradeIcon from "@mui/icons-material/Grade";
import ChatRoom from "../chatRoom/ChatRoom";
import { Table } from "antd";
import UseCourseDash from "./useCourseDash";
import { useAuthContext } from "../../../contexts/AuthContext";
import ViewResults from "../../../components/results/ViewResult";
import AddResults from "../../../components/results/AddResult";
import FileUpload from "../../../components/fileUpload/FileUpload";
import { useLocation } from "react-router-dom";

function CourseDash() {
  const {
    handleListItemClick,
    toggleDrawer,
    columns,
    loading,
    studentsData,
    selectedIndex,
    open,
    item,
  } = UseCourseDash();
  console.log("studentsData", item?.students);
  const { user } = useAuthContext();
  const location = useLocation();
  const courseId = location?.state?.item?.uid;
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[
          "Chat Room",
          "Files and Videos",
          "Course Students",
          "Add Results",
          "View Results",
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleListItemClick(index)}>
              <ListItemIcon>
                {index === 0 ? (
                  <ChatIcon />
                ) : index === 1 ? (
                  <TrackChangesIcon />
                ) : index === 2 ? (
                  <PeopleAltOutlined />
                ) : index === 3 ? (
                  <SchoolIcon />
                ) : (
                  <GradeIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        backgroundColor: "lightgrey",
        minHeight: "100vh",
        padding: "16px",
        flexDirection: "column",
      }}
    >
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Box
        sx={{
          flexGrow: 1,
          padding: "16px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: 3,
          width: "100%",
          marginTop: "12px",
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "1200px",
        }}
      >
        <Button
          onClick={toggleDrawer(true)}
          sx={{
            padding: "8px 16px",
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Menu
        </Button>
        {selectedIndex === 0 && <ChatRoom id={item?.chatRoomUid} />}
        {selectedIndex === 1 && <FileUpload courseId={courseId} />}
        {selectedIndex === 2 && (
          <div className="table" style={{ margin: "40px 20px" }}>
            <h1
              style={{
                color: "tomato",
                textAlign: "center",
                margin: "20px",
                fontWeight: "400",
                textShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              List of Enrolled Students...
            </h1>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "60vh",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <CircularProgress
                  style={{ height: "20px", width: "20px", color: "#eb2c27" }}
                />
                <h2 style={{ marginLeft: "10px", color: "#eb2c27" }}>
                  Loading
                </h2>
              </div>
            ) : (
              <div style={{ overflow: "auto" }}>
                <Table
                  dataSource={item?.students}
                  columns={columns}
                  rowKey={item?.uid}
                />
              </div>
            )}
          </div>
        )}
        {selectedIndex === 3 && (
          <AddResults studentsData={item?.students} currentUser={user} />
        )}
        {selectedIndex === 4 && <ViewResults students={item?.students} />}
      </Box>
    </Box>
  );
}

export default CourseDash;
