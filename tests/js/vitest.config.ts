import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		reporters: ["verbose"],
		experimental: { viteModuleRunner: false },
		env: { NODE_ENV: "test" },
		mockReset: true,
		restoreMocks: true,
	},
})
