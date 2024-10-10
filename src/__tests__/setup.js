import { afterEach } from 'vitest'
import { server } from "../mocks/server";
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import 'whatwg-fetch'; // this is for any CodeGrade fetch errors
import { Blob } from 'node:buffer'; // this is for CodeGrade running node 16

beforeAll(() => {
    server.listen()
})

afterEach(() => {
    server.resetHandlers()
})

afterAll(() => {
    server.close()
})

afterEach(() => {
    cleanup();
})
