# To-Do List (v2)

A to-do app built with HTML, CSS, and vanilla JavaScript, rebuilt around a single tasks array.

Live demo: https://js-todo-list-app-v2.vercel.app/

## Features

- Add tasks with the button or the Enter key
- Check tasks off, delete them, or double-click to edit (Enter saves, Escape cancels)
- Filter by All, Active, or Completed
- Task counter and "Clear Completed"
- Friendly empty-state messages
- Tasks are saved with localStorage, so they survive a refresh

## What changed from v1

v1 stored the state in the page itself and read it back from the DOM. v2 keeps every task in one tasks array, and a single render() function redraws the list from it. Every action (add, check, edit, delete, clear) follows the same pattern: update the array, save it, then render. That made features like filters, the counter, and the empty states simple to add.

v1: https://github.com/Shinex01/js-todo-list-app

## Run it locally

Open the folder in VS Code and start it with the Live Server extension, or just open index.html in a browser.
