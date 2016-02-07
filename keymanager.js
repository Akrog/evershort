var keymanager = {
    shortcuts: {},

    init: function(get_context) {
       manager = this.manager.bind(this)
       document.addEventListener('keypress', manager, false);
       document.addEventListener('keydown', manager, true);
       this.get_context = get_context;
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

    is_in_context: function (context, target) {
        if (!context || context === 'global')
            return true;

        current_context = this.get_context();

        if (!Array.isArray(context))
            context = [context];

        for (var i=0; i<context.length; ++i) {
            var ctxt = parse_path(context[i]);

            if (ctxt[0] != current_context)
                continue;

            if (ctxt.length === 1)
                return true;

            if (target === ctxt[1])
                return true;
        }

        return false;
    },

    manager: function (event) {
        log('key manager');
        log(event);
        var char = event.key || event.which || event.KeyCode || event.charCode;
        log('DePressed: ' + char);

        var was_handled = false;

        var handlers = this.shortcuts[char] || [];
        if (!Array.isArray(handlers))
            handlers = [handlers];

        for (var i=0; i<handlers.length; ++i) {
            var handler = handlers[i];
            if ((handler.on === event.type) &&
                    (handler.on_input || this.not_input_element(event.target)) &&
                    this.is_in_context(handler.context, event.target)) {
                if (typeof(handler.fire) === 'string') {
                    log('Event click');
                    var element = parse_path(handler.fire)[0]
                    element.focus();
                    element.click();
                    stop = true;
                } else {
                    log('Event Fire');
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
