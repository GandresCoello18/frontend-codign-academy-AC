const btnAgregarElement = document.getElementById('btn-agregar');
const listaTareaElement = document.getElementById('lista');
const inputTareaElement = document.getElementById('tarea');
const LOCAL_STORAGE_KEY = 'lista-de-compras';

const local = localStorage.getItem(LOCAL_STORAGE_KEY);
const lista = JSON.parse(local) || [];

window.addEventListener('load', () => {
    lista.forEach(tarea => {
        const tareaElement = crearTareaElement(tarea);
        listaTareaElement.appendChild(tareaElement);
    })
});

btnAgregarElement.addEventListener('click', () => {
    agregarTareaALista();
});

inputTareaElement.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        agregarTareaALista();
    }
});

const agregarTareaALista = () => {
    const valueInputTarea = inputTareaElement.value.trim();

    // Validar que se escriba una tarea
    if (!valueInputTarea) {
        alert('Debes ingresar una tarea');
        return;
    }

    // validar que la tarea no sea un numero
    if (!isNaN(Number(valueInputTarea))) {
        alert('Debes ingresar una tarea valida');
        return;
    }

    // crear nuevo elemento con js
    const tarea = crearTareaElement(valueInputTarea);

    // crear acción de eliminar
    const btnEliminarTarea = document.createElement('button');
    btnEliminarTarea.innerText = 'Eliminar';
    btnEliminarTarea.style.marginLeft = '10px';
    btnEliminarTarea.addEventListener('click', () => {
        listaTareaElement.removeChild(tarea);
    })

    // crear acción de marcado
    const btnMarkTarea = document.createElement('button');
    btnMarkTarea.innerText = 'Completar';
    btnMarkTarea.style.marginLeft = '10px';
    btnMarkTarea.addEventListener('click', () => {
        tarea.classList.toggle('completed');
    })

    // insertar elemento a html
    tarea.appendChild(btnMarkTarea);
    tarea.appendChild(btnEliminarTarea);
    listaTareaElement.appendChild(tarea);

    // limpiar input
    inputTareaElement.value = '';

    // guardar lista
    lista.push(valueInputTarea);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lista));
}

const crearTareaElement = (value) => {
    const tarea = document.createElement('li');
    tarea.innerText = value;
    return tarea;
}