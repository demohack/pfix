//
// problems
//
// 1. dragging and resizing does not work under mobile touch,
//    not sure if its due to touch events not firing the click events
//    or due to fat fingers.
//

// Make the DIV element draggable:
function dragElement(el) {

    //
    // resizable referenced from:
    // http://jsfiddle.net/3jMQD/
    //

    // this odd call to add event init() and then to remove it means the resizer div is only added once
    // this code acts like a class constructor
    el.addEventListener('click', function init() {
        el.removeEventListener('click', init, false);

        var resizer = document.createElement('div');
        resizer.addEventListener('mousedown', resizeInitOnMouseDown, false);

        el.appendChild(resizer);

        el.classList.add('resizable');
        resizer.className = 'resizer';
    }, false);

    var startX = 0,
        startY = 0,
        startWidth = 0,
        startHeight = 0;

    function resizeInitOnMouseDown(e) {
        startX = e.clientX;
        startY = e.clientY;

        startWidth = parseInt(document.defaultView.getComputedStyle(el).width, 10);
        startHeight = parseInt(document.defaultView.getComputedStyle(el).height, 10);

        document.addEventListener('mousemove', resizeOnMouseMove, false);
        document.addEventListener('mouseup', resizeStopOnMouseUp, false);
    }

    function resizeOnMouseMove(e) {
        el.style.width = (startWidth + e.clientX - startX) + 'px';
        el.style.height = (startHeight + e.clientY - startY) + 'px';
        el.style.fontSize = (startHeight + e.clientY - startY) - 20 + 'px'; // addition
    }

    function resizeStopOnMouseUp(e) {
        document.removeEventListener('mousemove', resizeOnMouseMove, false);
        document.removeEventListener('mouseup', resizeStopOnMouseUp, false);
    }

    //
    // draggable referenced from:
    // https://www.w3schools.com/howto/howto_js_draggable.asp
    //

    let div = document.querySelector(`#${el.id} ` + ".mydivheader");

    if (div) {
        // if present, the header is where you move the DIV from:
        div.addEventListener('mousedown', dragStartOnMouseDown, false);
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        el.addEventListener('mousedown', dragStartOnMouseDown, false);
    }

    var offsetX = 0,
        offsetY = 0,
        startX = 0,
        startY = 0;

    function dragStartOnMouseDown(e) {
        e = e || window.event;
        e.preventDefault();

        // get the mouse cursor position at startup:
        startX = e.clientX;
        startY = e.clientY;

        // call a function whenever the cursor moves:
        document.addEventListener('mousemove', dragOnMouseMove, false);

        // terminate the event sequence
        document.addEventListener('mouseup', dragStopOnMouseUp, false);
    }

    function dragOnMouseMove(e) {
        e = e || window.event;
        e.preventDefault();

        // calculate the new cursor position:
        offsetX = startX - e.clientX;
        offsetY = startY - e.clientY;
        startX = e.clientX;
        startY = e.clientY;

        // set the element's new position:
        el.style.left = (el.offsetLeft - offsetX) + "px";
        el.style.top = (el.offsetTop - offsetY) + "px";
    }

    function dragStopOnMouseUp() {
        // stop moving when mouse button is released:
        document.removeEventListener('mousemove', dragOnMouseMove, false);
        document.removeEventListener('mouseup', dragStopOnMouseUp, false);
    }
}

dragElement(document.querySelector("#previewTXT1"));
dragElement(document.querySelector("#previewTXT2"));
