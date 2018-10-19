function test (func) {
  if (func === '1') {
    console.log(func)
  } else {
    throw 'The value of returnType is not defined'
  }
}

try {
  test(12)
} catch (e) {
  console.log(e)
}
