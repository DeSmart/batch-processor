const processInBatches = async (nextBatch, processBatch, step, initialResult = 0, batchAmountLimit = 0) => {
  let batchNumber = 0
  let shouldProcessNextBatch = true
  let batch

  while (shouldProcessNextBatch) {
    batch = await nextBatch(batchNumber, step)

    if (!batch || !batch.length) {
      shouldProcessNextBatch = false

      break
    }

    batchNumber++

    initialResult = await processBatch(batch, initialResult, batchNumber)

    if (batchAmountLimit && batchAmountLimit === batchNumber) {
      shouldProcessNextBatch = false

      break
    }
  }

  return Promise.resolve(initialResult)
}

module.exports = {
  processInBatches
}
