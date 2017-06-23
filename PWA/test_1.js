
function checkAvailability() {

    var warnings = [];

    // FF44+, CH45+
    if(!('serviceWorker' in navigator)) {
        warnings.push('service worker not available in this browser');
    }
    // Edge14+, FF39+, CH42+
    if(!('fetch' in window)) {
        warnings.push('fetch API not available in this browser');
    }

    var span = document.createElement('span');
    var html = (warnings.length ? warnings : ['everything ok']).join('<br/>');
    span.innerHTML = html;
    // Display warnings
    document.querySelector('#tile_1 > .tileContent').appendChild(span);
}

function addUIEvents() {

    for(var i = 1; i <= 6; i++) {
        addTileEvents(document.getElementById('tile_' + i));
    }

}

function addTileEvents(tile) {

    var funcStart = function(evt) {
        evt.preventDefault(); // pour ne pas déclencher l'évenèment souris, et que cette evenements ne soit lancé qu'une fois...
        var touches = evt.changedTouches;
        if(touches) {
            window.myX = touches[0].clientX;
        }else{
            window.myX = evt.clientX;
            document.body.addEventListener("mousemove", funcMove, false);
        }
    };
    var funcCancel = function(evt) {
        evt.preventDefault();
        var touches = evt.changedTouches;
        tile.classList.add('animate');
        tile.style.transform = 'rotateY(0deg)';
        document.body.removeEventListener("mousemove", funcMove, false);
        setTimeout(function() { tile.classList.remove('animate') }, 1000);
    };
    var funcMove = function(evt) {
        evt.preventDefault();
        var touches = evt.changedTouches;
        if(touches) {
            pos = touches[0].clientX;
        }else{
            pos = evt.clientX;
            document.body.addEventListener("mouseup", funcCancel, false);
        }
        var deg = ((pos - window.myX)/4)%110;
        tile.style.transform = 'rotateY('+deg+'deg)';
    };

    // Touch Events
    tile.addEventListener('touchstart', funcStart, false);
    tile.addEventListener("touchend", funcCancel, false);
    tile.addEventListener("touchcancel", funcCancel, false);
    tile.addEventListener("touchleave", funcCancel, false);
    tile.addEventListener("touchmove", funcMove, false); // On bouge le doigt

    // clicks
    tile.addEventListener('mousedown', funcStart, false);
}

function writeToTile(tileNumber, className, value) {
    var tileEl = document.getElementById('tile_'+tileNumber);
    var content = tileEl.querySelector('.'+className);
    if(!content) {
        var span = document.createElement('span');
        span.className = className;
        span.innerHTML = value;
        tileEl.querySelector('.tileContent').appendChild(span);
    }else{
        content.innerHTML = value;
    }
}
