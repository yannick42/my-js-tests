
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

    var div = document.createElement('div');
    var html = (warnings.length ? warnings : ['everything ok']).join('<br/>');
    div.innerHTML = html;
    // Display warnings
    document.body.appendChild(div);
}
