export class AbiCache {
  private static abisMap = new Map();
  static getAbi(address: string) {
    return AbiCache.abisMap.get(address);
  }

  static setAbi(address: string, abi) {
    const a = AbiCache.abisMap.get(address);
    if (!a) {
      AbiCache.abisMap.set(address, abi);
    }
  }
}
