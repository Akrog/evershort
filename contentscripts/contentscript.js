DEBUG_MODE = false;

window.addEventListener('load', function(){setTimeout(init_evershort, 2000);}, false);


var key_groups = [ 'side_bar', 'note_operations', 'note_navigation', 'book_keys', 'misc', 'search', 'config', 'sharing' ];

var keys = [
    {key: '/', help: 'Search', group: 'side_bar', on: 'keypress', context: '!help', fire: goto_search},  // Keycode 47
    {key: 'A', help: 'Add New Note', group: 'side_bar', on: 'keypress', context: '!help', fire: 'id:gwt-debug-Sidebar-newNoteButton-container'},  // Keycode 97
    {key: 'B', help: 'Notebooks', group: 'side_bar', on: 'keypress', context: '!help', fire: 'id:gwt-debug-Sidebar-notebooksButton-container'},  // Keycode 98
    {key: 'T', help: 'Goto Tags', group: 'side_bar', on: 'keypress', context: '!help', fire: 'id:gwt-debug-Sidebar-tagsButton-container'},  // Keycode 116
    {key: 'S', help: 'Goto Shortcuts', group: 'side_bar', on: 'keypress', context: '!help', fire: 'id:gwt-debug-Sidebar-shortcutsButton-container'},  // Keycode 115
    {key: 'W', help: 'Goto Workchat', group: 'side_bar', on: 'keypress', context: '!help', fire: 'id:gwt-debug-Sidebar-workChatButton-container'},  // Keycode 119
    {key: 'N', help: 'Goto Notes', group: 'side_bar', on: 'keypress', context: '!help', fire: 'id:gwt-debug-Sidebar-notesButton-container'},  // Keycode 110
    {key: 'C', help: 'Goto Config', group: 'side_bar', on: 'keypress', context: '!help', on_input: false, fire: 'id:gwt-debug-AccountMenu-avatar'},  // Keycode 101
    {key: 'j', help: 'Next note', group: 'note_navigation', on: 'keypress', context: ['notes', 'search'], fire: note_down_key, visible:'class:NotesView-ScrollWindow'},  // Keycode 106
    {key: 'k', help: 'Previous note', group: 'note_navigation', on: 'keypress', context: ['notes', 'search'], fire: note_up_key, visible:'class:NotesView-ScrollWindow'},  // Keycode 107
    {key: 'l', help: 'Edit note', group: 'note_navigation', on: 'keypress', context: ['notes', 'search'], fire: edit_note, visible: 'id:gwt-debug-MetaBarView-tagIcon'},  // Keycode 107
    {key: 'c', help: 'Change note title', group: 'note_operations', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NoteTitleView-textBox', visible: 'id:gwt-debug-NotebookSelectMenu-root'},
    {key: 27, help: 'exit_note', on: 'keydown', on_input: true, context: 'editor', fire: 'id:gwt-debug-sidebar'},  // Keycode 107
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
     fire: reset_focus},
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
    {key: 27, help: 'exit_help', on: 'keydown', context: 'help', to_front: true, fire: hide_help},
    {key: 'oc', help: 'Sort by creation (newest first)', group: 'note_navigation', on: 'keypress', context: ['notes', 'search'], fire: sort_notes, visible:'class:NotesView-ScrollWindow'},
    {key: 'oC', help: 'Sort by creation (oldest first)', group: 'note_navigation', on: 'keypress', context: ['notes', 'search'], fire: sort_notes, visible:'class:NotesView-ScrollWindow'},
    {key: 'ou', help: 'Sort by updated (newest first)', group: 'note_navigation', on: 'keypress', context: ['notes', 'search'], fire: sort_notes, visible:'class:NotesView-ScrollWindow'},
    {key: 'oU', help: 'Sort by updated (oldest first)', group: 'note_navigation', on: 'keypress', context: ['notes', 'search'], fire: sort_notes, visible:'class:NotesView-ScrollWindow'},
    {key: 'ot', help: 'Sort by title (ascending)', group: 'note_navigation', on: 'keypress', context: ['notes', 'search'], fire: sort_notes, visible:'class:NotesView-ScrollWindow'},
    {key: 'oT', help: 'Sort by title (descending)', group: 'note_navigation', on: 'keypress', context: ['notes', 'search'], fire: sort_notes, visible:'class:NotesView-ScrollWindow'},
    {key: 'vi', help: 'Toggle view images', group: 'note_navigation', on: 'keypress', context: ['notes', 'search'], fire: view_option, visible:'class:NotesView-ScrollWindow'},
    {key: 'vt', help: 'Toggle view text', group: 'note_navigation', on: 'keypress', context: ['notes', 'search'], fire: view_option, visible:'class:NotesView-ScrollWindow'},
    {key: 's', help: 'Settings', group: 'config', on: 'keypress', context: '!help', to_front: true, on_input: false, fire: 'id:gwt-debug-AccountMenu-settings', visible: true},
    {key: 'h', help: 'Help & Learning', group: 'config', on: 'keypress', context: '!help', to_front: true, on_input: false, fire: 'id:gwt-debug-AccountMenu-help', visible: true},
    {key: 'r', help: 'Rate Evernote Web', group: 'config', on: 'keypress', context: '!help', to_front: true, on_input: false, fire: 'id:gwt-debug-AccountMenu-feedback', visible: true},
    {key: 'l', help: 'Log out', group: 'config', on: 'keypress', context: '!help', to_front: true, on_input: false, fire: 'id:gwt-debug-AccountMenu-logout', visible: true},
    {key: 'hs', help: 'Send note', group: 'sharing', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NoteSharingMenu-root-MESSAGE', visible:'id:gwt-debug-NoteSharing-shareButton', pre_path_parse: trigger_share_elements_creation},
    {key: 'hf', help: 'Facebook', group: 'sharing', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NoteSharingMenu-root-FACEBOOK', visible:'id:gwt-debug-NoteSharing-shareButton', pre_path_parse: trigger_share_elements_creation},
    {key: 'ht', help: 'Twitter', group: 'sharing', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NoteSharingMenu-root-TWITTER', visible:'id:gwt-debug-NoteSharing-shareButton', pre_path_parse: trigger_share_elements_creation},
    {key: 'hi', help: 'LinkedIn', group: 'sharing', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NoteSharingMenu-root-LINKEDIN', visible:'id:gwt-debug-NoteSharing-shareButton', pre_path_parse: trigger_share_elements_creation},
    {key: 'he', help: 'Email', group: 'sharing', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NoteSharingMenu-root-EMAIL', visible:'id:gwt-debug-NoteSharing-shareButton', pre_path_parse: trigger_share_elements_creation},
    {key: 'hl', help: 'Link', group: 'sharing', on: 'keypress', context: ['notes', 'search'], fire: 'id:gwt-debug-NoteSharingMenu-root-LINK', visible:'id:gwt-debug-NoteSharing-shareButton', pre_path_parse: trigger_share_elements_creation}
];

var share_elems_created = false;

function trigger_share_elements_creation(chr, evnt, ctxt) {
    if (!share_elems_created) {
        share_elems_created = true;
        document.getElementById('gwt-debug-NoteSharing-dropdown').click();
        document.getElementById('gwt-debug-NoteSharing-dropdown').click();
    }
}

var observer = undefined;
var is_help_showing = false;
var help_html = undefined;
var editor = undefined;


var sort_options_idx = {'C': 0, 'c': 1, 'U': 2, 'u': 3, 't': 4, 'T': 5};

function sort_notes(chr, evnt, ctxt) {
    var sort_options = document.getElementsByClassName('SelectorOption');
    var option = sort_options_idx[String.fromCharCode(chr[1])];
    sort_options[option].click();
    return true;
}


function view_option(chr, evnt, ctxt) {
    var view_options = document.getElementsByClassName('Toggle');
    var idx = String.fromCharCode(chr[1]) === 'i'? 0:1;
    view_options[idx].click();
    return true;
}


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

function goto_search(char, event) {
    // If we have a focussed note, we have to unfocus or it will be improperly
    // displayed
    var element = document.getElementById('gwt-debug-NoteAttributes-doneButton');
    if (is_visible(element))
        element.click();

    // Now we click the search button
    element = document.getElementById('gwt-debug-Sidebar-searchButton-container');
    element.click();
    return true;
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
        click_event.preventDefault();
    return true
}


function toggle_help(chr, evt, ctxt) {
    if (is_help_showing)
      hide_help();
    else
      show_help();
}


function tinymce_listener(evnt) {
    var char = evnt.which || evnt.KeyCode || evnt.charCode || evnt.key;
    if (char === 27) {
        var elem = document.getElementById('gwt-debug-NoteAttributes-overflowButton');
        elem.focus()
        evnt.stopPropagation();
        evnt.stopImmediatePropagation();
        evnt.preventDefault();
        return false;
    }
}


function tinymce_observer(mutations) {
    mutations.forEach(function(mutation) {
        log('Tinymcs observing ' + mutation.addedNodes.length + ' new nodes');
        for (var i = 0; i < mutation.addedNodes.length; i++) {
            iframe = mutation.target && search_by_field(mutation.addedNodes[i],
                                                        'name',
                                                        'en-common-editor-iframe');
            if (iframe) {
                log('Found editor frame');
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
    var tinymce = doc && doc.getElementById('en-note');
    if (tinymce) {
        tinymce.addEventListener('keydown', tinymce_listener, true);
        editor = tinymce
    } else
        log('Tinymce editor not found in iframe');
    return tinymce;
}


function init_evershort() {
    keymanager.init(get_context);
    for (var i=0; i<keys.length; ++i) {
        var value = keys[i];
        keymanager.add_shortcut(value.key, value.name, value.on, value.fire, value.context, value.on_input, value.to_front, value.visible, value.pre_path_parse);
    }

    // Now we need to add the key listener for the tinymce because it's in
    // another document (iframe)
    var editor = document.getElementById('gwt-debug-NoteContentEditorView-root');
    if (editor) {
        var iframe = editor.getElementsByClassName('gwt-Frame');
        iframe = iframe && iframe[0]
        if (iframe) {
            if (iframe.name === 'en-common-editor-iframe' ||  iframe.id === 'en-common-editor-iframe') {
                log('Found editor frame on init');
                // If we were able to add the key listener we are finished
                if (add_tinymce_listener(iframe))
                    return;
            }
        }
        log('Adding tinymce observer to NoteContentEditorView');
    } else {
        editor = document;
        log('Adding tinymce observer to document');
    }

    // If it's not there yet, add an observer that will add our listener later
    observer = new MutationObserver(tinymce_observer);
    observer.observe(editor, { childList: true, subtree: true });
}


function edit_note(char, event, ctxt) {
    if (editor)
        editor.focus()
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
        reset_focus()
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
            reset_focus()
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


function goto_note(offset) {
    // Get all notes
    var notes = document.getElementsByClassName('focus-NotesView-Note');
    if (!notes)
        return

    // Get selected note
    var selected = document.getElementsByClassName('focus-NotesView-Note-selected');
    selected = selected && selected[0];

    var current = 0;

    // If there is no selected note we'll consider first note as selected and
    // we'll consider the first offset spent to get there.
    if (!selected) {
        offset -= 1;
    } else {
        if (!is_visible(selected))
            return
        while (notes[current] != selected)
            ++current;
    }

    var dest_pos = current + offset;
    if (dest_pos < 0)
        dest_pos = 0;
    else if (dest_pos >= notes.length)
        dest_pos = notes.length - 1;
    element = notes[dest_pos]
    if (element) {
        element.scrollIntoViewIfNeeded();
        element.click();
    }
}


function note_down_key(char, event) {
    log('note_down_key')
    goto_note(1);
    return true;
}


function note_up_key(char, event) {
    log('note_up_key')
    goto_note(-1);
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


function reset_focus() {
    let scrollTop = document.body.scrollTop;
    let body = document.body;

    let tmp = document.createElement('input');
    tmp.style.opacity = 0;
    body.appendChild(tmp);
    tmp.focus();
    body.removeChild(tmp);
    body.scrollTop = scrollTop;
}
