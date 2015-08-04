# Solidity Contract Builder

Simple module for building solidity contracts for the Ethereum platform using javascript.

This is useful when you have to build a contract using parameters specified by your end user. This way, you can add/remove attributes, change types, change function signatures, etc, without having to manipulate directly the string representing the contract.

# Install

To install the module, just run
```
npm install
```

# Testing
To test the code, run:
```
npm test
```

## Usage example

```
var builder = require('sol-builder');

builder.setName('MyContract');
builder.is('ParentContract');

builder.addAttribute({
    name:     'someNumber',
    type:     'uint8',
    modifier: 'public',                   /* optional */
    value:    '16',                       /* optional */
    comment:  'Just a test attribute...', /* optional */
    lineBreak: true                       /* optional */
});

builder.addStruct({
    name: 'Record',
    comment: 'Test struct...', /* optional */
    lineBreak: true,           /* optional */
    attributes: [
        {
            name: 'myNumber',
            type: 'uint32',
            comment: 'Simple comment', /* optional */
            lineBreak: false           /* optional */
        },
        {
            name: 'myAddress',
            type: 'address',
            lineBreak: false /* optional */
        }
    ]
});

builder.addMapping({
    name: 'records',
    keyType: 'address',
    valueType: 'Record',
    modifier: 'public',     /* optional */
    comment: 'test',        /* optional */
    lineBreak: true         /* optional */
});

builder.addFunction({
    name: 'myFunc',
    comment: 'Simple function', /* optional */
    parameters: [
        {
            name: '_number',
            type: 'uint32'
        }
    ],
    body: 'someNumber++;someNumber += _number;'

});

console.log(builder.getContract());
```

The code above would produce the following output:

```
contract MyContract is ParentContract {

    // Just a test attribute...
    uint8 public someNumber = 16;

    // Test struct...
    struct Record {
        // Simple comment
        uint32 myNumber;
        address myAddress;
    }

    // test
    mapping public(address => Record) records;

    // Simple function
    function myFunc(uint32 _number) {
        someNumber++;
        someNumber += _number;
    }
}

```

