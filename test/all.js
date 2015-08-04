var builder = require('../app/sol-builder.js')

exports['tests'] = function(assert) {

    builder.setName('MyContract')
    assert.equal(builder.getContract(), 
        'contract MyContract {\n\n}', 'Test setName')

    
    builder.is('ParentContract')
    assert.equal(builder.getContract(), 
        'contract MyContract is ParentContract {\n\n}', 'Test is')


    builder.addAttribute({
        name: 'attr1',
        type: 'address'
    })
    assert.equal(builder.getContract(), 
        'contract MyContract is ParentContract {\n\n    address attr1;\n}', 'Test addAttribute (simple)')


    builder.removeAttribute('attr1')
    assert.equal(builder.getContract(), 
        'contract MyContract is ParentContract {\n\n}', 'Test removeAttribute')


    builder.addAttribute({
        name: 'attr1',
        type: 'address',
        lineBreak: true
    })
    assert.equal(builder.getContract(), 
        'contract MyContract is ParentContract {\n\n    address attr1;\n\n}', 'Test addAttribute (lineBreak)')


    builder.removeAttribute('attr1')
    builder.addAttribute({
        name: 'attr1',
        type: 'address',
        value: '"0x0"'
    })
    assert.equal(builder.getContract(), 
        'contract MyContract is ParentContract {\n\n    address attr1 = "0x0";\n}', 'Test addAttribute (value)')


    builder.removeAttribute('attr1')
    builder.addAttribute({
        name: 'attr1',
        type: 'address',
        modifier: 'public'
    })
    assert.equal(builder.getContract(), 
        'contract MyContract is ParentContract {\n\n    address public attr1;\n}', 'Test addAttribute (modifier)')


    builder.removeAttribute('attr1')
    builder.addAttribute({
        name: 'attr1',
        type: 'address',
        comment: 'Test comment'
    })
    assert.equal(builder.getContract(), 
        'contract MyContract is ParentContract {\n\n    // Test comment\n    address attr1;\n}', 'Test addAttribute (comment)')


    builder.removeAttribute('attr1')
    builder.addAttribute({
        name: 'attr1',
        type: 'address',
        modifier: 'public',
        value: '"0x0"',
        lineBreak: true,
        comment: 'Test comment'
    })
    assert.equal(builder.getContract(), 
        'contract MyContract is ParentContract {\n\n    // Test comment\n    address public attr1 = "0x0";\n\n}', 'Test addAttribute (all)')

}

if (module == require.main) require('test').run(exports)
