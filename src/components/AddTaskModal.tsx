import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Grid,
} from "@mui/material";
import { saveTask } from "../api";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Moment } from "moment";
import moment from "moment";

interface User {
  token: string;
}

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
  const [dueDate, setDueDate] = React.useState<Moment | null>(moment());

  const handleSubmit = async () => {
    if (!title || !user) {
      alert("Please fill in all fields");
      return;
    }

    const taskData = {
      title,
      priority,
      dueDate: dueDate
        ? dueDate.format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD"),
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Priority"
                variant="outlined"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Due Date"
                  value={dueDate}
                  onChange={(newValue) => setDueDate(newValue)}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
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
