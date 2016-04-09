EverShort - Evernote Shortcuts
==============================

EverShort provides keyboard shortcuts to EverNote.
Increase your productivity on EverNote using shortcuts to search, navigate, share and create notes.

__Installation instructions:__

You can install the stable version of Vimium from the
[Chrome Extensions Gallery](https://chrome.google.com/extensions/detail/clhjalfedcigiomjfmmjhgadnlmegobb).

__Warning:__

Yep, this extension's code is a Frankenstein, so it has the potential to hurt any programmer's eyes upon staring, and any JavaScript programmer that even dares glancing at it will most likely feel a soul crushing sensation and beg to be eye-gouged.

You have been warned, proceed at your own risk !!

In my defense, I'm not a JavaScript programmer and I made this extension as I went, without any real thought or knowledge, and it shows in the result, an extension that works but it's not nice to look at.  ;-)

Keyboard Shortcuts
------------------

Although there's still a lot of work to do, most common functionality is supported, like sidebar menu, dialog forms buttons, etc.

General options:
    ?      show the help dialog
    A      Add a note
    /      search notes
    W      goto Workchat
    S      goto Shortcuts
    N      goto Notes
    B      goto noteBooks
    T      goto Tags
    C      goto Contiguration

Dialogs:
    Enter  accept
    Esc    cancel

Nodes list:
    j      next note
    k      previous note
    l      edit note

Note:
    c      change note Caption
    e      Email note
    s      Star note
    i      note Info
    d      Delete note
    r      Reminder for note
    b      move note to noteBook
    t      Tag note
    F      Focus toggle

Notebook list:
    j      next notebook
    k      previous notebook
    Enter  select notebook
    l      select notebook
    d      delete notebook
    e      email notebook
    s      Star notebook
    a      Add Notebook
    f      Enter search Field
    x      Clear search notebook

Search window:
    w      change Where to search
    a      Add search to saved
    f      enter search Field
    x      Clear search field

Miscelaneous:
    Esc    exit field
    a      create tag/chat
    f      enter search Field
    x      clear search field

Screen Captures with overlayed Shortcuts
----------------------------------------

Some captures with overlayed keyboard shortcuts:

![Notes overlay](https://github.com/Akrog/evershort/blob/master/screens/capture_1.jpg)

![Search overlay](https://github.com/Akrog/evershort/blob/master/screens/capture_2.jpg)

![Dialog overlay](https://github.com/Akrog/evershort/blob/master/screens/capture_3.jpg)

Release Notes
-------------

x.y.z (2016-04-xx)

- Fix ESC from help cancels note creation and doesn't hide help dialog.
- Fix caption change on new note with no caption or contents.

0.1.2 (2016-03-27)

- Fix note navigation problem with j and k.
- Fix problem with / shortcut on focussed note.
- Fix problem to enter notes with the l key when notes were too big.

0.1.1 (2016-03-19)

- Fix issue with notes focus on searched notes.
- Fix exit from editing a note with ESC functionality.
- Fix saving search shortcut.
- Fix issues with focused notes that allowed the execution of non visible actions.
- Fix issues entering and exiting tag search field.
- Fix move note and tags when displaying formatting bar.

0.1.0 (2016-03-05)

- Initial release with shortcuts for the indispensable requirements.
