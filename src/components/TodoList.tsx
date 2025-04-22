import { Box, Card, CardContent, Typography, Stack } from "@mui/material";
import useTodos from "../hooks/useTodos";

const TodoList = () => {
  const { todos } = useTodos();

  return (
    <Box sx={{ p: 3 }}>
      {todos.length === 0 ? (
        <Typography variant="body1">No tasks yet</Typography>
      ) : (
        <Stack spacing={2}>
          {todos.map((todo) => (
            <Card key={todo.id} variant="outlined">
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {todo.task}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {todo.description}
                </Typography>

                {todo.date && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    📅 Date: {todo.date}
                  </Typography>
                )}

                {todo.note && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    📝 Note: {todo.note}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default TodoList;
