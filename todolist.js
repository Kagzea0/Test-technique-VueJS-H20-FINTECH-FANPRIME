const main = {
    template: `
        <div>
            <h1>Todo List</h1>

            <input v-model="newTask" @keyup.enter="addTask" placeholder="New task">

            <!-- Bouton pour supprimer toutes les tâches -->
            <button @click="ClearTasks">Delete tasks</button>

            <!-- Affichage du nombre de tâches complétées -->
            <span>  </span>
            <span> Tasks done </span>
            
            <!-- Affichage du nombre de tâches en tout -->
            <span>  </span>
            <span> Tasks </span>

            <ul>
                <li>
                
                </li>
            </ul>
        </div>
    `,
    data() {
        return {
            newTask: '',
            tasks: []
        };
    },
    methods: {
        // Méthode addTask
        // Méthode editTask
        // Méthode saveTask
        // Méthode saveAllTasks
        // Méthode deleteTask
        // Méthode deleteAllTasks

        // Méthode updateTask (si j'ai le temps)
    }
};

export default main;