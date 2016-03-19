DEBUG_MODE = false;

window.addEventListener('load', function(){setTimeout(init_evershort, 2000);}, false);


var key_groups = [ 'side_bar', 'note_operations', 'note_navigation', 'book_keys', 'misc', 'search' ];

var keys = [
    {key: '/', help: 'Search', group: 'side_bar', on: 'keypress', context: '!help', fire: 'id:gwt-debug-Sidebar-searchButton-container'},  // Keycode 47
    {key: 'A', help: 'Add New Note', group: 'side_bar', on: 'keypress', context: '!help', fire: 'id:gwt-debug-Sidebar-newNoteButton-container'},  // Keycode 97
    {key: 'B', help: 'Notebooks', group: 'side_bar', on: 'keypress', context: '!help', fire: 'id:gwt-debug-Sidebar-notebooksButton-container'},  // Keycode 98
    {key: 'T', help: 'Goto Tags', group: 'side_bar', on: 'keypress', context: '!help', fire: 'id:gwt-debug-Sidebar-tagsButton-container'},  // Keycode 116
    {key: 'S', help: 'Goto Shortcuts', group: 'side_bar', on: 'keypress', context: '!help', fire: 'id:gwt-debug-Sidebar-shortcutsButton-container'},  // Keycode 115
    {key: 'W', help: 'Goto Workchat', group: 'side_bar', on: 'keypress', context: '!help', fire: 'id:gwt-debug-Sidebar-workChatButton-container'},  // Keycode 119
    {key: 'N', help: 'Goto Notes', group: 'side_bar', on: 'keypress', context: '!help', fire: 'id:gwt-debug-Sidebar-notesButton-container'},  // Keycode 110
    {key: 'C', help: 'Goto Config', group: 'side_bar', on: 'keypress', context: '!help', on_input: false, fire: 'id:gwt-debug-AccountMenu-avatar'},  // Keycode 101
    {key: 'j', help: 'Next note', group: 'note_navigation', on: 'keypress', context: ['notes', 'search'], fire: note_down_key, visible:'class:NotesView-ScrollWindow'},  // Keycode 106
    {key: 'k', help: 'Previous note', group: 'note_navigation', on: 'keypress', context: ['notes', 'search'], fire: note_up_key, visible:'class:NotesView-ScrollWindow'},  // Keycode 107
    {key: 'l', help: 'Edit note', group: 'note_navigation', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NoteContentEditorView-root', visible: true},  // Keycode 107
    {key: 'c', help: 'Change note title', group: 'note_operations', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NoteTitleView-textBox', visible: 'id:gwt-debug-NoteAttributes-overflowButton'},
    {key: 27, help: 'exit_note', on: 'keydown', on_input: true, context: 'editor', fire: 'id:gwt-debug-sidebar'},  // Keycode 107
    {key: 'e', help: 'Email note', group: 'note_operations', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NoteSharingView-root', visible: true},
    {key: 's', help: 'Star note', group: 'note_operations', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NoteAttributes-shortcutButton', visible: true},
    {key: 'i', help: 'Info on note', group: 'note_operations', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NoteAttributes-infoButton', visible: true},
    {key: 'd', help: 'Delete note', group: 'note_operations', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NoteAttributes-trashButton', visible: true},
    {key: 'r', help: 'Reminder for note', group: 'note_operations', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NoteAttributes-reminderButton', visible: true},
    {key: 'b', help: 'Move note to noteBook', group: 'note_operations', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NotebookSelectMenu-notebookName', visible: 'id:gwt-debug-NotebookSelectMenu-root'},
    {key: 't', help: 'Tag note', group: 'note_operations', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NoteTagsView-tagInputBox', visible: 'id:gwt-debug-MetaBarView-tagIcon'},
    {key: 13, help: 'exec_move_note', on: 'keydown', on_input: true, context: ['notes>id:gwt-debug-NotebookSelectMenu-filter-textBox', 'search>id:gwt-debug-NotebookSelectMenu-filter-textBox'], fire: exec_move_note, visible: true},
    {key: 27, help: 'exit_move_note', on: 'keydown', on_input: true, context: ['notes>class:qa-ResizingSuggestLozenge-input', 'search>class:qa-ResizingSuggestLozenge-input'], fire: exit_tag_note, visible: true},
    {key: 27, help: 'exit_search_field', on: 'keydown', on_input: true, 
     context: ['search>id:gwt-debug-searchViewSearchBox', 'workchat>id:gwt-debug-WorkChatDrawer-drawerFilter-textBox',
               'tags>class:focus-drawer-Filter-input', 'notebooks>id:gwt-debug-NotebooksDrawer-drawerFilter-textBox',
               'notes>id:gwt-debug-NoteTitleView-textBox', 'search>id:gwt-debug-NoteTitleView-textBox'],
     fire: new FireKey(9, true)},
    {key: 27, help: 'Cancel/Exit field', group: 'misc', on: 'keydown', on_input: true, context: 'modal_dialog', fire: modal_dialog_keys},
    {key: 13, help: 'Confirm', group: 'misc', on: 'keydown', on_input: true, context: 'modal_dialog', fire: modal_dialog_keys},
    {key: 13, help: 'exec_search', on: 'keydown', on_input: true, context: 'notebooks>id:gwt-debug-NotebooksDrawer-drawerFilter-textBox', fire: exec_search_notebook},
    {key: 'j', help: 'Next notebook', group: 'book_keys', on: 'keypress', context: 'notebooks', fire: notebook_down_key, visible:'id:gwt-debug-NotebooksDrawerView-root'},
    {key: 'k', help: 'Previous notebook', group: 'book_keys', on: 'keypress', context: 'notebooks', fire: notebook_up_key, visible:'id:gwt-debug-NotebooksDrawerView-root'},
    {key: 13, help: 'Select Notebook', group: 'book_keys', on: 'keypress', context: 'notebooks', fire: notebook_select},
    {key: 'l', help: 'Select Notebook', group: 'book_keys', on: 'keypress', context: 'notebooks', fire: notebook_select},
    {key: 'd', help: 'Delete Notebook', group: 'book_keys', on: 'keypress', context: 'notebooks', fire: notebook_delete},
    {key: 'e', help: 'Email Notebook', group: 'book_keys', on: 'keypress', context: 'notebooks', fire: notebook_email},
    {key: 's', help: 'Star Notebook', group: 'book_keys', on: 'keypress', context: 'notebooks', fire: notebook_star},
    {key: 'a', help: 'Create tag/chat', group: 'misc', on: 'keypress', context: 'tags', fire: 'class:focus-drawer-TagsDrawer-TagsDrawer-create-tag-icon'},  // Keycode 99
    {key: 'a', help: 'create_chat', on: 'keypress', context: 'workchat', fire: 'id:gwt-debug-WorkChatDrawer-startChatButton'},  // Keycode 99
    {key: 'a', help: 'Create Notebook', group: 'book_keys', on: 'keypress', context: 'notebooks', fire: 'id:gwt-debug-NotebooksDrawer-createNotebookButton'},  // Keycode 99
    {key: 'f', help: 'Enter search field', group: 'misc', on: 'keypress', context: 'tags', fire: 'class:focus-drawer-Filter-input'},  // Keycode 102
    {key: 'w', help: 'Where to search', group: 'search', on: 'keypress', context: 'search', fire: 'id:gwt-debug-activeScopeContainer', visible: true},
    {key: 'a', help: 'Save search', group: 'search', on: 'keypress', context: 'search', fire: save_search, visible: 'id:gwt-debug-searchViewSearchBox'},
    {key: 'f', help: 'Enter search field', group: 'search', on: 'keypress', context: 'search', fire: 'id:gwt-debug-searchViewSearchBox', visible: true},  // Keycode 102
    {key: 'f', help: 'search_chat', on: 'keypress', context: 'workchat', fire: 'id:gwt-debug-WorkChatDrawer-drawerFilter-textBox'},  // Keycode 102
    {key: 'f', help: 'Enter search field', group: 'book_keys', on: 'keypress', context: 'notebooks', fire: search_notebook},   // Keycode 102  //'id:gwt-debug-NotebooksDrawer-drawerFilter-textBox'}]
    {key: 'x', help: 'Clear search field', group: 'misc', on: 'keypress', context: 'tags', fire: 'class:focus-drawer-Filter-search-clear'},  // Keycode 120
    {key: 'x', help: 'Clear search field', group: 'search', on: 'keypress', context: 'search', fire: clear_search, visible: 'id:gwt-debug-searchViewSearchBox'},  // Keycode 120
    {key: 'x', help: 'clear_search_chat', on: 'keypress', context: 'workchat', fire: clear_search},  // Keycode 120
    {key: 'x', help: 'Clear Search Notebook', group: 'book_keys', on: 'keypress', context: 'notebooks', fire: clear_search},  // Keycode 120
    {key: 'F', help: 'Focus toggle', group: 'note_operations', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NoteAttributes-focusButton', visible: true},
    {key: 'F', on: 'keypress', fire: 'id:gwt-debug-NoteAttributes-doneButton', visible: true},
    {key: 27, on: 'keydown', fire: 'id:gwt-debug-NoteAttributes-doneButton', visible: true},
    {key: '?', help: 'Show/Hide Help', group: 'misc', on: 'keypress', fire: toggle_help},
    {key: 27, help: 'exit_help', on: 'keydown', context: 'help', fire: hide_help}
];


var observer = undefined;
var is_help_showing = false;
var help_html = undefined;


function convert_key(key) {
    if (key == 13)
        return '&#x23CE';
    if (key == 27)
        return 'Esc';
    return key;
}


function get_key_group_html(group) {
    elements = []
    for (var i = 0; i < keys.length; ++i) {
        shortcut = keys[i];
        key_group = shortcut.group
        if (!Array.isArray(key_group))
            key_group = [key_group];

        if (key_group.indexOf(group) > -1) {
            elements.push('<tr class="evershortReset undefined"><td class="evershortReset">' + convert_key(shortcut.key) + '</td><td class="evershortReset">:</td><td class="evershortReset">' + shortcut.help + '</td></tr>');
        }
    }
    return elements.join('');
}

function get_help_html() {
    // We only load the html for the help once upon help request
    if (!help_html) {
        help_html = read_file('pages/help.html');
        for (var i = 0; i < key_groups.length; ++i) {
            group = key_groups[i];
            help_html = help_html.replace('{{' + group + '}}', get_key_group_html(group));
        }
        help_html = help_html.replace('{{version}}', chrome.runtime.getManifest().version);
    }
    return help_html
}

function show_help(contents) {
    if (!document.body)
      return;

    var container = document.createElement("div");
    container.id = "evershortHelpDialogContainer";
    container.className = "evershortReset";
    document.body.appendChild(container);
    container.innerHTML = get_help_html();
    container.getElementsByClassName("closeButton")[0].addEventListener("click", hide_help, false);
    var dialog_elem = document.getElementById("evershortHelpDialog");
    dialog_elem.style.maxHeight = window.innerHeight - 80;
    is_help_showing = true;
}


function hide_help(click_event) {
    is_help_showing = false;
    var helpDialog = document.getElementById("evershortHelpDialogContainer");
    if (helpDialog)
        helpDialog.parentNode.removeChild(helpDialog);
    if (click_event && click_event.preventDefault)
        return click_event.preventDefault();
}


function toggle_help(chr, evt, ctxt) {
    if (is_help_showing)
      hide_help();
    else
      show_help();
}


function tinymce_listener(evnt) {
    var char = evnt.key || evnt.which || evnt.KeyCode || evnt.charCode;
    if (char === 27)
        return exit_field(27, evnt);
}


function tinymce_observer(mutations) {
    mutations.forEach(function(mutation) {
        log('Tinymcs observing ' + mutation.addedNodes.length + ' new nodes');
        for (var i = 0; i < mutation.addedNodes.length; i++) {
            iframe = mutation.target && search_by_field(mutation.addedNodes[i],
                                                        'name',
                                                        'RichTextArea-entinymce');
            if (iframe) {
                log('Found RichTextArea');
                var result = add_tinymce_listener(iframe);
                if (result) {
                    log('Disconnecting observer');
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
    else
        log('Tinymce editor not found in iframe');
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
    var iframe = document.getElementsByName('RichTextArea-entinymce');
    if (iframe && iframe.length) {
        log('Found RichTextArea on init');
        // If we were able to add the key listener we are finished
        if (add_tinymce_listener(iframe[0]))
            return;
    }

    // If it's not there yet, add an observer that will add our listener later
    var editor = document.getElementById('gwt-debug-NoteContentEditorView-root');
    if (editor) {
        log('Adding tinymce observer to NoteContentEditorView');
    } else {
        editor = document;
        log('Adding tinymce observer to document');
    }
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
        parent_elem = document.getElementById('gwt-debug-stage')
        elem = search_by_field(parent_elem, 'textContent', 'Save search')
        if (elem)
            elem.click();
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

    for(var index = 0; index<t.length; ++index) {
        if (window.getComputedStyle(t[index])['background-color'] === 'rgba(43, 181, 92, 0.901961)') {
            return {selected: t[index], all: t, index: index};
        }
    }
    return {selected: undefined, all: t, index: undefined};
}


function select_notebook_search_element(offset) {
    offset |= 0;
    result = get_selected_notebook_search_element();
    // If there is no selected element we will consider selecting the first
    // element as 1 movement.
    if (result.index == undefined)
        --offset;
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


function search_by_field(elem, field, content) {
    if (elem[field] === content)
        return elem
    for (var i=0; elem.children && i<elem.children.length; ++i) {
        found = search_by_field(elem.children[i], field, content);
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
        // If we only find 1 notebook we will open it
        if (result.total === 1) {
            result.selected.click();
        } else {
            // Exit the search field
            setTimeout(function() {
                    exit_field(27, {target: result.selected});
            }, 150);
        }
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
    if (is_help_showing)
        return 'help';

    if (is_id_visible('gwt-debug-GlassModalDialog-container'))
        return 'modal_dialog';

    if (target && is_id_visible('gwt-debug-NoteContentEditorView-root') &&
             target.id === 'gwt-debug-NoteContentEditorView-root')
        return 'editor';

    if (document.getElementById('gwt-debug-NotebooksDrawer-createNotebookButton'))
        return 'notebooks';

    if (document.getElementById('gwt-debug-WorkChatDrawer-startChatButton'))
        return 'workchat';

    if (is_id_visible('gwt-debug-ShortcutsDrawer-title'))
        return 'shortcuts';

    if (document.getElementsByClassName('focus-drawer-TagsDrawer-TagsDrawer-create-tag-icon').length)
        return 'tags';
    else {
        var s = document.getElementById('gwt-debug-searchViewSearchBox');
        if (window.getComputedStyle(s.parentElement.parentElement.parentElement).overflow === 'visible')
            return 'search';
        if (document.getElementById('gwt-debug-notesListView'))
            return 'notes';
    }

    return undefined;
}
