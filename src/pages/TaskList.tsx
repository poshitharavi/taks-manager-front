import React, { useEffect, useState, useContext } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Typography,
  CircularProgress,
  Box,
  Button,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import { UserContext } from "../context/UserContext";
import { fetchAllTasks } from "../api";
import AddTaskModal from "../components/AddTaskModal";
import moment from "moment";

interface Task {
  id: number;
  title: string;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  userId: string;
  user: {
    name: string;
    email: string;
  };
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);

  const handleOpenAddTaskModal = () => setOpenAddTaskModal(true);
  const handleCloseAddTaskModal = () => setOpenAddTaskModal(false);

  const { user } = useContext(UserContext)!;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const loadTasks = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const tasksData = await fetchAllTasks(user.token);
      if (tasksData.body && tasksData.body.tasks) {
        const modifiedTasks = tasksData.body.tasks.map((task: Task) => ({
          ...task,
          name: task.user.name,
          dueDate: moment(task.dueDate).format("YYYY-MM-DD"),
        }));
        setTasks(modifiedTasks);
      } else {
        console.error("Unexpected data format:", tasksData);
      }
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetails = (taskId: number) => {
    alert(`Task Details for ID: ${taskId}`);
  };

  const handleDelete = (taskId: number) => {
    alert(`Task deleted with ID: ${taskId}`);
    // Implement actual delete logic here
  };

  useEffect(() => {
    if (!openAddTaskModal) {
      loadTasks();
    }
  }, [openAddTaskModal, user]);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      editable: false,
    },
    {
      field: "title",
      headerName: "Title",
      flex: isMobile ? 1 : 0.6,
      editable: false,
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: isMobile ? 1 : 0.4,
      editable: false,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      flex: isMobile ? 1 : 0.4,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      flex: isMobile ? 0.7 : 0.4,
      editable: false,
      type: "string",
    },
    {
      field: "name",
      headerName: "User",
      flex: isMobile ? 0.7 : 0.4,
      editable: false,
      type: "string",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        const taskId = params.row.id;
        return (
          <Box>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleDetails(taskId)}
              sx={{ marginRight: 1 }}
            >
              Details
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => handleDelete(taskId)}
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          component="h2"
          sx={{ marginBottom: 2, textAlign: "center" }}
        >
          Task List
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ padding: "10px 20px" }}
            onClick={handleOpenAddTaskModal}
          >
            Add Task
          </Button>
        </Box>
        <AddTaskModal
          user={user}
          open={openAddTaskModal}
          handleClose={handleCloseAddTaskModal}
        />
        <DataGrid
          rows={tasks}
          columns={columns}
          autoHeight
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          sx={{
            boxShadow: 2,
            borderRadius: 2,
            border: "1px solid #050505",
          }}
        />
      </Box>
    </Container>
  );
};

export default TaskList;
