const main = {
    template: `
        <div>
            <h1>VueJs To-Do List</h1>
            <input v-model="newTask" @keyup.enter="addTask" placeholder="New task" :id="'addTask'">

            <button @click="deleteAllTasks" :id="'deleteAllTasks'">Delete tasks</button>

            <span :id="'completedTasks'">{{ completedTasks }} Tasks done</span>

            <span :id="'tasks'"> {{ tasks.length }} Tasks </span>

            <ul>
                <li v-for="(task, index) of tasks" :key="index">
                    <input type="checkbox" :class="'taskCheckbox'" v-model="task.completed" @change="updateTask" id="taskCheckbox">
                    <label for="taskCheckbox">
                        <img :src="task.completed ? 'Assets/Croix.svg' : 'Assets/Coche.svg'" alt="Edit" width="20" height="20">                    
                    </label>  

                    <span v-if="!editingTask || editingTaskIndex !== index" :id="'taskName'">{{ task.name }}</span>

                    <input :id="'editTask'" v-else v-model="editedTask" @keyup.enter="saveTask(index)">

                    <div :class="'container'">
                        <button @click="editTask(index)" :id="'butEditTask'">
                            <img src="Assets/Crayon.svg" alt="Edit" width="20" height="20">
                        </button>

                        <button @click="deleteTask(index)" :id="'butDeleteTask'">    
                            <img src="Assets/Poubelle.svg" alt="Edit" width="20" height="20">
                        </button>
                    </div>
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
                this.saveAllTasks();
                window.location.reload();
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

        // Méthode updateTask
        updateTask() {
            this.completedTasks = this.tasks.filter(task => task.completed).length;
        }
    },
    created() {
        this.completedTasks = this.tasks.filter(task => task.completed).length;
    }
};

export default main;