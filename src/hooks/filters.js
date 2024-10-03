const today = new Date().setHours(0, 0, 0, 0);

export const filterPastTasks = (tasks) => {
  return tasks.filter((task) => new Date(task.date).getTime() < today);
};

export const filterTodayTasks = (tasks) => {
  return tasks.filter(
    (task) => new Date(task.date).setHours(0, 0, 0, 0) === today
  );
};

export const filterUpcomingTasks = (tasks) => {
  return tasks.filter(
    (task) => new Date(task.date).setHours(0, 0, 0, 0) > today
  );
};
