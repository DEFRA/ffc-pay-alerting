jest.mock('@azure/storage-blob')
jest.mock('@azure/identity')

describe('storage', () => {
  let storage

  const mockStorageClient = {
    upload: jest.fn().mockResolvedValue({}),
    url: 'test-url'
  }

  const mockContainer = {
    createIfNotExists: jest.fn(),
    getBlockBlobClient: jest.fn().mockReturnValue(mockStorageClient)
  }

  const mockBlobServiceClient = {
    getContainerClient: jest.fn().mockReturnValue(mockContainer)
  }

  const mockStorageConfig = {
    useConnectionStr: true,
    connectionStr: 'connection-string',
    createContainers: true,
    storageAccount: 'fakestorageaccount',
    managedIdentityClientId: 'fake-client-id',
    container: 'test-container',
    inboundFolder: 'test-folder'
  }

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()

    const { BlobServiceClient } = require('@azure/storage-blob')
    BlobServiceClient.fromConnectionString = jest.fn().mockReturnValue(mockBlobServiceClient)
    BlobServiceClient.mockImplementation(() => mockBlobServiceClient)

    const { DefaultAzureCredential } = require('@azure/identity')
    DefaultAzureCredential.mockImplementation(() => ({}))

    jest.mock('../../app/config', () => ({ storageConfig: mockStorageConfig }))

    storage = require('../../app/storage')
  })

  test('uses connection string when config.useConnectionStr is true', async () => {
    const { BlobServiceClient } = require('@azure/storage-blob')
    expect(BlobServiceClient.fromConnectionString).toHaveBeenCalledWith(mockStorageConfig.connectionStr)
  })

  test('uses DefaultAzureCredential when config.useConnectionStr is false', async () => {
    jest.resetModules()
    mockStorageConfig.useConnectionStr = false

    jest.mock('../../app/config', () => ({ storageConfig: mockStorageConfig }))
    storage = require('../../app/storage')

    const { DefaultAzureCredential } = require('@azure/identity')
    const { BlobServiceClient } = require('@azure/storage-blob')

    expect(DefaultAzureCredential).toHaveBeenCalledWith({ managedIdentityClientId: 'fake-client-id' })
    expect(BlobServiceClient).toHaveBeenCalledWith(
      `https://${mockStorageConfig.storageAccount}.blob.core.windows.net`,
      expect.any(Object)
    )
  })

  test('gets inbound blob client', async () => {
    const result = await storage.getInboundBlobClient('test-file.txt')
    expect(result.url).toBe('test-url')
    expect(mockContainer.getBlockBlobClient).toHaveBeenCalledWith('test-folder/test-file.txt')
  })

  describe('when using managed identity', () => {
    test('creates blob service client with DefaultAzureCredential', () => {
      jest.resetModules()
      mockStorageConfig.useConnectionStr = false

      jest.mock('../../app/config', () => ({ storageConfig: mockStorageConfig }))
      require('../../app/storage')

      const { BlobServiceClient } = require('@azure/storage-blob')
      expect(BlobServiceClient).toHaveBeenCalledWith(
        `https://${mockStorageConfig.storageAccount}.blob.core.windows.net`,
        expect.any(Object)
      )
    })
  })
})
