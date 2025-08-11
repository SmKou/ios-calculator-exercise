import './style.css'

const numbers = []
const e = {
	add: document.getElementById("addition-btn"),
	subtract: document.getElementById("subtraction-btn"),
	multiply: document.getElementById("multiplication-btn"),
	divide: document.getElementById("division-btn"),
	equals: document.getElementById("equals-btn"),
	clear: document.getElementById("clear-btn"),
	backspace: document.getElementById("backspace-btn"),
	display: document.getElementById("display")
}

e.clear.addEventListener("click", () => {
	display.innerHTML = ""
})

e.backspace.addEventListener("click", () => {
	const n = e.display.innerHTML
	if (!Number(n))
		return;
	display.innerHTML = n.slice(0, -1)
})

const solve = () => {
	if (!Number(numbers.at(-1))) {
		const sym = numbers.pop()
		const left = numbers.pop()
		numbers.push(operate(sym, left, n))
	}
}

const operate = (sym, left, right) => {
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

e.add.addEventListener("click", () => {
	const n = Number(display.innerHTML)
	if (!n)
		return;
	solve()
	numbers.push("+")
})

e.subtract.addEventListener("click", () => {})

e.multiply.addEventListener("click", () => {})

e.divide.addEventListener("click", () => {})

e.equals.addEventListener("click", () => {})

for (let i = 0; i < 10; ++i) {
	const btn = document.getElementById(`n${i}-btn`)
	const fn = () => {}
	btn.addEventListener("click", fn)
}
