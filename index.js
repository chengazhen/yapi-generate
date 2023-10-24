

function generateInterfaceFromSchema(schema) {
  const { properties } = this.getFiledObj(schema)
  const copyProperties = {}
  for (const [k, v] of Object.entries(properties)) {
    if (v.type === 'object') {
      copyProperties[k] = generateInterfaceFromSchema(v)
    } else if (v.type === 'array') {
      copyProperties[k] = `${JSON.stringify(generateInterfaceFromSchema(v))}[]`
    } else {
      copyProperties[k] = this.getTSType(v.type)
    }
  }
  return {
    ...copyProperties
  }
}



function getFiledObj(schema) {
  const { type } = schema
  return {
    type,
    properties: type === 'array' ? schema.items.properties : schema.properties
  }
}

function getTSType(type) {
  switch (type) {
    case 'integer':
      return 'number';
    case 'string':
      return 'string';
    default:
      return 'any';
  }
}




