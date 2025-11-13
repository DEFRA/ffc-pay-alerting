const updateContact = require('../../../../../app/server/routes/schemas/update-contact')

describe('Validation Schema', () => {
  test('should validate an object with valid emailAddress and modifiedBy', () => {
    const validData = {
      emailAddress: 'user@example.com',
      modifiedBy: 'admin',
      someOtherField: 'allowed because of unknown(true)'
    }

    const { error, value } = updateContact.validate(validData)
    expect(error).toBeUndefined()
    expect(value).toMatchObject(validData)
  })

  test('should fail when emailAddress is missing', () => {
    const invalidData = {
      modifiedBy: 'admin'
    }

    const { error } = updateContact.validate(invalidData)
    expect(error).toBeDefined()
    expect(error.details[0].path).toContain('emailAddress')
  })

  test('should fail when emailAddress is not a valid email', () => {
    const invalidData = {
      emailAddress: 'not-an-email',
      modifiedBy: 'admin'
    }

    const { error } = updateContact.validate(invalidData)
    expect(error).toBeDefined()
    expect(error.details[0].path).toContain('emailAddress')
  })

  test('should fail when modifiedBy is missing', () => {
    const invalidData = {
      emailAddress: 'user@example.com'
    }

    const { error } = updateContact.validate(invalidData)
    expect(error).toBeDefined()
    expect(error.details[0].path).toContain('modifiedBy')
  })

  test('should allow unknown fields due to unknown(true)', () => {
    const dataWithUnknown = {
      emailAddress: 'user@example.com',
      modifiedBy: 'admin',
      extraField1: 'extra1',
      extraField2: 123
    }

    const { error, value } = updateContact.validate(dataWithUnknown)
    expect(error).toBeUndefined()
    expect(value).toMatchObject(dataWithUnknown)
  })
})
