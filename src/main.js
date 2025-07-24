import './style.css'

const get_e = id => document.getElementById(id)
const display = get_e("display")
const get_disp = () => display.innerHTML
const set_disp = (value) => display.innerHTML = value
const solution = get_e("solution")
const set_sol = (value) => solution.innerHTML = value
const node = (value, left = null, right = null) => ({ value, left, right })

const operations = {
	division: "/",
	multiplication: "x",
	subtraction: "-",
	addition: "t"
}

const equ = {
	mem: null,
	root: null,
	add_right: null,
	last_op: ""
}

const solve = (curr = equ.root) => {
	if (!curr)
		return equ.mem ? equ.mem : 0
	if (!curr.left && !curr.right)
		return Number(curr.value)
	switch (curr.value) {
		case "-":
			return solve(curr.left) - solve(curr.right)
		case "t":
			return solve(curr.left) + solve(curr.right)
		case "x":
			return solve(curr.left) * solve(curr.right)
		case "/":
			return solve(curr.left) / solve(curr.right)
	}
}

for (let i = 0; i < 10; ++i)
	get_e(`n${i}-btn`).addEventListener("click", () => {
		const n = get_disp()
		set_disp(Number(n) ? n + i : i)
	})

get_e("clear-btn").addEventListener("click", () => {
	const n = get_disp()
	if (n)
		set_disp(0)
	else {
		set_sol("")
		set_disp("")
		equ.mem = null
		equ.root = null
		equ.add_right = null
		equ.last_op = null
	}
})

get_e("backspace-btn").addEventListener("click", () => {
	const n = get_disp()
	set_disp(n ? n.slice(0, n.length - 1) : "")
})

for (const key of Object.keys(operations)) {
	const sym = operations[key]
	const add_to_tree = ["-", "+"].includes(sym)
		? () => {
			if (!equ.root)
				equ.root = node(sym, equ.mem ? equ.mem : get_disp())
			else {
				if (["/", "x"].includes(equ.last_op))
					equ.add_right = equ.root
				equ.add_right.right = node(get_disp())
				equ.root = node(sym, equ.add_right)
			}
			equ.add_right = equ.root
			equ.last_op = sym
			set_disp(solve())
		}
		: () => {
			if (!equ.root) {
				equ.root = node(sym, node(get_disp()))
				equ.add_right = equ.root
			}
			else {
				equ.add_right.right = node(sym, node(get_disp()))
				equ.add_right = equ.add_right.right
			}
			equ.last_op = sym
			set_disp("")
			set_sol(solve())
		}
	get_e(key + "-btn").addEventListener("click", add_to_tree)
}

get_e("equal-btn").addEventListener("click", () => {
	if (!equ.root)
		return;
	const n = get_disp()
	equ.add_right.right = node(n)

	const sol = solve()
	set_sol(sol)
	set_disp("")
	equ.mem = sol
	equ.root = null
	equ.add_right = null
	equ.last_op = ""
})
