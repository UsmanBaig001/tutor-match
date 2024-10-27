import React from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  AppBar,
  Toolbar,
  Box,
  CircularProgress,
} from "@mui/material";
import UseChatRoom from "./useChatRoom";

const ChatRoom = ({ id }) => {
  const {
    handleSendMessage,
    messages,
    input,
    setInput,
    members,
    user,
    loading,
  } = UseChatRoom({ id });
  const getMemberData = (uid) => {
    return members.find((member) => member.id === uid) || {};
  };

  const formatDate = (date) => {
    return date.toLocaleDateString();
  };

  let lastDate = null;
  if (loading) {
    return (
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
        <h2 style={{ marginLeft: "10px", color: "#eb2c27" }}>Loading</h2>
      </div>
    );
  } else
    return (
      <Container style={{ marginTop: "30px", marginBottom: "30px" }}>
        <AppBar position="static" sx={{ marginBottom: 2 }}>
          <Toolbar color={"#eb2c27"} style={{ backgroundColor: "#eb2c27" }}>
            <Typography variant="h6">Chat Room</Typography>
          </Toolbar>
        </AppBar>
        <Paper
          elevation={3}
          sx={{
            padding: 0,
            marginTop: 2,
            backgroundImage:
              "url('https://w0.peakpx.com/wallpaper/557/521/HD-wallpaper-whatsapp-v-background-doodle-pattern-patterns-whatsapp-thumbnail.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <List
            sx={{
              maxHeight: "80vh",
              minHeight: "50vh",
              overflowY: "auto",
              padding: 3,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
            }}
          >
            {messages.length > 0 &&
              messages.map((message, index) => {
                const messageDate = formatDate(new Date(message.createdAt));
                const showDate = messageDate !== lastDate;
                lastDate = messageDate;
                const memberData = getMemberData(message.sendBy);
                const isCurrentUser = message.sendBy === user?.uid;
                return (
                  <React.Fragment key={index}>
                    {showDate && (
                      <ListItem>
                        <Typography
                          style={{
                            backgroundColor: "#eb2c27",
                            width: "fit-content",
                            marginRight: "auto",
                            marginLeft: "auto",
                            color: "white",
                            padding: "10px",
                            borderRadius: "10px",
                            marginBottom: "5px",
                            fontSize: "16px",
                          }}
                          variant="body2"
                          color="textSecondary"
                          align="center"
                          sx={{ width: "100%" }}
                        >
                          {messageDate}
                        </Typography>
                      </ListItem>
                    )}
                    <ListItem
                      alignItems="flex-start"
                      sx={{
                        display: "flex",
                        justifyContent: isCurrentUser
                          ? "flex-end"
                          : "flex-start",
                      }}
                    >
                      {!isCurrentUser && (
                        <ListItemAvatar>
                          <Avatar src={memberData.photoURL}>
                            {memberData.name?.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                      )}
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body1"
                              color="textPrimary"
                            >
                              {memberData.name || "Unknown User"}
                            </Typography>
                            {" — "}
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="textSecondary"
                            >
                              {new Date(message.createdAt).toLocaleTimeString()}
                            </Typography>
                          </React.Fragment>
                        }
                        secondary={message.message}
                        sx={{
                          backgroundColor: isCurrentUser
                            ? "#dcf8c6"
                            : "#ffffff",
                          padding: "10px",
                          borderRadius: "10px",
                          maxWidth: "60%", // Reduce the width
                          alignSelf: isCurrentUser ? "flex-end" : "flex-start",
                          boxShadow: "0px 2px 5px rgba(0,0,0,0.3)", // Add shadow
                        }}
                      />
                      {isCurrentUser && (
                        <ListItemAvatar>
                          <Avatar src={user?.photoURL}>
                            {user?.displayName?.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                      )}
                    </ListItem>
                  </React.Fragment>
                );
              })}
          </List>
          <Box
            sx={{
              display: "flex",
              margin: "0px",
              paddingTop: "20px",
              opacity: "0.8",
              padding: "20px",
              paddingTop: "20px",
              borderTop: "2px solid lightgrey",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            }}
          >
            <TextField
              sx={{ flexGrow: 1, marginRight: 1 }}
              label="Type a message"
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#eb2c27" }}
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </Box>
        </Paper>
      </Container>
    );
};

export default ChatRoom;
