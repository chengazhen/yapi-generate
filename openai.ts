const { generateService } = require('@umijs/openapi')

generateService({
  schemaPath: 'http://127.0.0.1:4523/export/openapi?projectId=3016168&specialPurpose=openapi-generator',
  serversPath: './servers',
})