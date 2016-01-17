window.addEventListener('load', function(){setTimeout(init_evershort, 2000);}, false);

function init_evershort() {
    document.addEventListener('keypress', key_manager, false);
    document.addEventListener('keydown', key_manager, true);
}


var shortcuts = {
    47: {name: 'search', on: 'keypress', fire: 'id:gwt-debug-Sidebar-searchButton-container'},
    97: {name: 'newnote', on: 'keypress', fire: 'id:gwt-debug-Sidebar-newNoteButton-container'},
    98: {name: 'notebooks', on: 'keypress', fire: 'id:gwt-debug-Sidebar-notebooksButton-container'},
    116: {name: 'tags', on: 'keypress', fire: 'id:gwt-debug-Sidebar-tagsButton-container'},
    115: {name: 'shortcuts', on: 'keypress', fire: 'id:gwt-debug-Sidebar-shortcutsButton-container'},
    119: {name: 'workchat', on: 'keypress', fire: 'id:gwt-debug-Sidebar-workChatButton-container'},
    110: {name: 'notes', on: 'keypress', fire: 'id:gwt-debug-Sidebar-notesButton-container'},
    101: {name: 'config', on: 'keypress', context: 'global', on_input: false, fire: 'id:gwt-debug-AccountMenu-avatar'},
    106: {name: 'notes_down', on: 'keypress', context: 'notes', fire: note_down_key},
    107: {name: 'notes_up', on: 'keypress', context: 'notes', fire: note_up_key},
    27: [{name: 'exit_search_field', on: 'keydown', on_input: true, context: ['search>id:gwt-debug-searchViewSearchBox', 'workchat>id:gwt-debug-WorkChatDrawer-drawerFilter-textBox', 'tags>class:focus-drawer-Filter-input', 'notebooks>id:gwt-debug-NotebooksDrawer-drawerFilter-textBox'], fire: exit_field},
         {name: 'cancel_modal_dialog', on: 'keydown', on_input: true, context: 'modal_dialog', fire: modal_dialog_keys}
        ],
    13: {name: 'confirm_modal_dialog', on: 'keydown', on_input: true, context: 'modal_dialog', fire: modal_dialog_keys},
    99: [{name: 'create_tag', on: 'keypress', context: 'tags', fire: 'class:focus-drawer-TagsDrawer-TagsDrawer-create-tag-icon'},
         {name: 'create_chat', on: 'keypress', context: 'workchat', fire: 'id:gwt-debug-WorkChatDrawer-startChatButton'},
         {name: 'create_notebook', on: 'keypress', context: 'notebooks', fire: 'id:gwt-debug-NotebooksDrawer-createNotebookButton'}],
    102: [{name: 'search_tag', on: 'keypress', context: 'tags', fire: 'class:focus-drawer-Filter-placeholder'},
          {name: 'search_note', on: 'keypress', context: 'search', fire: 'id:gwt-debug-searchViewSearchBox'},
          {name: 'search_chat', on: 'keypress', context: 'workchat', fire: 'id:gwt-debug-WorkChatDrawer-drawerFilter-textBox'},
          {name: 'search_notebook', on: 'keypress', context: 'notebooks', fire: search_notebook}], //'id:gwt-debug-NotebooksDrawer-drawerFilter-textBox'}]
    120: [{name: 'clear_search_tag', on: 'keypress', context: 'tags', fire: 'class:focus-drawer-Filter-search-clear'},
          {name: 'clear_search_note', on: 'keypress', context: 'search', fire: clear_search},
          {name: 'clear_search_chat', on: 'keypress', context: 'workchat', fire: clear_search},
          {name: 'clear_search_notebook', on: 'keypress', context: 'notebooks', fire: clear_search}]
};

function modal_dialog_keys(char) {
    if (char === 27) {
        // Try to get it by id
        elem = document.getElementById('gwt-debug-ConfirmationDialog-cancel');
        if (!elem) {
            var footer_elements = document.getElementById('gwt-debug-GlassModalDialog-footer').children[0].children;
            for (var i=0; !elem && i<footer_elements.length; ++i) {
                if (footer_elements[i].textContent.toLowerCase() === 'cancel')
                    elem = footer_elements[i];
            }
        }
    } else {
        elem = document.getElementById('gwt-debug-ConfirmationDialog-confirm');
        if (!elem) {
            var footer_elements = document.getElementById('gwt-debug-GlassModalDialog-footer').children[0].children;
            for (var i=0; !elem && i<footer_elements.length; ++i) {
                computed = window.getComputedStyle(footer_elements[i]);
                if (computed['background-color'] == computed['border-bottom-color'])
                    elem = footer_elements[i];
            }
        }
    }

    if (elem) {
        elem.click();
        return true;
    }
}

