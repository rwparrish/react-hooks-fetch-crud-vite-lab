import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import 'whatwg-fetch'; // this is for any CodeGrade fetch errors
import {Blob} from 'node:buffer'; // this is for CodeGrade running node 16

afterEach(() => {
    cleanup();
})
