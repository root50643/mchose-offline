import { inflateRawSync } from 'node:zlib';

// The factory publishes either JSON or a ZIP-wrapped JSON document. Read the
// central directory so ZIP data descriptors and comments do not affect decoding.
export function decodeFactoryConfig(input) {
  const value = Buffer.isBuffer(input) || typeof input === 'string' ? JSON.parse(input.toString()) : input;
  if (!value || typeof value.__compressBase64__ !== 'string') return value;
  const zip = Buffer.from(value.__compressBase64__, 'base64');
  let end = zip.length - 22;
  const minimum = Math.max(0, end - 65535);
  while (end >= minimum && zip.readUInt32LE(end) !== 0x06054b50) end--;
  if (end < minimum) throw new Error('Factory configuration ZIP directory is missing.');
  const directory = zip.readUInt32LE(end + 16), length = zip.readUInt32LE(end + 12);
  if (directory + length > end) throw new Error('Factory configuration ZIP directory is outside the archive.');
  for (let position = directory; position < directory + length;) {
    if (zip.readUInt32LE(position) !== 0x02014b50) throw new Error('Factory configuration ZIP entry is invalid.');
    const nameLength = zip.readUInt16LE(position + 28), extraLength = zip.readUInt16LE(position + 30), commentLength = zip.readUInt16LE(position + 32);
    const name = zip.subarray(position + 46, position + 46 + nameLength).toString('utf8');
    if (name === 'data.json') {
      const offset = zip.readUInt32LE(position + 42), size = zip.readUInt32LE(position + 20), outputSize = zip.readUInt32LE(position + 24), method = zip.readUInt16LE(position + 10);
      if (zip.readUInt32LE(offset) !== 0x04034b50) throw new Error('Factory configuration ZIP local entry is invalid.');
      const start = offset + 30 + zip.readUInt16LE(offset + 26) + zip.readUInt16LE(offset + 28);
      if (start + size > directory || (zip.readUInt16LE(position + 8) & 1)) throw new Error('Factory configuration ZIP payload is invalid or encrypted.');
      const packed = zip.subarray(start, start + size);
      const bytes = method === 0 ? packed : method === 8 ? inflateRawSync(packed) : null;
      if (!bytes || bytes.length !== outputSize) throw new Error('Factory configuration ZIP compression or output size is invalid.');
      return JSON.parse(bytes.toString('utf8'));
    }
    position += 46 + nameLength + extraLength + commentLength;
  }
  throw new Error('Factory configuration ZIP does not contain data.json.');
}