function clear_search(char, event, ctxt) {
    var elements = {search: 'id:gwt-debug-searchViewSearchBox',
                    tags: 'class:focus-drawer-Filter-input',
                    workchat: 'id:gwt-debug-WorkChatDrawer-drawerFilter-textBox',
                    notebooks: 'id:gwt-debug-NotebooksDrawer-drawerFilter-textBox'};
    s = parse_path(elements[ctxt])[0];
    if (s && s.nextElementSibling)
        s.nextElementSibling.click();
}

function search_notebook(char, event) {
    var s = document.getElementById('gwt-debug-NotebooksDrawer-drawerFilter-textBox');
    s.focus();
    s.click();
    var s = document.getElementById('gwt-debug-NotebooksDrawer-drawerFilter');
    s.focus();
    s.click();
    return true;
}

function generate_keyevent(type, key, shiftKey, altKey, ctrlKey, metaKey) {
    var padded_key = '0000' + key;
    padded_key = padded_key.slice(padded_key.length < 8? -4:4);
    var evt = new KeyboardEvent(type, {keyIdentifier: "U+" + padded_key, bubbles: true, cancelable: true, isTrusted: true, view: document.defaultView, shiftKey: shiftKey, altKey: altKey, ctrlKey: ctrlKey, metaKey: metaKey, keyCode: key, which: key});
    // Chromium Hack
    Object.defineProperty(evt, 'keyCode', {
                get : function() {
                    return key;
                }
    });
    Object.defineProperty(evt, 'which', {
                get : function() {
                    return key;
                }
    });

     return evt;
}

function exit_field(char, event) {
    var evt = generate_keyevent('keydown', 9, true);
    event.target.dispatchEvent(evt);
    return true;
}

function note_down_key(char, event) {
    var s = document.getElementsByClassName('focus-NotesView-Note-selected');
    s = s && s[0];
    if (s) {
        var element = s.nextElementSibling;
        if (element) {
            element.scrollIntoViewIfNeeded()
            element.click();
        }
    }
    return true;
}

function note_up_key(char, event) {
    var s = document.getElementsByClassName('focus-NotesView-Note-selected');
    s = s && s[0];
    if (s) {
        var element = s.previousElementSibling;
        if (element) {
            element.scrollIntoViewIfNeeded()
            element.click();
        }
    }
    return true;
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


function not_input_element(element) {
    return (element.nodeType !== Node.TEXT_NODE &&
            element.nodeName !== 'INPUT' &&
            element.tagName !== 'INPUT');
}

function is_visible(id) {
    var s = document.getElementById(id);
    return s && window.getComputedStyle(s).visibility === 'visible';
}

function in_context(context, event) {
    var current_context = undefined;
    if (!context || context === 'global')
        return true;

    if (is_visible('gwt-debug-GlassModalDialog-container'))
        current_context = 'modal_dialog';
    else if (document.getElementById('gwt-debug-NotebooksDrawer-createNotebookButton'))
        current_context = 'notebooks';
    else if (document.getElementById('gwt-debug-WorkChatDrawer-startChatButton'))
        current_context = 'workchat';
    else if (is_visible('gwt-debug-ShortcutsDrawer-title'))
        current_context = 'shortcuts';
    else if (document.getElementsByClassName('focus-drawer-TagsDrawer-TagsDrawer-create-tag-icon').length)
        current_context = 'tags';
    else {
        var s = document.getElementById('gwt-debug-searchViewSearchBox');
        if (window.getComputedStyle(s.parentElement.parentElement.parentElement).overflow === 'visible')
            current_context = 'search';
        else if (document.getElementById('gwt-debug-NotesHeader-title'))
            current_context = 'notes';
    }

    if (!Array.isArray(context))
        context = [context];

    for (var i=0; i<context.length; ++i) {
        var ctxt = parse_path(context[i]);

        if (ctxt[0] != current_context)
            continue;

        if (ctxt.length === 1)
            return true;

        if (event.target === ctxt[1])
            return true;
    }

    //s = document.getElementsByClassName('focus-drawer-TagsDrawer-TagsDrawer-header')[0].children[0].textContent
    //s.children[0].textContent

    return false;
}


function key_manager(event) {
    console.log('key manager');
    console.log(event);
    var char = event.key || event.code || event.which || event.keyCode || event.charCode;
    console.log('Pressed: ' + char);

    var was_handled = false;

    var handlers = shortcuts[char] || [];
    if (!Array.isArray(handlers))
        handlers = [handlers];

    for (var i=0; i<handlers.length; ++i) {
        var handler = handlers[i];
        if ((handler.on === event.type) && (handler.on_input || not_input_element(event.target)) && in_context(handler.context, event)) {
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
