function FireKey(key, shiftkey) {
    if (typeof(key) === "string") {
        this.key = key;
        this.key_code = key.charCodeAt(0);
    } else {
        this.key_code = key;
        this.key = String.fromCharCode(key);
    }
    this.shiftkey = shiftkey;
}


var keymanager = {
    shortcuts: {},
    pressed_keys: [],

    init: function(get_context) {
       manager = this.manager.bind(this)
       document.addEventListener('keypress', manager, false);
       document.addEventListener('keydown', manager, true);
       this.get_context = get_context;
    },

    add_shortcut: function (key, name, on, fire, context, on_input, to_front, visible) {
        if (typeof(key) === "string") {
            var res = [];
            for (var i=0; i<key.length; ++i)
                res.push(key.charCodeAt(i));
            key = res;
        }

        if (on === 'keypress' && key.constructor !== Array)
            key = [key];

        if (!(key in this.shortcuts))
            this.shortcuts[key] = [];

        value = {
            key: key,
            name: name,
            on: on,
            fire: fire,
            context: context,
            on_input: on_input,
            visible: visible || false,
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

            // For exclude context cases
            negate = ctxt[0] === '!';
            if (negate)
                ctxt.shift();

            if (ctxt[0] != current_context)
                continue;

            if (ctxt.length === 1)
                return !negate;

            if (target === ctxt[1])
                return !negate;
        }

        return negate;
    },

    check_string_visibility: function(visible) {
        // Always return true if we don't care about the visibility and return
        // false if we care but it's dependent on the object
        if (typeof(visible) === 'boolean')
            return true
        element = parse_path(visible)[0];
        return is_visible(element);
    },

    check_elem_visibility: function(visible, element) {
        // We don't care about strings, only about booleans
        if (typeof(visible) === 'string')
            return Boolean(element)
        return element && (!visible || is_visible(element));
    },

    clear_keys: function() {
        this.pressed_keys = [];
        this.key_timer = undefined;
    },

    manager: function (event) {
        log('key manager');
        log(event);

        var char = event.which || event.KeyCode || event.charCode || event.key;
        if (typeof(char) === 'string')
            char = char.charCodeAt();
        if (event.type == 'keypress') {
            if (this.key_timer !== undefined)
                clearTimeout(this.key_timer);
            this.pressed_keys.push(char);
            char = this.pressed_keys
        }

        if (event.type == 'keypress') {
            log('Pressed Keys: ' + char);
        } else if (event.type == 'keydown') {
            log('Down Keys: ' + char);
        }

        var stop = false;

        var handlers = this.shortcuts[char] || [];
        if (!Array.isArray(handlers))
            handlers = [handlers];

        for (var i=0; i<handlers.length; ++i) {
            var handler = handlers[i];
            if ((handler.on === event.type) &&
                    (handler.on_input || this.not_input_element(event.target)) &&
                    this.is_in_context(handler.context, event.target) &&
                    this.check_string_visibility(handler.visible)) {
                if (typeof(handler.fire) === 'string') {
                    var element = parse_path(handler.fire)[0];
                    if (this.check_elem_visibility(handler.visible, element)) {
                        log('Click event for ' + handler.fire);
                        element.scrollIntoViewIfNeeded();
                        element.focus();
                        element.click();
                        stop = true;
                    } else {
                        log('Skipping non-visible click event for ' + handler.fire);
                    }

                } else if (handler.fire instanceof FireKey) {
                    log('Firing key ' + handler.fire.key_code);
                    var evt = generate_keyevent('keydown', handler.fire.key_code, handler.fire.shiftkey);
                    event.target.dispatchEvent(evt);
                    stop = true;
                } else {
                    log('Event Fire method ' + handler.fire.name);
                    stop = handler.fire(char, event, handler.context);
                }
                if (stop) {
                    this.clear_keys();
                    event.stopPropagation();
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    return false;
                }
            }
        }

        if (event.type == 'keypress')
            setTimeout(this.clear_keys.bind(this), 1000);
    }
}
