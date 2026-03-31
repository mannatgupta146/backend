let a:number = 10
console.log(a)

const b:any[] = [1,2,3,4,5]
console.log(b)

b.push('hell')
console.log(b)

const c:[number, number] = [1,2]
console.log(c)

c.push(3)
console.log(c)

function d(name:string):void{
    console.log(`hello ${name}`)
}

d("John")

/* function e(name: string): never {
    throw new Error(`Something went wrong for ${name}`)
}

e("John") */

const user = {
    name:"John",
    age:20,
    isStudent:true
}

function f(data:any){
    console.log(`hello ${data.name} and age is ${data.age} and isStudent is ${data.isStudent}`)
}

f(user)

type User = {
    name:string,
    age:number,
    isStudent:boolean
}

function g(data:User){
    console.log(`hello ${data.name} and age is ${data.age} and isStudent is ${data.isStudent}`)
}

g(user) 