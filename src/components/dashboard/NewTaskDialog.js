import {observer} from "mobx-react-lite";
import {
  Box, Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Select,
  TextField
} from "@mui/material";
import {useCallback, useState} from "react";
import useStore from "../../hooks/useStore";

function NewTaskDialog({open, handleClose = () => {}, activeSection}) {
  const [formState, setFormState] = useState();

  const { users, boards } = useStore();

  const updateFormState = useCallback((event) => {
    const { name, value } = event.target;

    setFormState(prevState => ({
      ...prevState,
      [name]: value ? value.trim() : undefined
    }))
  }, [setFormState])

  const addNewTask = useCallback((event) => {
    event.preventDefault();
    boards.active.addTask(activeSection, formState);
    handleClose();
  }, [formState, boards, activeSection])

  return (
    <Dialog open={open} onClose={handleClose} >
      <DialogTitle>
        Creating a New Task:
      </DialogTitle>
      <form onSubmit={addNewTask}>
        <DialogContent style={{minWidth: 500}}>
          <Box p={1}>
            <TextField
              fullWidth
              required
              type="text"
              name="title"
              label="Title"
              onChange={updateFormState}
              value={formState?.title || ''}
            />
          </Box>
          <Box p={1}>
            <TextField
              fullWidth
              required
              type="text"
              name="description"
              label="Description"
              onChange={updateFormState}
              value={formState?.description || ''}
            />
          </Box>
          <Box p={1}>
            <FormControl fullWidth>
              <FormLabel>
                Assignee
              </FormLabel>
              <Select
                native
                required
                name="assignee"
                value={formState?.assignee || ''}
                onChange={updateFormState}
              >
                <option value='' disabled>
                  -
                </option>
                {users.list.map(user => {
                  return (
                    <option key={user.id} value={user.id}>{user?.name}</option>
                  )
                })}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="secondary"
          >
            Close
          </Button>
          <Button
            type="submit"
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default observer(NewTaskDialog);
