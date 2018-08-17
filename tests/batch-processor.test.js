const R = require('ramda')
const {processInBatches} = require('../src/batch-processor')

describe('batch-processor', () => {
  it('does basic operations with loop driver', async () => {
    let data = [
      [1, 2, 3],
      [4, 5, 6]
    ]

    const nextBatch = async (batchNumber, step) => (
      Promise.resolve(
        data.pop()
      )
    )

    const processBatch = async (batch, result, batchNumber) => (
      Promise.resolve(
        result * R.sum(batch)
      )
    )

    const result = await processInBatches(nextBatch, processBatch, 1, 1)

    expect(result).toBe(90)
  })
})
