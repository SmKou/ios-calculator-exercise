# iOS Calculator replica

A web app replica of the iOS Calculator, taken from [Intro to Web Development](https://btholt.github.io/complete-intro-to-web-dev-v3/lessons/putting-it-all-together/project) as practice.

View at [TBD]

## Description

Implements four basic operations, using a tree representation of the calculations being performed.

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

### Scenario
**Data**
```
mem: [],
num: "",
root: null,
add_right: null,
last_op: ""

display (element)
```

**Simple addition**
```
1
	num: 1
	display = 1
+
	mem: [1]
	num: ""
	root: { +, left: { 1 }}
	add_right: root
	last_up: +
	display = 1
2
	num: 2
	display = 2
=
	mem: [3]
	num: ""
	root: null
	add_right: null
	last_op: =
	display = 3
```

**Three-step equation**
```
1
	num: 1
	display = 1
+
	mem: [3, 1]
	num: ""
	root: { +, left: { 1 }}
	add_right: root
	last_op: +
	display = 1
2
	num: 2
	display = 2
x
	mem: [3, 3]
	num: ""
	root: {
		+,
		left: { 7 },
		right: {
			x,
			left: { 3 }
		}
	}
	add_right: root.right.right
	last_op: x
	display = 3
4
	num: 4
	display = 4
=
	mem: [3, 9]
	num: ""
	root: null
	add_right: null
	last_op: =
	display = 9

+
	mem: [3, 9, 9]
	num: ""
	root: { +, left: { 9 }}
	add_right: root
	last_op: +
	display = 9
1
	num: 1
	display = 1
12
	num: 12
	display = 12
=
	mem: [3, 9, 21]
	num: ""
	root: null
	add_right: null
	last_op: =
	display = 21
```

## Known Bugs

1.
