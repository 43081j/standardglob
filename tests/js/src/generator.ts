import fs from "node:fs/promises"
import path from "node:path"
import { parse } from "yaml"

type TestFile = {
	name: string
	tests: Array<{
		name: string
		pattern: string
		matches?: string[]
		rejects?: string[]
		error?: string
	}>
}

const testDir = path.resolve(import.meta.dirname, "../..")

export async function generateTests(matcherFn: (pattern: string, path: string) => boolean) {
	const testFilePaths = await Array.fromAsync(fs.glob("*.yml", { cwd: testDir }))
	const testFiles = await Promise.all(testFilePaths.map(async (testFilePath) => {
		const testFile = await fs.readFile(path.join(testDir, testFilePath), "utf8")
		return parse(testFile) as TestFile
	}))

	const vitest = await import("vitest")

	for (const file of testFiles) {
		vitest.describe(file.name, () => {
			for (const test of file.tests) {
				vitest.describe(test.name, () => {
					const { pattern } = test

					for (const path of test.matches ?? []) {
						vitest.test(`true <- ${path} - ${pattern}`, () => {
							vitest.expect(matcherFn(pattern, path)).toEqual(true)
						})
					}
					for (const path of test.rejects ?? []) {
						vitest.test(`false <- ${path} - ${pattern}`, () => {
							vitest.expect(matcherFn(pattern, path)).toEqual(false)
						})
					}
					if (test.error) {
						vitest.test(`throws ${test.error} <- ${pattern}`, () => {
							vitest.expect(() => matcherFn(pattern, "")).toThrow(test.error)
						})
					}
				})
			}
		})
	}
}
