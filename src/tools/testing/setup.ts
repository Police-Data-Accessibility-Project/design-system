import { expect } from 'vitest';
import vueSnapshotSerializer from './serializer.js';

expect.addSnapshotSerializer(vueSnapshotSerializer);
