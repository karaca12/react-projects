import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupsIcon from "@mui/icons-material/Groups";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

export default function Sidebar({ state, setState, toggleDrawer }) {
  const navigate = useNavigate();
  const { user } = useUser();
  const list = (anchor) => (
    <Box
      sx={{ width: 400 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItemButton onClick={() => navigate("/home")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>My Courses</ListItemText>
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/profile")}>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/courses")}>
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText>All Courses</ListItemText>
        </ListItemButton>

        {user && user.userRole === "Lecturer" ? (
          <>
            <ListItemButton onClick={() => navigate("/courseadd")}>
              <ListItemIcon>
                <NoteAddIcon />
              </ListItemIcon>
              <ListItemText>Add Course</ListItemText>
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/coursedelete")}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText>Delete Course</ListItemText>
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/courseupdate")}>
              <ListItemIcon>
                <EditNoteIcon />
              </ListItemIcon>
              <ListItemText>Update Course</ListItemText>
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/students")}>
              <ListItemIcon>
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText>Students</ListItemText>
            </ListItemButton>
          </>
        ) : (
          <>
            <ListItemButton onClick={() => navigate("/enrollment")}>
              <ListItemIcon>
                <LibraryAddIcon />
              </ListItemIcon>
              <ListItemText>Course Enrollment</ListItemText>
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/drop")}>
              <ListItemIcon>
                <RemoveCircleIcon />
              </ListItemIcon>
              <ListItemText>Drop Course</ListItemText>
            </ListItemButton>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
