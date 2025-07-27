# iOS Calculator replica

A web app replica of the iOS Calculator, taken from [Intro to Web Development](https://btholt.github.io/complete-intro-to-web-dev-v3/lessons/putting-it-all-together/project) as practice.

View at [TBD]

## Description

This replica implements the four basic operations, using a tree representation of the calculations being performed. One modification is separating the working solution from the current number being entered.

Method: tree of operations and numbers
- calculate solution recursively
- Operations lower in tree are done first
- Addition/Subtraction append to top of tree
  ```js
  root.right = node(n)
  root = node(sym, root)
  ```
- Multiplication/Division append to last sym node added
  ```js
  add_right.right = node(sym, node(n))
  add_right = add_right.right
  ```

## Known Bugs

1.
