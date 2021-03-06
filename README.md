EverShort - Evernote Shortcuts
==============================

EverShort provides keyboard shortcuts to EverNote.
Increase your productivity on EverNote using shortcuts to search, navigate, share and create notes.

__Installation instructions:__

You can install the stable version of EverShort from the
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
    oc     Order by Creation date (newest first)
    oC     Order by Creation date (oldest first)
    ou     Order by Updated date (newest first)
    oU     Order by Updated date (oldest first)
    ot     Order by Title (ascending)
    oT     Order by Title (descending)
    vi     Toggle view text
    vt     Toggle view images

Note:

    c      change note Caption
    s      Star note
    i      note Info
    d      Delete note
    r      Reminder for note
    b      move note to noteBook
    t      Tag note
    F      Focus toggle

Note Sharing:

    hs     Send note
    hf     Facebook
    ht     Twitter
    hi     LinkedIn
    he     Email
    hl     Link

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

Configuration Menu:

    s      Settings
    h      Help & Learning
    r      Rate Evernote Web
    l      Log out

Note editing:

    Esc             Exit note editor
    Ctrl+z          Undo
    Ctrl+Shift+z    Redo
    ⇄               Indent
    Shift+⇄         Unindent
    Ctrl+b          Bold
    Ctrl+i          Italic
    Ctrl+u          Underline
    Ctrl+Alt+a      Attach file
    Ctrl+Alt+b      Bulleted list
    Ctrl+Alt+c      Checkbox
    Ctrl+Alt+d      Divider line
    Ctrl+Alt+e      Align center
    Ctrl+Alt+k      Insert link
    Ctrl+Alt+l      Align left
    Ctrl+Alt+n      Numbered list
    Ctrl+Alt+p      Code block
    Ctrl+Alt+r      Align right
    Ctrl+Alt+s      Strikethrough
    Ctrl+Alt+x      Remove formatting
    Ctrl+Alt+=      Subscript
    Ctrl+Alt++      Superscript


Screen Captures with overlayed Shortcuts
----------------------------------------

Some captures with overlayed keyboard shortcuts:

![Notes overlay](https://github.com/Akrog/evershort/blob/master/screens/capture_1.jpg)

![Search overlay](https://github.com/Akrog/evershort/blob/master/screens/capture_2.jpg)

![Dialog overlay](https://github.com/Akrog/evershort/blob/master/screens/capture_3.jpg)

Release Notes
-------------

0.3.2 (2018-08-12)

- Fix #7: Tab inserts 4 spaces
- Fix help message on click with user URLs

0.3.1 (2018-03-30)

- Support URLs in the form evershort.com/u/#
- Fix tinymce shortcuts
- Fix notebook up/down movement
- Fix quick notebook up/down movement

0.3.0 (2017-07-30)

- Add shortcuts for editor
- Show shortcuts in tooltips
- Fix editor's toolbar visibility

0.2.4 (2017-02-11)

- Add support for Chinese site (issue #2)

0.2.3 (2016-11-28)

- Add url based icon action
- Fix all sharing shortcuts
- Fix textedit fields exit with ESC

0.2.2 (2016-08-07)

- Fix exit from editor using ESC key
- Fix entering editor using l key

0.2.1 (2016-07-11)

- Fix key recognition problem.
- Fix unnecessary delay required between keystrokes.

0.2.0 (2016-04-10)

- Add note sorting shortcuts (oc, oC, ou, oU, ot, oT).
- Add toggling note view options (vi, vt).
- Add configuration menu shortcuts (Cs, Ch, Cr, Cl).
- Add all note sharing options (hs, hf, ht, hi, he, hl).
- Fix ESC from help cancels note creation and doesn't hide help dialog.
- Fix caption change on new note with no caption or contents.
- Fix exit note contents with ESC doesn't always work.
- Remove conflicting "e" shortcut for sharing a note, use "hs" now.

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
