import './style.css'

const get_e = id => document.getElementById(id)
const node = (v = "", left = null, right = null) => ({ v, left, right })

const disp = get_e("display")
const equ = {
	mem: 0,			// last calculated value
	view: "",		// rep. of equation
	root: null,	// tree of equation
}

for (let i = 0; i < 10; ++i) {
	get_e(`n${i}-btn`).addEventListener("click", () => {
		const txt = disp.innerHTML
		if (!Number(txt) && i !== 0)
			disp.innerHTML = i
			else if (txt.length)
				disp.innerHTML = txt + i
				else
					disp.innerHTML = i
	})
}

get_e("addition-btn")
.addEventListener("click", () => {
	const n = Number(disp.innerHTML)
	equ.root = node("+", node(n, equ.root))
	equ.view += ` + ${n}`
	disp.innerHTML = ""
})

get_e("subtraction-btn")
.addEventListener("click", () => {
	const n = Number(disp.innerHTML)
	equ.root = node("-", node(n, equ.root))
	equ.view += ` - ${n}`
	disp.innerHTML = ""
})

get_e("multiplication-btn")
.addEventListener("click", () => {
	const n = Number(disp.innerHTML)
	const m = node("*", equ.root.right, n)
	equ.root.right = m
	equ.view += ` * ${n}`
	disp.innerHTML = ""
})

get_e("division-btn")
.addEventListener("click", () => {
	const n = Number(disp.innerHTML)
	const d = node("/", equ.root.right, n)
	equ.root.right = d
	equ.view += ` / ${n}`
	disp.innerHTML = ""
})

get_e("clear-btn")
.addEventListener("click", () => {
	disp.innerHTML = "0"
})

get_e("backspace-btn")
.addEventListener("click", () => {
	const txt = disp.innerHTML
	if (txt.length)
		disp.innerHTML = txt.slice(0, txt.length - 1)
})

const operate = (op, left, right) => {
	switch (op) {
		case "+":
			return left + right
		case "-":
			return left - right
		case "*":
			return left * right
		case "/":
			return left / right
	}
}

const solve = curr => {
	if (!curr.left && !curr.right)
		return curr.v
	return operate(curr.v, solve(curr.left), solve(curr.right))
}

get_e("equal-btn")
.addEventListener("click", () => {
	const txt = disp.innerHTML
	if (txt.length)
		equ.root.right = node(Number(txt))
	const sol = solve(equ.root)
	console.log(equ.view, sol)
