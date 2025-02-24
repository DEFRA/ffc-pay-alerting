jest.mock('@azure/storage-blob')
jest.mock('@azure/identity')

describe('storage', () => {
  let storage
  const mockstorage = {
    upload: jest.fn().mockResolvedValue({}),
    url: 'test-url'
  }

  const mockContainer = {
    createIfNotExists: jest.fn(),
    getBlockBlobClient: jest.fn().mockReturnValue(mockstorage)
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

  const mockBlobServiceClient = {
    getContainerClient: jest.fn().mockReturnValue(mockContainer)
  }

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()

    require('@azure/storage-blob').BlobServiceClient.fromConnectionString = jest
      .fn()
      .mockReturnValue(mockBlobServiceClient)

    require('@azure/storage-blob').BlobServiceClient.mockImplementation(() => mockBlobServiceClient)

    require('@azure/identity').DefaultAzureCredential.mockImplementation(() => ({}))

    jest.mock('../../app/config', () => ({
      storageConfig: mockStorageConfig
    }))

    storage = require('../../app/storage')
  })


  test('uses connection string when config.useConnectionStr is true', async () => {
    expect(require('@azure/storage-blob').BlobServiceClient.fromConnectionString)
      .toHaveBeenCalledWith(mockStorageConfig.connectionStr)
  })

  test('uses DefaultAzureCredential when config.useConnectionStr is false', async () => {
    jest.resetModules()
    mockStorageConfig.useConnectionStr = false

    jest.mock('../../app/config', () => ({
      storageConfig: mockStorageConfig
    }))

    storage = require('../../app/storage')

    expect(require('@azure/identity').DefaultAzureCredential).toHaveBeenCalledWith({
      managedIdentityClientId: 'fake-client-id'
    })

    expect(require('@azure/storage-blob').BlobServiceClient).toHaveBeenCalledWith(
      `https://${mockStorageConfig.storageAccount}.blob.core.windows.net`,
      expect.any(Object)
    )
  })

  test('gets outbound blob client', async () => {
    const result = await storage.getInboundBlobClient('test-file.txt')
    expect(result.url).toBe('test-url')
    expect(mockContainer.getBlockBlobClient).toHaveBeenCalledWith('test-folder/test-file.txt')
  })

  describe('when using managed identity', () => {
    test('creates blob service client with DefaultAzureCredential', () => {
      jest.resetModules()
      mockStorageConfig.useConnectionStr = false

      jest.mock('../../app/config', () => ({
        storageConfig: mockStorageConfig
      }))

      require('../../app/storage')

      expect(require('@azure/storage-blob').BlobServiceClient)
        .toHaveBeenCalledWith(
          `https://${mockStorageConfig.storageAccount}.blob.core.windows.net`,
          expect.any(Object)
        )
    })
  })
})
