import './style.css'

const e = id => document.getElementById(id)
const display = {
	get: () => e("display").innerHTML,
	set: value => e("display").innerHTML = value
}
const solution = {
	get: () => e("solution").innerHTML,
	set: value => e("solution").innerHTML = value
}
const equation = {
	mem: [],
	root: null,
	add_right: null,
	last_op: ""
}
const node = (value, left = null, right = null) => ({ value, left, right })

const add_or_sub = (sym) => () => {
	const n = display.get()
	const use_n = n ? n : equation.mem.length ? equation.mem.at(-1) : 0
	if (!equation.root)
		equation.root = node(sym, node(use_n))
	else {
		if (["x", "/"].includes(equation.last_op))
			equation.add_right = equation.root
		equation.add_right.right = node(use_n)
		equation.root = node(sym, equation.add_right)
	}
	equation.add_right = equation.root
	equation.last_op = sym
	display.set("")
	solution.set()				// TO-DO
}

const mult_or_div = (sym) => () => {
	const n = display.get()
	const use_n = n ? n : equation.mem.length ? equation.mem.at(-1) : 0
	if (!equation.root) {
		equation.root = node(sym, node(use_n))
		equation.add_right = equation.root
	}
	else {
		equation.add_right.right = node(sym, node(use_n))
		equation.add_right = equation.add_right.right
	}
	equation.last_op = sym
	display.set("")
	solution.set()				// TO-DO
}

const solve = (current = equation.root) => {
	if (!current)
		return equation.mem.length ? equation.mem.at(-1) : 0
	if (!current.left && !current.right)
		return current.value
	const left = solve(current.left)
	const right = solve(current.right)

	let working_solution = left
	switch (current.value) {
		case "t":
			working_solution = left + right
			break;
		case "-":
			working_solution = left - right
			break;
		case "x":
			working_solution = left * right
			break;
		case "/":
			working_solution = left / right
			break;
	}


	return working_solution
}

const operations = ["addition", "subtraction", "multiplication", "division"]
const symbols = ["t", "-", "x", "/"]
for (let i = 0; i < operations.length; ++i) {
	const btn = e(operations[i] + "-btn")
	const op = i < 2 ? add_or_sub(symbols[i]) : mult_or_div(symbols[i])
	btn.addEventListener("click", op)
}



e("clear-btn").addEventListener("click", () => {})

e("backspace-btn").addEventListener("click", () => {})

e("equals-btn").addEventListener("click", () => {})

document.querySelector("main").addEventListener("keydown", ({ key }) => {
	if (Number(key)) {}
	switch (key) {
		case "Backspace":
		case "Enter":
	}
})

// const operations = {
// 	division: "/",
// 	multiplication: "x",
// 	subtraction: "-",
// 	addition: "t"
// }
//
// const equ = {
// 	mem: [],
// 	root: "",
// 	add_right: "",
// 	last_op: ""
// }
//
// for (let i = 0; i < 10; ++i)
// 	get_e(`n${i}-btn`).addEventListener("click", () => {
// 		const n = get_disp()
// 		if (mem.at(-1) == n)
// 		set_disp(Number(n) ? n + i : i)
// 	})
//
// get_e("clear-btn").addEventListener("click", () => {
// 	const n = get_disp()
// 	if (n) {
// 		console.log("clear display")
// 		set_disp(equ.mem)
// 	}
// 	else {
// 		console.log("clear memory")
// 		equ.mem = ""
// 		set_sol(equ.mem)
// 	}
// })
//
// get_e("backspace-btn").addEventListener("click", () => {
// 	const n = get_disp()
// 	set_disp(n ? n.slice(0, n.length - 1) : "")
// })
//
// for (const key of Object.keys(operations)) {
// 	const sym = operations[key]
// 	const add_to_tree = ["-", "+"].includes(sym)
// 		? () => {
//
// 		}
// 		: () => {
// 		}
// 	get_e(key + "-btn").addEventListener("click", add_to_tree)
// }
//
// get_e("equal-btn").addEventListener("click", () => {
// 	if (!equ.root)
// 		return;
// 	const n = get_disp()
// 	equ.add_right.right = node(n)
//
// 	equ.mem = solve()
// 	set_sol(equ.mem)
// 	set_disp("")
//
// 	equ.root = ""
// 	equ.add_right = ""
// 	equ.last_op = ""
// })
//
// document.querySelector("main").addEventListener("keydown", e => {
// 	const { key } = e
// 	if ("1234567890".includes(key)) {
// 		const n = get_disp()
// 		set_disp(n ? n + key : key)
// 	}
//
// 	if ("-t".includes(key)) {}
//
// 	if ("/x".includes(key)) {}
//
// 	if (key === "Backspace") {
// 		const n = get_disp()
// 		if (n)
// 			set_disp(n.slice(0, n.length - 1))
// 		else {
//
// 		}
// 	}
// })
