import Tasks from "../models/Tasks.js";

export const getMyTasks = async (req, res, next) => {
  try {
    const tasks = await Tasks.find({ createdBy: req.user._id });

    if (!tasks) return res.status(400).json({ message: "There are not tasks" });
    res.status(200).json(tasks);
    
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  const task = req.body;

  try {
    const newTask = await Tasks.create({ ...task, createdBy: req.user._id });
    res.status(201).json(newTask);
    
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  const { id } = req.params;

  try {
    const task = await Tasks.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!task)
      return res.status(404).json({ message: `This id ${id} doesn't exist` });

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};


export const deleteTask = async (req, res, next) => {

  const { id } = req.params;

  try {
    const task = await Tasks.findByIdAndDelete({ _id: id });

    if (!task)
      return res.status(404).json({ message: `This id ${id} doesn't exist` });

    res.status(200).json({message: "A task has been deleted!"});
  } catch (error) {
    next(error);
  }
};
