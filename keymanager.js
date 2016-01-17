var keymanager = {
    shortcuts: {},

    init: function() {
       manager = this.manager.bind(this)
       document.addEventListener('keypress', manager, false);
       document.addEventListener('keydown', manager, true);
    },

    add_shortcut: function (key, name, on, fire, context, on_input, to_front) {
        if (!(key in this.shortcuts))
            this.shortcuts[key] = [];

        value = {
            key: key,
            name: name,
            on: on,
            fire: fire,
            context: context,
            on_input: on_input
        };

        if (to_front)
            this.shortcuts[key].unshift(value);
        else
            this.shortcuts[key].push(value);
    },

    not_input_element: function(element) {
        return (element.nodeType !== Node.TEXT_NODE &&
                element.nodeName !== 'INPUT' &&
                element.tagName !== 'INPUT');
    },

    manager: function (event) {
        console.log('key manager');
        console.log(event);
        var char = event.key || event.code || event.which || event.keyCode || event.charCode;
        console.log('DePressed: ' + char);

        var was_handled = false;

        var handlers = this.shortcuts[char] || [];
        if (!Array.isArray(handlers))
            handlers = [handlers];

        for (var i=0; i<handlers.length; ++i) {
            var handler = handlers[i];
            if ((handler.on === event.type) && (handler.on_input || this.not_input_element(event.target)) && in_context(handler.context, event)) {
                if (typeof(handler.fire) === 'string') {
                    console.log('Event click');
                    var element = parse_path(handler.fire)[0]
                    element.focus();
                    element.click();
                    stop = true;
                } else {
                    console.log('Event Fire');
                    stop = handler.fire(char, event, handler.context);
                }
                if (stop) {
                    event.stopPropagation();
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    return false;
                }
            }
        }
    }
}
