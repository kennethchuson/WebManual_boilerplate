var draggedElement;

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    draggedElement = event.target;
}

function dragEnd(event) {
    var element = event.target;
    element.classList.remove("dragging");
}

function drop(event) {
    event.preventDefault();
    var target = event.target;

    if (target.classList.contains("card")) {
        target = target.parentNode;
    }

    if (target.classList.contains("box")) {
        target.appendChild(draggedElement);
    }
}