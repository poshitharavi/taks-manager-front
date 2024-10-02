import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import moment, { Moment } from "moment"; // Import moment
import { saveTask } from "../api";

// Define an interface for the user
interface User {
  token: string;
}

// Define props for the AddTaskModal component
interface AddTaskModalProps {
  user: User | null;
  open: boolean;
  handleClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  user,
  open,
  handleClose,
}) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  //   const [dueDate, setDueDate] = useState<Moment | null>(null); // Use Moment type

  const handleSubmit = async () => {
    if (!title || !user) {
      alert("Please fill in all fields");
      return;
    }

    const taskData = {
      title,
      priority,
      dueDate: "2027-10-02",
    };

    try {
      await saveTask(taskData, user.token);
      alert("Task saved successfully!");
      handleClose();
      // Reset fields after saving
      setTitle("");
      setPriority("medium");
      //   setDueDate(null);
    } catch (error) {
      alert("Failed to save task.");
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        aria-labelledby="add-task-modal-title"
        aria-describedby="add-task-modal-description"
        disableEnforceFocus
        disableEscapeKeyDown
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" id="add-task-modal-title" sx={{ mb: 2 }}>
            Add New Task
          </Typography>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            fullWidth
            label="Priority"
            variant="outlined"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
          {/* <DatePicker
            label="Due Date"
            value={dueDate ? dueDate.toDate() : null} // Convert Moment to Date for DatePicker
            onChange={(newValue) => {
              if (newValue) {
                setDueDate(moment(newValue)); // Set due date as a Moment object
              } else {
                setDueDate(null); // Handle null case
              }
            }}
            renderInput={(params: any) => (
              <TextField {...params} fullWidth sx={{ mb: 2 }} />
            )}
          /> */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Save Task
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddTaskModal;
