export class Todo {
  id = 0;
  todoName = '';
  comment: Comment[];
}

export class Comment {
  text = '';
  mark: number;
}

export const todoList: Todo[] = [
  {
    id: 1,
    todoName: 'learn tour of heroes',
    comment: [
      {text: 'Step 1',  mark: 5},
      {text: 'Step 2', mark: 3},
    ]
  },
  {
    id: 2,
    todoName: 'learn fundametals',
    comment: [
      {text: 'Step 1',  mark: 5},
      {text: 'Step 2', mark: 4},
    ]
  },
  {
    id: 3,
    todoName: 'learn routing',
    comment: [
      {text: 'Step 1',  mark: 5},
      {text: 'Step 1', mark: 4},
    ]
  },
];

export const marks = [1, 2, 3, 4, 5];
