// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// random.js
//
// written and released to the public domain by drow <drow@bin.sh>
// es module conversion by SugoiDogo <sugoidogo@sugoidogo.com>
// http://creativecommons.org/publicdomain/zero/1.0/

let gen_data

/**
 * fetch the default gen_data
 */
async function fetch_gen_data(){
    return await fetch(new URL('gen_data.json',import.meta.url))
        .then(response=>{
            if(!response.ok){
                throw new Error(response.statusText,{cause:response})
            }
            return response.json()
        })
}

/**
 * set a new gen_data object, or fetch the default gen_data
 * @param {Object} new_gen_data 
 * @returns {Object} the new gen_data
 */
export async function set_gen_data(new_gen_data=null){
    gen_data=new_gen_data || await fetch_gen_data()
    return gen_data
}

/**
 * get the current gen data.
 * fetch the default gen_data if unset.
 * @returns the current gen_data
 */
export async function get_gen_data(){
    return gen_data || await set_gen_data()
}

/**
 * generate a given number of lines of dracula flow
 * @param {Number} lines 
 * @returns 
 */
export default async function more_random(lines=1) {
    await get_gen_data()
    if (lines < 1) lines = 1
    lines = generate_list("main", lines)
    return lines.join("\n")
}

function generate_text(a) {
    if (a = gen_data[a]) if (a = select_from(a)) return expand_tokens(a)
    return ""
}

function generate_list(a, b) {
    let c = [], d
    for (d = 0; d < b; d++)c.push(generate_text(a))
    return c
}

function select_from(a) {
    return a.constructor == Array ? select_from_array(a) : select_from_table(a)
}

function select_from_array(a) {
    return a[Math.floor(Math.random() * a.length)]
}

function select_from_table(a) {
    let b
    if (b = scale_table(a)) {
        b = Math.floor(Math.random() * b) + 1
        let c
        for (c in a) {
            let d = key_range(c)
            if (b >= d[0] && b <= d[1]) return a[c]
        }
    } return ""
}

function scale_table(a) {
    let b = 0, c
    for (c in a) {
        let d = key_range(c)
        if (d[1] > b) b = d[1]
    } return b
}

function key_range(a) {
    let b
    return (b = /(\d+)-00/.exec(a)) ? [parseInt(b[1]), 100] : (b = /(\d+)-(\d+)/.exec(a)) ? [parseInt(b[1]), parseInt(b[2])] : a == "00" ? [100, 100] : [parseInt(a), parseInt(a)]
}

function expand_tokens(a) {
    for (let b; b = /{(\w+)}/.exec(a);) {
        b = b[1]
        let c
        a = (c = generate_text(b)) ? a.replace("{" + b + "}", c) : a.replace("{" + b + "}", b)
    } return a
}