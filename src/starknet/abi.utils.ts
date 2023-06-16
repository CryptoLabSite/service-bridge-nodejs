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
    throw new Error('Unknown type');
  }
}

export function translateCallArgs(
  args: Array<any> | undefined,
  methodABI,
): Array<any> | undefined {
  if (args === undefined) {
    return undefined;
  }

  const inputs = methodABI.inputs;
  if (!inputs || inputs.length === 0) {
    return undefined;
  }

  if (inputs.length !== args.length) {
    throw new Error('args size not equals contract method args size');
  }

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (input.type === 'felt') {
      //   do nothing now, perhaps we should do some numbering check in the future
    } else if (input.type === 'Uint256') {
      const arg = args[i];
      args[i] = uint256.bnToUint256(arg);
    } else {
      throw new Error('Unknown type');
    }
  }

  return args;
}
