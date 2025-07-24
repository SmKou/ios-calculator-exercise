import './style.css'

const equ = {
	mem: null,
	root: null
}

/* ------------------------------------------------ HELPERS */
const get_e = id => document.getElementById(id)
const display = get_e("display")
const get_disp = () => display.innerHTML
const set_disp = (value) => display.innerHTML = value
const create_node = (value, left = null, right = null) => ({ value, left, right })

/* ------------------------------------------------ FUNCTIONS */
const num = (idx) => () => {
	const n = get_disp()
	set_disp(n ? n + idx : idx)
	console.log(n, idx)				// testing
}

const operate = (sym) => {
	switch (sym) {
		case "+":
			return (left, right) => left + right
		case "-":
			return (left, right) => left - right
		case "x":
			return (left, right) => left * right
		case "/":
			return (left, right) => left / right
	}
}

const operations = {
	division: {
		sym: "/",
		op: operate("/")
	},
	multiplication: {
		sym: "x",
		op: operate("x")
	},
	subtraction: {
		sym: "-",
		op: operate("-")
	},
	addition: {
		sym: "+",
		op: operate("+")
	}
}

const print = (node = equ.root) => {
	if (!node)
		return ""
	if (!node.left && !node.right)
		return node.value
	return print(node.left) + " " + print(node.right)
}

const solve = () => {}

/* ------------------------------------------------ INTERFACE */
for (let i = 0; i < 10; ++i)
	get_e(`n${i}-btn`).addEventListener("click", num(i))

get_e("clear-btn").addEventListener("click", () => {
	const n = get_disp()
	set_disp(n ? 0 : "")
	console.log(n)					// testing
})

get_e("backspace-btn").addEventListener("click", () => {
	const n = get_disp()
	set_disp(n ? n.slice(0, n.length - 1) : "")
	console.log(n, n.slice(0, n.length - 1))
})


// Forgot: branch shifting - refer original problem
for (const key of Object.keys(operations)) {
	const btn = get_e(key + "-btn")
	btn.addEventListener("click", () => {
		if (!equ.root)
			equ.root = create_node(operations[key].sym, create_node(get_disp()))
		else {
			let curr = equ.root
			while (curr.right)
				curr = curr.right
				curr.right = create_node(get_disp())
		}
		set_disp("")
		console.log(key, print())
	})
}
