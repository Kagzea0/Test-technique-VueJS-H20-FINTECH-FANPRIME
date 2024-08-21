// import de la template todolist depuis le fichier todolist.js
import todolist from './todolist.js';

// Création d'une Vue
new Vue({
    el: '#app',
    components: {
        'todolist': todolist
    }
});