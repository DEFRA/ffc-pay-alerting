const {
  getRetentionPersonalisation
} = require('../../../app/alerting/get-retention-personalisation')

const createEvent = (data) => ({
  id: 'retention-event-123',
  type: 'uk.gov.defra.fcp.pds.retention.data.rejected',
  data
})

describe('getRetentionPersonalisation', () => {
  test('includes retention event data and standard personalisations', () => {
    const event = createEvent({
      message: 'Retention data rejected',
      filename: 'retention.csv'
    })

    const result = getRetentionPersonalisation(event)

    expect(result.message).toBe('Retention data rejected')
    expect(result.filename).toBe('retention.csv')
    expect(result.eventId).toBe('retention-event-123')
    expect(result.data_json).toContain('Retention data rejected')
    expect(result.data_pretty).toContain('Retention data rejected')
    expect(result.plain_text).toContain('Retention data rejected')
  })

  test('handles circular references in event data', () => {
    const data = {
      message: 'Circular reference test'
    }

    data.self = data

    const result = getRetentionPersonalisation(createEvent(data))

    expect(result.data_json).toContain('[Circular]')
    expect(result.data_pretty).toContain('[Circular]')
  })

  test('truncates JSON exceeding the maximum length', () => {
    const data = {
      message: 'A'.repeat(12000)
    }

    const result = getRetentionPersonalisation(createEvent(data))

    expect(result.data_json).toContain('... (truncated)')
    expect(result.data_pretty).toContain('... (truncated)')
  })

  test('formats stack traces', () => {
    const data = {
      message: 'Retention processing failed',
      stack: [
        'Error: Retention processing failed',
        'at function1',
        'at function2',
        'at function3',
        'at function4',
        'at function5',
        'at function6'
      ].join('\n')
    }

    const result = getRetentionPersonalisation(createEvent(data))

    expect(result.data_json).toContain('... (truncated)')
    expect(result.data_pretty).toContain('... (truncated)')
  })

  test('handles empty objects and arrays', () => {
    const result = getRetentionPersonalisation(createEvent({
      emptyObject: {},
      emptyArray: []
    }))

    expect(result).toHaveProperty('data_json')
    expect(result).toHaveProperty('data_pretty')
    expect(result).toHaveProperty('plain_text')
  })

  test('formats nested objects and arrays as plain text', () => {
    const result = getRetentionPersonalisation(createEvent({
      details: {
        reason: 'Invalid FRN',
        errors: [
          'Missing digits',
          'Invalid length'
        ]
      }
    }))

    expect(result.plain_text).toContain('details')
    expect(result.plain_text).toContain('Invalid FRN')
    expect(result.plain_text).toContain('Missing digits')
  })

  test('handles null and undefined values', () => {
    const result = getRetentionPersonalisation(createEvent({
      message: null,
      details: undefined
    }))

    expect(result.plain_text).toContain('null')
    expect(result).toHaveProperty('data_json')
  })

  test('handles JSON serialization failures', () => {
    const data = {
      message: 'Serialization failure',
      value: BigInt(123)
    }

    const consoleErrorSpy = jest.spyOn(console, 'error')
      .mockImplementation(() => { })

    try {
      const result = getRetentionPersonalisation(createEvent(data))

      expect(result.data_json).toContain('unable to stringify data')
      expect(result.data_pretty).toContain('unable to stringify data')
      expect(consoleErrorSpy).toHaveBeenCalled()
    } finally {
      consoleErrorSpy.mockRestore()
    }
  })
})
