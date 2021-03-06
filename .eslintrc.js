module.exports = {
  "extends": ["eslint:recommended"],
  "rules": {
    "no-console":["error",{
      "allow":["warn"]
    }]
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType":"script"
  },
  "globals":{
    "window":true
  },
  "env":{
    "browser":true,
    "node":true,
    "es6":true,
    "mocha":true
  }
}
