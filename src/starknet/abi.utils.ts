import { uint256 } from 'starknet';

// callResult: the result from method call
// method definition: including input, output, etc...
export function extractCallResult(callResult, methodABI): string {
  const outputs = methodABI.outputs;
  if (!outputs || outputs.length === 0) {
    return '';
  }

  // todo check if cairo supports multiple return value
  const output = outputs[0];
  const outputName = output.name;
  const outputType = output.type;

  const callOutput = callResult[outputName];
  if (outputType === 'felt') {
    return callOutput.toString();
  } else if (outputType === 'Uint256') {
    return uint256.uint256ToBN(callOutput).toString();
  } else {
    // todo do log
    return '';
  }
}
