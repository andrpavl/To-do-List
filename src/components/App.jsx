import { useEffect, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Todo from './Todo';
import { db } from './firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#70216b] to-[#b9821a]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4 `,
  heading: `text-3xl font-bold text-center text-stone-600 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl rounded-md`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100 rounded-md`,
  count: `text-center p-2 italic`,
};

export const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const read = onSnapshot(q, querySnapshot => {
      let todosArr = [];
      querySnapshot.forEach(doc => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => read();
  }, []);

  const toggleComplete = async todo => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  const addTodo = async e => {
    e.preventDefault();
    if (input === '') {
      alert('Please enter a new todo');
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    });
    setInput('');
  };

  const deleteTodo = async id => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={addTodo} className={style.form}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            type="text"
            placeholder="Add Todo"
            className={style.input}
          />
          <button className={style.button}>
            <AiOutlinePlusCircle size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        {todos.length < 1 ? null : (
          <p className={style.count}>You have {todos.length} todos</p>
        )}
      </div>
    </div>
  );
};
