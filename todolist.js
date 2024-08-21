const main = {
    template: `
        <div>
            <h1>Todo List</h1>
            <input v-model="newTask" @keyup.enter="addTask" placeholder="New task">

            <button @click="deleteAllTasks">Delete tasks</button>

            <span> {{ completedTasks }} </span> <span> Tasks done </span>

            <span> {{ tasks.length }} </span> <span> Tasks </span>
        

            <ul>
                <li v-for="(task, index) of tasks" :key="index">
                    <input type="checkbox" :class="'taskCheckbox'" v-model="task.completed" @change="updateTask">
                    <span v-if="!editingTask || editingTaskIndex !== index" :class="'taskName'">{{ task.name }}</span>

                    <input :class="'editTask'" v-else v-model="editedTask" @keyup.enter="saveTask(index)">

                    <button @click="editTask(index)">Edit</button>
                    <button @click="deleteTask(index)">Delete</button>
                </li>
            </ul>
        </div>
    `,
    data() {
        return {
            newTask: '',
            tasks: JSON.parse(localStorage.getItem('tasks')) || [],
            editingTask: false,
            editingTaskIndex: null,
            editedTask: '',
            completedTasks: 0
        };
    },
    methods: {
        // Méthode addTask
        addTask() {
            if (this.newTask.trim()) {
                this.tasks.push({ name: this.newTask.trim(), completed: false });
                this.newTask = '';
                this.saveTask();
            }
        },

        // Méthode editTask
        editTask(index) {
            if (this.editingTask && this.editingTaskIndex === index) {
                this.saveTask(index);
            }
            else {
                this.editingTask = true;
                this.editingTaskIndex = index;
                this.editedTask = this.tasks[index].name;    
            }
        },

        // Méthode saveTask
        saveTask(index) {
            if (this.editedTask.trim()) {
                this.tasks[index].name = this.editedTask.trim();
                this.editingTask = false;
                this.editingTaskIndex = null;
                this.editedTask = '';
                this.saveAllTasks();
            }
        },

        // Méthode saveAllTasks
        saveAllTasks() {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },

        // Méthode deleteTask
        deleteTask(index) {
            if (this.tasks[index].completed) {
                this.completedTasks--;
            }
            this.tasks.splice(index, 1);
            this.saveAllTasks();
        },

        // Méthode deleteAllTasks
        deleteAllTasks() {
            this.tasks = [];
            this.completedTasks = 0;
            this.saveAllTasks();
        },

        // Méthode updateTask (si j'ai le temps)
        updateTask() {
            this.completedTasks = this.tasks.filter(task => task.completed).length;
        }        
    },
    created() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.completedTasks = this.tasks.filter(task => task.completed).length;
    }

};

export default main;