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

/* Scenario
 * {
 * 		mem: [],
 * 		num: "",
 * 		root: null,
 * 		add_right: null,
 * 		last_op: ""
 * }, display: ""
 *
 * 1 + => {
 * 		mem: [1],
 * 		root: { +, left: { value: 1 }},
 * 		add_right: root,
 * 		last_op: +
 * }, display: 1
 * 1 = => {
 * 		mem: [2],
 * 		root: null,
 * 		add_right: null,
 * 		last_op: =
 * } display: 2
 *
 * 1 + => {
 * 		mem: [2, 1],
 * 		root: { +, left: { 1 }},
 * 		add_right: root,
 * 		last_op: +
 * }, display: 1
 * 2 x => {
 * 		mem: [2, 2],
 * 		root: { +, left: { 1 }, right: { x, { 2 }} },
 * 		add_right: root.right,
 * 		last_op: x
 * }, display: 2
 * 3 = => {
 * 		mem: [2, 7],
 * 		root: null,
 * 		add_right: null,
 * 		last_op: =
 * }, display: 7
 *
 * + => {
 * 		mem: [2, 7, 7],
 * 		root: { +, left: { 7 }},
 * 		add_right: root,
 * 		last_op: +
 * }, display: 7
 * 3 x => {
 * 		mem: [2, 7, 10],
 * 		root: { +, left: { 7 }, right: { x, left: { 3 }} },
 * 		add_right: root.right.right
 * 		last_op: x
 * }, display: 10
 * 2 = => {
 * 		mem: [2, 7, 13],
 * 		root: null,
 * 		add_right: null,
 * 		last_op: =
 * }, display: 13
 */

for (let i = 0; i < 10; ++i) {
	const btn = e(`n${i}-btn`)
	btn.addEventListener("click", () => {
		if (equ.num)
			equ.num += i
		else
			equ.num = i
		set(equ.num)
	})
}

const clear = () => {
	if (equ.num) {
		equ.num = ""
		set(equ.num)
	}
	else if (equ.mem.length) {
		equ.mem = []
		set("")
	}
}
e("clear-btn").addEventListener("click", clear)

const backspace = () => {
	if (equ.num) {
		equ.num = equ.num.slice(0, -1)
		set(equ.num)
	}
	else if (equ.mem.length)
		set(equ.mem.at(-1))
	else
		set(0)

	return true
}
e("backspace-btn").addEventListener("click", backspace)

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
	if (!current.left && !current.right)
		return current.value
	const left = solve(current.left)
	const right = solve(current.right)
	switch (current.value) {
		case "t":
			return left + right
		case "-":
			return left - right
		case "x":
			return left * right
		case "/":
			return left / right
	}
}

const update_equ = (sym) => {
	equ.mem.pop()
	equ.mem.push(solve())
	set(equ.mem.at(-1))
	equ.num = ""
	equ.last_op = sym
}

const add = () => {
	const nomatch = ["x", '/'].includes(equ.last_op)
	if (!equ.num)
		equ.num = equ.mem.length ? equ.mem.at(-1) : 0

	replace_root("t", nomatch)
	update_equ("t")
}

const subtract = () => {
	const n = init()
	replace_root("-", n, ["x", '/'].includes(equ.last_op))
	update_equ("-")
}

const multiply = () => {
	const n = init()
	add_branch("x", n)
	update_equ("x")
}

const divide = () => {
	const n = init()
	add_branch("/", n)
	update_equ("/")
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
	}
}

for (const op of Object.keys(operations)) {
	const btn = e(operations[op].name + "-btn")
	btn.addEventListener("click", operations[op].fn)
}



const equals = () => {
	const solution = solve()
	equ.mem.pop()
	equ.mem.push(solution)
	equ.root = null
	equ.add_right = null
	equ.last_op = "="
}
e("equals-btn").addEventListener("click", equals)

const num = (digit) => () => {
	const n = init()
	if (equ.last_op === "=")
		display.set(digit)
	else
		display.set(Number(n) ? n + digit : digit)
}

document.querySelector("main").addEventListener("keydown", ({ key }) => {
	if (Number(key)) {
		const digit = Number(key)
		num(digit)()
		return;
	}
	switch (key) {
		case "Backspace":
			const backed = backspace()
			if (backed)
				clear()
			break;
		case "t":
		case "+":
			add_or_subtract("t")()
			break;
		case "-":
			add_or_subtract("-")()
		case "x":
		case "*":
			mult_or_div("x")()
		case "/":
			mult_or_div("/")()
		case "Enter":
			equals()
	}
})
