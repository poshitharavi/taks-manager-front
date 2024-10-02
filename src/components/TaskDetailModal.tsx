import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import { fetchTaskDetails, updateTask } from "../api/tasks"; // Import the updateTask API
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";

interface TaskDetailModalProps {
  user: { token: string } | null;
  open: boolean;
  handleClose: () => void;
  taskId: number | null;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  user,
  open,
  handleClose,
  taskId,
}) => {
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState<Moment | null>(moment());

  useEffect(() => {
    const getTaskDetails = async () => {
      if (!user || !taskId) return;

      setLoading(true);
      try {
        const taskData = await fetchTaskDetails(taskId, user.token);
        setTask(taskData.body.task);
        // Set initial editable field values
        setTitle(taskData.body.task.title);
        setPriority(taskData.body.task.priority);
        setStatus(taskData.body.task.status);
        setDueDate(moment(taskData.body.task.dueDate));
      } catch (error) {
        setError("Failed to fetch task details.");
      } finally {
        setLoading(false);
      }
    };

    if (open && taskId) {
      getTaskDetails();
    }
  }, [user, taskId, open]);

  const handleSave = async () => {
    if (!user || !taskId) return;

    const updatedTaskData = {
      title,
      priority,
      dueDate: dueDate
        ? dueDate.format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD"),
      status,
    };

    setLoading(true);
    try {
      await updateTask(taskId, updatedTaskData, user.token);
      setIsEditing(false);
      handleClose();
    } catch (error) {
      alert("Failed to update task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      aria-labelledby="task-detail-modal-title"
      aria-describedby="task-detail-modal-description"
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
        <Typography variant="h6" id="task-detail-modal-title" sx={{ mb: 2 }}>
          {isEditing ? "Edit Task" : "Task Details"}
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : task ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={!isEditing}
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
                disabled={!isEditing}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Status"
                variant="outlined"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={!isEditing}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in_progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Due Date"
                  value={dueDate}
                  onChange={(newValue) => setDueDate(newValue)}
                  disabled={!isEditing}
                />
              </LocalizationProvider>
            </Grid>

            {isEditing ? (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3 }}
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  sx={{ mt: 1 }}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3 }}
                  onClick={() => setIsEditing(true)}
                >
                  Edit Task
                </Button>
              </Grid>
            )}
          </Grid>
        ) : (
          <Typography>No task details available.</Typography>
        )}
      </Box>
    </Modal>
  );
};

export default TaskDetailModal;
