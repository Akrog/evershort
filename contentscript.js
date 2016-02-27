DEBUG_MODE = false;

window.addEventListener('load', function(){setTimeout(init_evershort, 2000);}, false);


var keys = [
    {key: '/', name: 'search', on: 'keypress', fire: 'id:gwt-debug-Sidebar-searchButton-container'},  // Keycode 47
    {key: 'A', name: 'newnote', on: 'keypress', fire: 'id:gwt-debug-Sidebar-newNoteButton-container'},  // Keycode 97
    {key: 'B', name: 'notebooks', on: 'keypress', fire: 'id:gwt-debug-Sidebar-notebooksButton-container'},  // Keycode 98
    {key: 'T', name: 'tags', on: 'keypress', fire: 'id:gwt-debug-Sidebar-tagsButton-container'},  // Keycode 116
    {key: 'S', name: 'shortcuts', on: 'keypress', fire: 'id:gwt-debug-Sidebar-shortcutsButton-container'},  // Keycode 115
    {key: 'W', name: 'workchat', on: 'keypress', fire: 'id:gwt-debug-Sidebar-workChatButton-container'},  // Keycode 119
    {key: 'N', name: 'notes', on: 'keypress', fire: 'id:gwt-debug-Sidebar-notesButton-container'},  // Keycode 110
    {key: 'C', name: 'config', on: 'keypress', context: 'global', on_input: false, fire: 'id:gwt-debug-AccountMenu-avatar'},  // Keycode 101
    {key: 'j', name: 'notes_down', on: 'keypress', context: ['notes', 'search'], fire: note_down_key},  // Keycode 106
    {key: 'k', name: 'notes_up', on: 'keypress', context: ['notes', 'search'], fire: note_up_key},  // Keycode 107
    {key: 'l', name: 'notes_edit', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NoteContentEditorView-root', visible: true},  // Keycode 107
    {key: 'c', name: 'notes_title', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NoteTitleView-textBox', visible: true},  // Keycode 107
    {key: 27, name: 'exit_note', on: 'keydown', on_input: true, context: 'editor', fire: 'id:gwt-debug-sidebar'},  // Keycode 107
    {key: 'e', name: 'email_note', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NoteSharingView-root', visible: true},
    {key: 's', name: 'star_note', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NoteAttributes-shortcutButton', visible: true},
    {key: 'i', name: 'info_note', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NoteAttributes-infoButton', visible: true},
    {key: 'd', name: 'delete_note', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NoteAttributes-trashButton', visible: true},
    {key: 'r', name: 'remind_note', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NoteAttributes-reminderButton', visible: true},
    {key: 'b', name: 'move_note', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NotebookSelectMenu-notebookName', visible: true},
    {key: 't', name: 'tag_note', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NoteTagsView-tagInputBox', visible: true},
    {key: 13, name: 'exec_move_note', on: 'keydown', on_input: true, context: ['notes>id:gwt-debug-NotebookSelectMenu-filter-textBox', 'search>id:gwt-debug-NotebookSelectMenu-filter-textBox'], fire: exec_move_note, visible: true},
    {key: 27, name: 'exit_move_note', on: 'keydown', on_input: true, context: ['notes>class:qa-ResizingSuggestLozenge-input', 'search>class:qa-ResizingSuggestLozenge-input'], fire: exit_tag_note, visible: true},
    {key: 27, name: 'exit_search_field', on: 'keydown', on_input: true, context: ['search>id:gwt-debug-searchViewSearchBox', 'workchat>id:gwt-debug-WorkChatDrawer-drawerFilter-textBox', 'tags>class:focus-drawer-Filter-input', 'notebooks>id:gwt-debug-NotebooksDrawer-drawerFilter-textBox', 'notes>id:gwt-debug-NoteTitleView-textBox', 'search>id:gwt-debug-NoteTitleView-textBox'], fire: new FireKey(9)},
    {key: 27, name: 'cancel_modal_dialog', on: 'keydown', on_input: true, context: 'modal_dialog', fire: modal_dialog_keys},
    {key: 13, name: 'confirm_modal_dialog', on: 'keydown', on_input: true, context: 'modal_dialog', fire: modal_dialog_keys},
    {key: 13, name: 'exec_search', on: 'keydown', on_input: true, context: 'notebooks>id:gwt-debug-NotebooksDrawer-drawerFilter-textBox', fire: exec_search_notebook},
    {key: 'j', name: 'notebook_down', on: 'keypress', context: 'notebooks', fire: notebook_down_key},
    {key: 'k', name: 'notebook_up', on: 'keypress', context: 'notebooks', fire: notebook_up_key},
    {key: 13, name: 'notebook_select', on: 'keypress', context: 'notebooks', fire: notebook_select},
    {key: 'l', name: 'notebook_select', on: 'keypress', context: 'notebooks', fire: notebook_select},
    {key: 'd', name: 'delete_notebook', on: 'keypress', context: 'notebooks', fire: notebook_delete},
    {key: 'e', name: 'email_notebook', on: 'keypress', context: 'notebooks', fire: notebook_email},
    {key: 's', name: 'star_notebook', on: 'keypress', context: 'notebooks', fire: notebook_star},
    {key: 'a', name: 'create_tag', on: 'keypress', context: 'tags', fire: 'class:focus-drawer-TagsDrawer-TagsDrawer-create-tag-icon'},  // Keycode 99
    {key: 'a', name: 'create_chat', on: 'keypress', context: 'workchat', fire: 'id:gwt-debug-WorkChatDrawer-startChatButton'},  // Keycode 99
    {key: 'a', name: 'create_notebook', on: 'keypress', context: 'notebooks', fire: 'id:gwt-debug-NotebooksDrawer-createNotebookButton'},  // Keycode 99
    {key: 'f', name: 'search_tag', on: 'keypress', context: 'tags', fire: 'class:focus-drawer-Filter-placeholder'},  // Keycode 102
    {key: 'w', name: 'search_scope', on: 'keypress', context: 'search', fire: 'id:gwt-debug-activeScopeContainer'},
    {key: 'a', name: 'save_search', on: 'keypress', context: 'search', fire: save_search},
    {key: 'f', name: 'search_note', on: 'keypress', context: 'search', fire: 'id:gwt-debug-searchViewSearchBox'},  // Keycode 102
    {key: 'f', name: 'search_chat', on: 'keypress', context: 'workchat', fire: 'id:gwt-debug-WorkChatDrawer-drawerFilter-textBox'},  // Keycode 102
    {key: 'f', name: 'search_notebook', on: 'keypress', context: 'notebooks', fire: search_notebook},   // Keycode 102  //'id:gwt-debug-NotebooksDrawer-drawerFilter-textBox'}]
    {key: 'x', name: 'clear_search_tag', on: 'keypress', context: 'tags', fire: 'class:focus-drawer-Filter-search-clear'},  // Keycode 120
    {key: 'x', name: 'clear_search_note', on: 'keypress', context: 'search', fire: clear_search},  // Keycode 120
    {key: 'x', name: 'clear_search_chat', on: 'keypress', context: 'workchat', fire: clear_search},  // Keycode 120
    {key: 'x', name: 'clear_search_notebook', on: 'keypress', context: 'notebooks', fire: clear_search}  // Keycode 120
]


var observer = undefined;


function tinymce_listener(evnt) {
    var char = evnt.key || evnt.which || evnt.KeyCode || evnt.charCode;
    if (char === 27)
        return exit_field(27, evnt);
}


function tinymce_observer(mutations) {
    mutations.forEach(function(mutation) {
        for (var i = 0; i < mutation.addedNodes.length; i++) {
            iframe = mutation.target && search_by_id(mutation.addedNodes[i], 'entinymce_170_ifr');
            if (iframe) {
                var result = add_tinymce_listener(iframe);
                if (result) {
                    observer.disconnect();
                    return;
                }
            }
        }
    })
}


function add_tinymce_listener(iframe) {
    var doc = iframe && iframe.contentDocument;
    var tinymce = doc && doc.getElementById('tinymce');
    if (tinymce)
        tinymce.addEventListener('keydown', tinymce_listener, true);
    return tinymce;
}


function init_evershort() {
    keymanager.init(get_context);
    for (var i=0; i<keys.length; ++i) {
        var value = keys[i];
        keymanager.add_shortcut(value.key, value.name, value.on, value.fire, value.context, value.on_input, value.to_front, value.visible);
    }

    // Now we need to add the key listener for the tinymce because it's in
    // another document (iframe)
    var iframe = document.getElementById('entinymce_170_ifr');

    if (iframe) {
        // If we were able to add the key listener we are finished
        if (add_tinymce_listener(iframe))
            return;
    }

    // If it's not there yet, add an observer that will add our listener later
    var editor = document.getElementById('gwt-debug-NoteContentEditorView-root');
    observer = new MutationObserver(tinymce_observer);
    observer.observe(editor, { childList: true, subtree: true });
}


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
    return true;
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


function exit_tag_note(char, event) {
    var field = document.getElementsByClassName('qa-ResizingSuggestLozenge-input');
    field = field && field[0];
    if (field && is_visible(field)) {
        // Empty the tag field to avoid adding this new tag
        field.value = '';
        // Hide the popup if it's vissible
        var popup = document.getElementsByClassName('suggestPopupTop');
        var popup_group = search_up_by_style(popup && popup[0], 'visibility', 'visible'); 
        if (popup_group)
            popup_group.style.visibility = 'hidden';
        // Fired the ESC char
        exit_field(char, event);
        return true;
    }
}


function save_search(char, event) {
    field = document.getElementById('gwt-debug-searchViewSearchBox');
    if (field.value) {
        elem = document.getElementsByClassName('GCBHGQQBPTB GCBHGQQBBD');
        if (elem[0] && elem[0].textContent === 'Save search') {
            elem[0].click();
        }
    }
}


function exit_field(char, event) {
    var evt = generate_keyevent('keydown', 9);
    event.target.dispatchEvent(evt);
    return true;
}


function get_selected_notebook_search_element() {
    // Get list of all loaded notebooks
    var t = document.getElementsByClassName("qa-notebookWidget");

    if (t.length === 0)
        return {selected: undefined, all: t, index: undefined};

    // Construct the hover class that gets added when mouseover
    var cls = t[0].classList[0];
    var selected_class = cls.substr(0, cls.length-3) + 'B' + cls.substr(cls.length-2);

    // Search for a notebook element that has that class
    for(var index = 0; index<t.length; ++index)
        if (t[index].classList.contains(selected_class))
            return {selected: t[index], all: t, index: index};
    return {selected: undefined, all: t, index: undefined};
}


function select_notebook_search_element(offset) {
    offset |= 0;
    result = get_selected_notebook_search_element();
    // Offset will be limited by the existing notebook elements
    result.index |= 0;
    index = Math.min(Math.max(result.index + offset, 0), result.all.length);
    element = result.all[index];
    // Show the notebook list entry and hover over it
    if (element) {
        element.scrollIntoViewIfNeeded();
        hover(element);
    }
    return {selected: element, total: result.all.length};
}


function notebook_down_key(char, event) {
    select_notebook_search_element(1);
}


function notebook_up_key(char, event) {
    select_notebook_search_element(-1);
}


function notebook_select(char, event) {
    // We need this method because Enter only worked if we were already  moving
    // using j, k but it didn't work if we exited the list using esc or if there
    // were multiple entries and we hit enter in the search box and then hit
    // it again.
    var notebook = get_selected_notebook_search_element();
    if (notebook.selected)
        notebook.selected.click();
}


function search_by_class(elem, cls) {
    if (elem.classList.contains(cls))
        return elem;
    for (var i=0; elem.children && i<elem.children.length; ++i) {
        found = search_by_class(elem.children[i], cls);
        if (found)
            return found;
    }
    return undefined;
}


function search_by_id(elem, id) {
    if (elem.id === id)
        return elem;
    for (var i=0; elem.children && i<elem.children.length; ++i) {
        found = search_by_id(elem.children[i], id);
        if (found)
            return found;
    }
    return undefined;
}


function search_up_by_style(elem, style, value) {
    if (!elem) return undefined;
    while (elem.style[style] !== value) {
        if (!elem.parentElement)
            return undefined;
        elem = elem.parentElement;
    }
    return elem;
}


function notebook_button(which) {
    var notebook = get_selected_notebook_search_element();
    var button = search_by_class(notebook.selected, which);
    if (button)
        button.click();
}

function notebook_delete(char, event) {
    notebook_button('qa-deleteButton');
}


function notebook_email(char, event) {
    notebook_button('qa-shareButton');
}


function notebook_star(char, event) {
    notebook_button('qa-shortcutButton');
}


function exec_search_notebook() {
    var result = select_notebook_search_element();
    // If we find notebooks with the query
    if (result.selected) {
        // Exit the search field
        exit_field(27, {target: result.selected});
        // If we only find 1 notebook we will open it
        if (result.total === 1)
            result.selected.click();
    }
    // We don't want any more key events to be processed
    return true;
}


function exec_move_note() {
    var notebooks = document.getElementsByClassName('GCBHGQQBMMB');
    if (notebooks.length === 1) {
        notebooks[0].scrollIntoViewIfNeeded();
        notebooks[0].click();
    }
}


function note_down_key(char, event) {
    var s = document.getElementsByClassName('focus-NotesView-Note-selected');
    log('note_down_key')
    s = s && s[0];
    if (is_visible(s)) {
        var element = s.nextElementSibling;
        if (element) {
            element.scrollIntoViewIfNeeded();
            element.click();
        }
    }
    return true;
}


function note_up_key(char, event) {
    log('note_up_key')
    var s = document.getElementsByClassName('focus-NotesView-Note-selected');
    s = s && s[0];
    if (is_visible(s)) {
        var element = s.previousElementSibling;
        if (element) {
            element.scrollIntoViewIfNeeded();
            element.click();
        }
    }
    return true;
}


function is_id_visible(id) {
    var s = document.getElementById(id);
    return is_visible(s);
}


function get_context(target) {
    if (is_id_visible('gwt-debug-GlassModalDialog-container'))
        return 'modal_dialog';
    else if (target && is_id_visible('gwt-debug-NoteContentEditorView-root') &&
             target.id === 'gwt-debug-NoteContentEditorView-root')
        return 'editor';
    else if (document.getElementById('gwt-debug-NotebooksDrawer-createNotebookButton'))
        return 'notebooks';
    else if (document.getElementById('gwt-debug-WorkChatDrawer-startChatButton'))
        return 'workchat';
    else if (is_id_visible('gwt-debug-ShortcutsDrawer-title'))
        return 'shortcuts';
    else if (document.getElementsByClassName('focus-drawer-TagsDrawer-TagsDrawer-create-tag-icon').length)
        return 'tags';
    else {
        var s = document.getElementById('gwt-debug-searchViewSearchBox');
        if (window.getComputedStyle(s.parentElement.parentElement.parentElement).overflow === 'visible')
            return 'search';
        else if (document.getElementById('gwt-debug-notesListView'))
            return 'notes';
    }

    return undefined;
}
