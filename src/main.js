import './style.css'

const e = id => document.getElementById(id)
const get = () => e("display").innerHTML
const set = (txt) => e("display").innerHTML = txt

const calc = {
	num: "",
	last_op: "",
	sol: []
}

e("clear-btn").addEventListener("click", () => {
	calc.num = ""
	set(calc.num)
})

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

const use_last_sol = () => calc.sol.push(calc.num || calc.sol.at(-1))

const use_operate = () => {
	const last = calc.sol.pop()
	const sol = operate(calc.last_op, last, calc.num)
	calc.sol.push(s)
	calc.num = ""
	set(calc.num)
}

const solve = (sym) => () => {
	if (calc.last_op === "=")
		use_last_sol()
	else {
		use_operate()
		calc.last_op = sym
	}
}

e("addition-btn").addEventListener("click", () => {
	if (calc.last_op === "=")
		use_last_sol()
	else {
		use_operate("t")
	}
})

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
		calc.num += i
		set(calc.num)
	}
	btn.addEventListener("click", fn)
}
