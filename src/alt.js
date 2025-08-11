import './style.css'

const equ = {
	mem: [],
	num: "",
	root: null,
	add_right: null,
	last_op: ""
}

document.getElementById("clear-btn").addEventListener("click", () => {
	if (equ.num)
		equ.num = ""
	else if (equ.mem.length)
		equ.mem = []
	document.getElementById("display").innerHTML = ""
})

document.getElementById("backspace-btn").addEventListener("click", () => {
	let to_set = ""
	if (equ.num) {
		equ.num = equ.num.slice(0, -1)
		to_set += equ.num
	}
	else if (equ.mem.length)
		to_set += equ.mem.at(-1)
	else
		to_set += 0
	document.getElementById("display").innerHTML = to_set
})

