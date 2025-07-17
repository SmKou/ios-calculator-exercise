/**
 * Calculator:
 * Follows order of PEMDAS to form a tree
 * 1. parens
 * 2. exponent
 * 3. multiplication and division
 * 4. addition and subtraction
 * Note: not including parens or exponent, only MDAS
 *
 * C: Clear - clears the display
 * Backspace - deletes last number in display, or zeroes
 * Equal - performs current operation
 *
 * Plus (+): add left and right
 * Minus (-): subtract right from left
 * Times (*): multiply left and right
 * Divide (/): divide left by right
 */

import './style.css'

const is_op = o => "-+*/=".includes(o)
const get_e = id => document.getElementById(id)
const node = (v = "", left = null, right = null) => ({ v, left, right })

const disp = get_e("display")
const equ = {
	mem: 0,
	view: "",
	tree: {},
	branch: {}
}

for (let i = 0; i < 10; ++i) {
	const btn = document.getElementById(`n${i}-btn`)
	btn.addEventListener("click", () => {
		const txt = disp.innerHTML
		if (!Number(txt) && i !== 0)
			disp.innerHTML = i
		else if (txt.length)
			disp.innerHTML = txt + i
		else
			disp.innerHTML = i
	})
}

const ops = {
	addition: "+",
	subtraction: "-",
	multiplication: "*",
	division: "/"
}
for (const key of Object.keys(ops)) {
	const btn = get_e(`${key}-btn`)
}

const clear = get_e("clear-btn")
clear.addEventListener("click", () => {
	disp.innerHTML = "0"
})

const backspace = get_e("backspace-btn")
backspace.addEventListener("click", () => {
	const txt = disp.innerHTML
	if (txt.length)
		disp.innerHTML = txt.slice(0, txt.length - 1)
})

const equal = get_e("equal-btn")
