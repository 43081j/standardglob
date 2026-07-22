import { generateTests } from "./generator.ts"
import picomatch from "picomatch"

await generateTests((pattern, path) => picomatch.isMatch(path, pattern))
