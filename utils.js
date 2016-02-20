function log(message) {
    if (DEBUG_MODE)
        console.log(message);
}


function parse_path(path) {
    var methods = {
        'id': 'getElementById',
        'class': 'getElementsByClassName',
        'name': 'getElementsByName',
        'tag': 'getElementsByTagName'
    };
    var paths = path.split('>');
    var last = paths[paths.length - 1].split(':');
    if (last.length > 1) {
        var method_name = methods[last[0]];
        var result = document[method_name](last[1]);
        if (result && result.length)
            result = result[last[2] || 0];
        paths[paths.length - 1] = result;
    }
    return paths;
}


function click(elem) {
  var evt = dispatchEvent(elem, mouseEvent('click', 0, 0, 0, 0));
}


function hover(elem) {
  var evt = dispatchEvent(elem, mouseEvent('mouseover', 0, 0, 0, 0));
}


function mouseEvent(type, sx, sy, cx, cy) {
  var evt;
  var e = {
    bubbles: true,
    cancelable: (type != "mousemove"),
    view: window,
    detail: 0,
    screenX: sx, 
    screenY: sy,
    clientX: cx, 
    clientY: cy,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    button: 0,
    relatedTarget: undefined
  };
  if (typeof( document.createEvent ) == "function") {
    evt = document.createEvent("MouseEvents");
    evt.initMouseEvent(type, 
      e.bubbles, e.cancelable, e.view, e.detail,
      e.screenX, e.screenY, e.clientX, e.clientY,
      e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
      e.button, document.body.parentNode);
  } else if (document.createEventObject) {
    evt = document.createEventObject();
    for (prop in e) {
    evt[prop] = e[prop];
  }
    evt.button = { 0:1, 1:4, 2:2 }[evt.button] || evt.button;
  }
  return evt;
}


function dispatchEvent(el, evt) {
  if (el.dispatchEvent) {
    el.dispatchEvent(evt);
  } else if (el.fireEvent) {
    el.fireEvent('on' + type, evt);
  }
  return evt;
}
