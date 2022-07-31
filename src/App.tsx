import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';  //1. Двумя командами из Конспекта установить библиотеку...


export type FilterValuesType = 'all' | 'active' | 'completed';

export  type todolistsType = {  //  2. Сделать типизацию для таски, Внимание на типизацию Фильтра - НЕ СТРИНГ пишу
    id: string
    title: string
    filter: FilterValuesType
}


function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);

    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    });


    function removeTask(todolistID: string, id: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== id)});

        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})

        // let task = {id: v1(), title: title, isDone: false};
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskId ? {...m, isDone: isDone} : m)})

        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]);
    }

    // let tasksForTodolist = tasks;

    // if (filter === 'active') {
    //     tasksForTodolist = tasks.filter(t => t.isDone === false);
    // }
    // if (filter === 'completed') {
    //     tasksForTodolist = tasks.filter(t => t.isDone === true);
    // }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map(filtered => filtered.id === todolistID ? {...filtered, filter: value} : filtered))

        // setFilter(value);
    }


    return (
        <div className="App">
            {todolists.map((mapTodoLists) => {

                let tasksForTodolist = tasks[mapTodoLists.id];  // 4. Переношу в map переменную для тасок и прилепляю Ключ в квадратных скобках [el.id]
                if (mapTodoLists.filter === 'active') {
                    tasksForTodolist = tasks[mapTodoLists.id].filter(t => !t.isDone);
                }
                if (mapTodoLists.filter === 'completed') {
                    tasksForTodolist = tasks[mapTodoLists.id].filter(t => t.isDone);
                }

                return (
                    <Todolist
                        key={mapTodoLists.id}
                        todolistID={mapTodoLists.id}
                        title={mapTodoLists.title} // 3. Исправляю на {el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={mapTodoLists.filter} // 3. Исправляю на {el.filter}
                    />
                )
            })}

        </div>
    );
}

export default App;
