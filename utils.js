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


