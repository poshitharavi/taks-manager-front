import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Grid, CircularProgress } from "@mui/material";
import { fetchTaskDetails } from "../api/tasks"; // Import the API function
import moment from "moment";

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
  const [task, setTask] = useState<any>(null); // Store task details
  const [loading, setLoading] = useState(false); // Manage loading state
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTaskDetails = async () => {
      if (!user || !taskId) return;

      setLoading(true);
      try {
        const taskData = await fetchTaskDetails(taskId, user.token);
        setTask(taskData.body.task); // Set the task details from response
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
          Task Details
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : task ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <strong>Title:</strong> {task.title}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                <strong>Priority:</strong> {task.priority}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                <strong>Status:</strong> {task.status}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                <strong>Created At:</strong>{" "}
                {moment(task.createdAt).format("MMMM Do YYYY, h:mm a")}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                <strong>Due Date:</strong>{" "}
                {moment(task.dueDate).format("MMMM Do YYYY")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <strong>Assigned User:</strong> {task.user.name} (
                {task.user.email})
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Typography>No task details available.</Typography>
        )}
      </Box>
    </Modal>
  );
};

export default TaskDetailModal;
