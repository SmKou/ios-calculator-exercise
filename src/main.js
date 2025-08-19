import './style.css'

const e = id => document.getElementById(id)
const get = () => e("display").innerHTML
const set = (txt) => e("display").innerHTML = txt

const calc = {
	num: "",
	last_op: "",
	sol: []
}

e("clear-btn").addEventListener("click", () => { set("") })

e("backspace-btn").addEventListener("click", () => {
	const n = get()
	if (!Number(n)) return;
	set(n.slice(0, -1))
})

const operate = (sym, left, right) => {
	if (!left)
		return;
	if (!right)
		return left
	switch (sym) {
		case "t":
		case "+":
			return left + right
		case "-":
			return left - right
		case "x":
		case "*":
			return left * right
		case "/":
			return left / right
	}
}

const solve = (sym) => () => {
	if (calc.last_op === "=")
		if (calc.num)
			calc.sol.push(calc.num)
		else
			calc.sol.push(calc.sol.at(-1))
	else {
		const last = sol.pop()
		const n = Number(get())
		const s = operate(calc.last_op, last, n)
		calc.sol.push(s)
		calc.num = ""
		calc.last_op = sym
		set(calc.num)
	}
}

e("addition-btn").addEventListener("click", solve("t"))

e("subtraction-btn").addEventListener("click", solve("-"))

e("multiplication-btn").addEventListener("click", solve("x"))

e("division-btn").addEventListener("click", solve("/"))

e("equals-btn").addEventListener("click", () => {
	solve("=")()
	set(calc.sol.at(-1))
})

for (let i = 0; i < 10; ++i) {
	const btn = e(`n${i}-btn`)
	const fn = () => {
		const last = calc.num
		calc.num += last + i
		set(calc.num)
	}
	btn.addEventListener("click", fn)
}
