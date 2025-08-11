import './style.css'

const e = id => document.getElementById(id)
const node = (value, left = null, right = null) => ({ value, left, right })
const set = (txt) => e("display").innerHTML = txt

const equ = {
	mem: [],
	num: "",
	root: null,
	add_right: null,
	last_op: ""
}

const number = (digit) => () => {
	if (!Number(equ.num))
		equ.num = ""
	equ.num += digit
	set(equ.num)
}

for (let i = 0; i < 10; ++i) {
	const btn = e(`n${i}-btn`)
	const fn = number(i)
	btn.addEventListener("click", fn)
}
// number btns

const clear = () => {
	if (equ.num)
		equ.num = ""
	else if (equ.mem.length)
		equ.mem = []
	set("")
}
e("clear-btn").addEventListener("click", clear)

const backspace = () => {
	let disp = ""
	if (equ.num) {
		equ.num = equ.num.slice(0, -1)
		disp += equ.num
	}
	else if (equ.mem.length)
		disp += equ.mem.at(-1)
	else
		disp += 0
	set(disp)
	return true
}
e("backspace-btn").addEventListener("click", backspace)

/* ------------------------------- Number operations */

const add_root = (sym, is_last_nomatch) => {
	if (!equ.root)
		equ.root = node(sym, node(equ.num))
	else {
		if (is_last_nomatch)
			equ.add_right = equ.root
		equ.add_right.right = node(equ.num)
		equ.root = node(sym, equ.add_right)
	}
	equ.add_right = equ.root
}

const add_branch = (sym) => {
	const branch = node(sym, node(equ.num))
	if (!equ.root) {
		equ.root = branch
		equ.add_right = equ.root
	}
	else {
		equ.add_right.right = branch
		equ.add_right = equ.add_right.right
	}
}

const solve = (current = equ.root) => {
	if (!current)
		if (equ.mem.length)
			return equ.mem.at(-1)
		else
			return ""
	console.log("value", current.value, typeof current.value)
	if (!current.left && !current.right)
		return Number(current.value)
	const left = solve(current.left)
	const right = solve(current.right)
	console.log("solve-left", left, typeof left)
	console.log("solve-right", right, typeof right)
	const sol = ((v, left, right) => {
		switch (v) {
			case "t":
				return left + right
			case "-":
				return left - right
			case "x":
				return left * right
			case "/":
				return left / right
		}
	})(current.value, left, right)
	console.log("solution", sol, typeof sol)
	return Number(sol)
}

const update_equ = (sym) => {
	equ.mem.pop()
	equ.mem.push(solve())
	set(equ.mem.at(-1))
	equ.num = ""
	equ.last_op = sym
}

/* -------------------------- Arithmetic Operations */

const init = () => {
	if (!equ.num && !equ.mem.length)
		return;
	if (!equ.num) {
		equ.mem.push(equ.mem.at(-1))
		equ.num = equ.mem.at(-1)
	}
}

const add = () => {
	const nomatch = ["x", '/'].includes(equ.last_op)
	init()
	add_root("t", nomatch)
	update_equ("t")
}

const subtract = () => {
	const nomatch = ["x", "/"].includes(equ.last_op)
	init()
	add_root("-", nomatch)
	update_equ("-")
}

const multiply = () => {
	init()
	add_branch("x")
	update_equ("x")
}

const divide = () => {
	init()
	add_branch("/")
	update_equ("/")
}

const equals = () => {
	init()
	equ.add_right.right = node(equ.num)
	update_equ("=")
}

const operations = {
	"t": {
		name: "addition",
		fn: add
	},
	"-": {
		name: "subtraction",
		fn: subtract
	},
	"x": {
		name: "multiplication",
		fn: multiply
	},
	"/": {
		name: "division",
		fn: divide
	},
	"=": {
		name: "equals",
		fn: equals
	}
}

for (const op of Object.keys(operations)) {
	const btn = e(operations[op].name + "-btn")
	btn.addEventListener("click", operations[op].fn)
}
// operation btns

document.querySelector("main").addEventListener("keydown", ({ key }) => {
	if (Number(key)) {
		const digit = Number(key)
		number(digit)()
	}
	else
		switch (key) {
			case "Backspace":
				const backed = backspace()
				if (backed)
					clear()
				break;
			case "t":
			case "+":
				add()
				break;
			case "-":
				subtract()
			case "x":
			case "*":
				multiply()
			case "/":
				divide()
			case "Enter":
				equals()
		}
})
